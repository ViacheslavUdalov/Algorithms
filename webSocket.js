import {WebSocketServer} from "ws";
import {getDataFromDb, recreateDb} from "./server.helper.js";
import eventEmmiter from "./eventEmmiter.js";
export function startWebSocket() {


    const wss = new WebSocketServer({port: 8080});

    wss.on('connection', function connection(ws) {
        console.log('Client connected');

        eventEmmiter.on('requestStart', () => {
            ws.send(JSON.stringify({
                type: 'requestStart', message: 'Работаем'
            }))
        });
        eventEmmiter.on('requestFinish', (data, sortType, arraySize, arrayType) => {
            ws.send(JSON.stringify({
                type: 'requestFinish', message: data, sortType, arraySize, arrayType
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
                    let result = await getDataFromDb();
                    ws.send(JSON.stringify({type: 'getData', message: result}));
                    break;
                case 'updateAll':
                    res = await recreateDb();
                    ws.send(JSON.stringify({type: 'updateAll', message: res}));
                    break;
                case 'updateRow':
                    res = await recreateDb(localMessage.sortType, localMessage.arraySize);
                    ws.send(JSON.stringify({type: 'updateRow', message: res[0]}));
                    break;
                case 'updateCell':
                    res = await recreateDb(localMessage.sortType, localMessage.arraySize, localMessage.arrayType);
                    ws.send(JSON.stringify({type: 'updateCell', message: res, arrayType: localMessage.arrayType}));
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