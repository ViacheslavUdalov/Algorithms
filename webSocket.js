import {WebSocketServer} from "ws";
import eventEmmiter from "./eventEmmiter.js";
import { ALGO_MESSAGES } from "./controllers/AlgorithmState.js";


export function startWebSocket(algoState, dbService, jobService) {
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

        eventEmmiter.on('requestStart', () => {
            ws.send(JSON.stringify({
                type: 'requestStart', message: 'Работаем'
            }))
        });
        //
        // eventEmmiter.on('requestFinish', (data, sortType, arraySize, arrayType) => {
        //     ws.send(JSON.stringify({
        //         type: 'requestFinish', message: data, sortType, arraySize, arrayType
        //     }));
        // });

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
                  await dbService.deleteDb();
                  await dbService.saveAllToDb(jobService, algoState, dbService);
                    break;
                case 'updateRow':
                    console.log('updateRow')
                    res = await jobService.executeFuncForString(algoState, dbService, localMessage.sortType, localMessage.arraySize);
                    break;
                case 'updateCell':
                    console.log(`localMessage`, localMessage)
                   await jobService.executeFuncForCell(algoState, dbService, localMessage.arraySize, localMessage.sortType, localMessage.arrayType);
                    break;
                case 'Komaru return':
                    ws.send(JSON.stringify({type: 'Komaru return', message: localMessage.message}));
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