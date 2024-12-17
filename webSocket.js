import {WebSocketServer} from "ws";
import {recreateDb} from "./server.helper.js";

export function startWebSocket() {


    const wss = new WebSocketServer({port: 8080});

    wss.on('connection', function connection(ws) {

        console.log('Client connected');


        ws.on('message', async function incoming(message) {
            try {

                console.log(`message`, message)
                if (Buffer.isBuffer(message)) {
                    message = message.toString('utf-8');
                }
                let res;
                try {
                    const localMessage = JSON.parse(message);
                    console.log(localMessage)
                    console.log(`localMessage`, localMessage)
                    res = await recreateDb(localMessage.sortType || null, localMessage.arraySize || null);
                    console.log(res);
                    ws.send(JSON.stringify(res));
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    ws.send(JSON.stringify({error: "Ошибка при парсинге JSON."}));
                }

            } catch (e) {
                console.error(e);
                ws.send(JSON.stringify({error: `Ошибка: ${e.message}`}));
            }

        });


        ws.on('close', function () {
            console.log('Client disconnected');
        });
    });
}