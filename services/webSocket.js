import {WebSocketServer} from "ws";
import {ALGO_MESSAGES} from "../controllers/AlgorithmState.js";
import {AuthDb} from "./authDb.js";

let users = [];

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
                    console.log(`localMessage.token`, localMessage);
                    if (localMessage.message) {
                        if (AuthDb.checkRoleIsAdmin(localMessage.message)) {
                            console.log(`localMessage.token`, localMessage.message);
                            await dbService.deleteDb();
                            await dbService.saveAllToDb(algoState);
                        } else {
                            ws.send(JSON.stringify({type: 'Komaru return', message: 'Вы не админ'}));
                        }
                    } else {
                        ws.send(JSON.stringify({type: 'Komaru return', message: 'Вы не залогинины'}));

                    }
                    
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
                case 'logout':
                    console.log(`users`, users);
                    users = users.filter(user => user.username !== localMessage.message.username)

                    console.log(`users`, users);
                    break;
                case 'register':
                    console.log(`localMessage`, localMessage);
                    const registerData = await AuthDb.register(localMessage.data);
                    const existingUser = users.find(user => user.username === localMessage.data.username)
                    if (!existingUser) {
                        users.push({username: localMessage.data.username, email: localMessage.data.email, ws})
                        console.log(`user ${localMessage.data} - ${ws} workaet`)
                    } else {
                        existingUser.ws = ws;
                        console.log(`user ${localMessage.data} - ${ws} pereworkal`)
                    }
                    const notification = {
                        type: 'notification',
                        message: `${localMessage.data.username} ${localMessage.data.type === 'register' ? 'зарегистрировался' : 'вошёл в систему'}!`,
                    };
                    users.forEach((user) => {
                        if (user.ws.readyState === ws.OPEN) {
                            user.ws.send(JSON.stringify(notification));
                        }
                    })
                    ws.send(JSON.stringify({type: 'register', message: registerData}));
                    break;
                case 'login':
                    console.log(`localMessage`, localMessage);
                    const loginData = await AuthDb.login(localMessage.data)
                    const existingLoginUser = users.find(user => user.email === localMessage.data.email)
                    if (!existingLoginUser) {
                        users.push({username: localMessage.data.username, ws})
                        console.log(localMessage.data)
                    } else {
                        existingLoginUser.ws = ws;
                        console.log(`user ${localMessage.data}`)
                    }
                    const notificationLog = {
                        type: 'notification',
                        message: `${loginData.userData.username} ${localMessage.data.type === 'register' ? 'зарегистрировался' : 'вошёл в систему'}!`,
                    };
                    users.forEach((user) => {
                        if (user.ws.readyState === ws.OPEN) {
                            user.ws.send(JSON.stringify(notificationLog));
                        }
                    })
                    console.log(`loginData`, loginData);
                    ws.send(JSON.stringify({type: 'login', message: loginData}));
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