import {ALGO_MESSAGES} from "../controllers/AlgorithmState.js";
import { WebSocketServer , WebSocket} from 'ws';
import {UserWithWebSocketData} from "../serverModels/userWithWebSocketData.js";
import {AlgorithmModel} from "../serverModels/Algorithm.js";
import {AlgoStateInterface} from "../interfaces/AlgoState.js";
import {DbServiceInterface} from "../interfaces/DbServiceInterface.js";
import {JobServiceInterface} from "../interfaces/JobServiceInterface.js";
import {AuthDbInterface} from "../interfaces/AuthDbInterface.js";
import {UserManagerInterface} from "../interfaces/userManagerInterface.js";
let counter = 0;
export function startWebSocket(algoState: AlgoStateInterface, 
                               dbService: DbServiceInterface, 
                               JobService: JobServiceInterface,
                               AuthDb: AuthDbInterface, 
                               userManager: UserManagerInterface) {
    const wss = new WebSocketServer({port: 8080});


    wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected');

        algoState.updateEmitter.on(ALGO_MESSAGES.oneUpdated, (algo: AlgorithmModel, arrayType: string) => {
            console.log('ОТправляем данные')
            ws.send(JSON.stringify({
                type: 'oneUpdated',
                message: algo,
                arrayType
            }));
        });

        algoState.updateEmitter.on(ALGO_MESSAGES.allUpdated, (message: string) => {
            ws.send(JSON.stringify({
                type: 'allUpdated',
                message: message,
            }));
        });

        algoState.updateEmitter.on(ALGO_MESSAGES.extra, (algos: AlgorithmModel[]) => {
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

        ws.on('message', async function incoming(message: any) {
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
                            ws.send(JSON.stringify({type: 'writeToDb', message: 'Вы не админ'}));
                        }
                    } else {
                        ws.send(JSON.stringify({type: 'writeToDb', message: 'Вы не залогинины'}));

                    } 

                    break;
                case 'updateRow':
                    console.log('updateRow')
                    res = await JobService.executeFuncForString(algoState, localMessage.sortType, localMessage.arraySize);
                    break;
                case 'updateCell':
                    await JobService.executeFuncForCell(algoState, localMessage.arraySize, localMessage.sortType, localMessage.arrayType);
                    break;
                case 'token':
                   const user = await AuthDb.getUser(localMessage.message);
                    if (!user || typeof user !== 'object') {
                        return;
                    }
                   const updatedUser = userManager.findUserByUsername(user.username);
                    if (!updatedUser) {
                        userManager.addUser({username: user.username as string, email: user.email, ws});
                        ws.send(JSON.stringify({type: 'token', message: JSON.stringify(user)}));
                        return;
                    }
                    updatedUser.ws = ws;
                    ws.send(JSON.stringify({type: 'token', message: JSON.stringify(user)}));
                    break;
                case 'logout':
                    console.log(`localMessage`, localMessage)
                    userManager.removeUser(localMessage.message.username)

                    break;
                case 'register':
                    console.log(`localMessage`, localMessage);
                    const registerData = await AuthDb.register(localMessage.data);
                    const existingUser = userManager.findUserByUsername(localMessage.data.username)
                    console.log(`existingUser`, existingUser);
                    if (!existingUser) {
                        console.log(ws)
                        userManager.addUser({username: localMessage.data.username, email: localMessage.data.email, ws})
                        console.log(`user ${localMessage.data} - ${ws} workaet`)
                    } else {
                        ws.send(JSON.stringify({type: 'register', message: 'Почта уже существует'}));
                        return 'Почта уже существует'
                    }

                    const notification = {
                        type: 'notification',
                        message: `${localMessage.data.username} ${localMessage.data.type === 'register' ? 'зарегистрировался' : 'вошёл в систему'}!`,
                    };
                    userManager.users.forEach((user: UserWithWebSocketData) => {
                        if (user.ws.readyState === ws.OPEN) {
                            user.ws.send(JSON.stringify(notification));
                        }
                    })
                    ws.send(JSON.stringify({type: 'register', message: registerData}));
                    break;
                case 'login':
                    const loginData = await AuthDb.login(localMessage.data);
                    if (loginData === false || typeof loginData !== 'object') {
                        const notificationLog = {
                            type: 'notification',
                            message: `чел не зареган`,
                        };
                        ws.send(JSON.stringify(notificationLog));
                        return 
                    }
                    console.log(`loginData`, loginData)
                    const existingLoginUser = userManager.findUserByEmail(localMessage.data.email);
                    console.log(existingLoginUser)
                    if (!existingLoginUser) {
                        userManager.addUser({username: loginData.userData.username, email: localMessage.data.email, ws})
                        console.log(`user ${localMessage} - ${ws} login`)
                    } else {
                        existingLoginUser.ws = ws;
                        console.log(`user ${localMessage.data}`)
                    }
                    const notificationLog = {
                        type: 'notification',
                        message: `${loginData.userData.username} ${localMessage.data.type === 'register' ? 'зарегистрировался' : 'вошёл в систему'}!`,
                    };
                    userManager.users.forEach((user: UserWithWebSocketData) => {
                        if (user.ws.readyState === ws.OPEN) {
                            user.ws.send(JSON.stringify(notificationLog));
                        }
                    })
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