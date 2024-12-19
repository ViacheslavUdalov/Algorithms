import {WebSocketServer} from "ws";
import {getDataFromDb, recreateDb} from "./server.helper.js";

export function startWebSocket() {


    const wss = new WebSocketServer({port: 8080});

    wss.on('connection', function connection(ws) {

        console.log('Client connected');


        ws.on('message', async function incoming(message) {
                        // console.log(`message`, message)
                if (Buffer.isBuffer(message)) {
                    message = message.toString('utf-8');
                    // console.log(message)
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
                        console.log(`localMessage`, localMessage)
                        res = await recreateDb();
                        console.log(res)
                        ws.send(JSON.stringify({type: 'updateAll', message: res}));
                        break;
                    case 'updateRow':
                        console.log(`localMessage`, localMessage)
                        res = await recreateDb(localMessage.sortType, localMessage.arraySize);
                        ws.send(JSON.stringify({type: 'updateRow', message: res[0]}));
                        break;
                    case 'updateCell':
                        console.log(`localMessage`, localMessage)
                        res = await recreateDb(localMessage.sortType, localMessage.arraySize, localMessage.arrayType);
                        console.log(`res`, res);
                        ws.send(JSON.stringify({type: 'updateCell', message: res, arrayType: localMessage.arrayType}));
                        break;
                    case 'Komaru return':
                        ws.send(JSON.stringify({type: 'Komaru return', message: localMessage.message}));
                        break;
                    default:
                }
        });


        ws.on('close', function () {
            console.log('Client disconnected');
        });
    });
}