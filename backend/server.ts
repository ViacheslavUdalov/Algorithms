import {fileURLToPath} from 'url';
import {dirname} from 'path';
import connectDB from "./connectDB.js";
import * as path from "path";
import UserManager from "./services/userManager.js";
import {DBService} from "./services/DBService.js";
import {AlgorithmState} from "./controllers/AlgorithmState.js";
import {JobService} from "./services/jobService.js";
import {AuthDb} from "./services/authDb.js";
import {startWebSocket} from "./services/webSocket.js";
import express, {Express} from "express";
import config from "../config.js";


const app: Express = express();
const port = 4000;
await connectDB();
const userManager = new UserManager();
const dbService = new DBService(config);
const algoState = new AlgorithmState(dbService, config);
const jobRunner = new JobService(config);
const AuthService = new AuthDb(config);
await algoState.init();

// @ts-ignore
startWebSocket(algoState, dbService, jobRunner, AuthService, userManager);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.static(path.join(path.resolve(), 'client')));
app.use('/images', express.static('images')); 


app.get('/config.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'config.js'));
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
