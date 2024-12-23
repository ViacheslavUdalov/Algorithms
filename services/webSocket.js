import {WebSocketServer} from "ws";
import {ALGO_MESSAGES} from "../controllers/AlgorithmState.js";
import {AuthDb} from "./authDb.js";


export function startWebSocket(algoState, dbService, JobService, AuthDb) {
    const wss = new WebSocketServer({port: 8080});

    wss.on('connection', function connection(ws) {
        console.log('Client connected');

        algoState.updateEmitter.on(ALGO_MESSAGES.oneUpdated, (algo, arrayType) => {
            console.log('ОТправляем данные')
            ws.send(JSON.stringify({
                type: 'oneUpdated',
                message: algo, 
                arrayType 
            })); 
        });

        algoState.updateEmitter.on(ALGO_MESSAGES.allUpdated, (algos) => {
            ws.send(JSON.stringify({
                type: 'allUpdated',
                message: 'Всё сделано босс!',
            }));
        }); 
        
        algoState.updateEmitter.on(ALGO_MESSAGES.extra, (algos) => {
            console.log('ExtraAlgos')
            ws.send(JSON.stringify({
                type: 'extra', 
                message: algos, 
            }));
        });
        algoState.updateEmitter.on('writeToDb', () => {
            console.log('writeToDb')
            ws.send(JSON.stringify({
                type: 'writeToDb',
                message: 'сохранили в бд!',
            }));
        });

        ws.on('message', async function incoming(message) {
            if (Buffer.isBuffer(message)) {
                message = message.toString('utf-8');
            }
            let res;
            const localMessage = JSON.parse(message);

            switch (localMessage.type) {
                case 'connect':
                    ws.send(JSON.stringify({
                        type: 'connect', message: 'Комару подключилась!'
                    })) 
                    break;  
                case 'getData':
                    let result = algoState.getData();
                    ws.send(JSON.stringify({type: 'getData', message: result}));
                    break;
                case 'updateAll':
                    console.log('updateAll');
                  // await dbService();
                  await JobService.executeFuncForAllAlgos(algoState);
                    break;
                case 'writeToDb':
                    console.log('writeToDb');
                  await  dbService.deleteDb();
                    await dbService.saveAllToDb(algoState); 
                    break; 
                case 'updateRow':   
                    console.log('updateRow')
                    res = await JobService.executeFuncForString(algoState, localMessage.sortType, localMessage.arraySize);
                    break; 
                case 'updateCell':
                    console.log(`localMessage`, localMessage)
                   await JobService.executeFuncForCell(algoState, localMessage.arraySize, localMessage.sortType, localMessage.arrayType);
                    break; 
                case 'Komaru return':  
                    ws.send(JSON.stringify({type: 'Komaru return', message: localMessage.message}));
                    break;
                case 'register':
                    console.log(localMessage);
                   const data = await AuthDb.register(localMessage.data)
                    ws.send(JSON.stringify({type: 'register', message: data}));
                    break;
                case 'login':
                    break;
                default:
                    ws.send(JSON.stringify({type: 'По дефолу', message: 'По дефолу'}));

            }  
        }); 
        ws.on('close', function () { 
            console.log('Client disconnected'); 
        }); 
    });
}   