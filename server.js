import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import connectDB from "./connectDB.js";
import config from './config.js';
import { AlgorithmState } from './controllers/AlgorithmState.js';
import Algorithm from "./models/AlgorithmSchema.js";
import {startWebSocket} from "./services/webSocket.js";
import {DBService} from "./services/DBService.js";
import {JobService} from "./services/jobService.js";
import {AuthDb} from "./services/authDb.js";
import UserManager from "./services/userManager.js";

const app = express();
const port = 4000;
await connectDB();
const userManager = new UserManager();
const dbService = new DBService(config);
const algoState = new AlgorithmState(Algorithm, config);
const jobRunner = new JobService(config);
const AuthService = new AuthDb(config);
await algoState.init();

startWebSocket(algoState, dbService, jobRunner, AuthService, userManager);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/images', express.static('images')); 


app.get('/config.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'config.js'));
});

app.use((err, req, res, next) => {
    if (err) {
        return res.status(err.statusCode || 500).json(err.message);
    }
    next()
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
