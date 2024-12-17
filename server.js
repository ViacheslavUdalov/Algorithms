import express from 'express';
import path from 'path';
import {checkBdForData, recreateDb} from "./server.helper.js";
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import connectDB from "./connectDB.js";
import Algorithm from './models/SortResultingSchema.js'
import {startWebSocket} from "./webSocket.js";


const app = express();
const port = 4000;

await connectDB();
startWebSocket()



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'public')));


app.get('/config.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'config.js'));
});

app.get('/getData', async (req, res) => {
    try {
        const data = await Algorithm.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


app.get('/check', async (req, res) => {
    let response = await checkBdForData();

    res.status(200).json({message: response})
});

app.post(`/writeToDb`, async (req, res) => {
    let {sortType, arraySize} = req.body;

    await recreateDb(sortType || null, Number(arraySize) || null, res);

    res.status(200).json({message: "Komaru One Love"})

})

app.use((err, req, res, next) => {
    if (err) {
        return res.status(err.statusCode || 500).json(err.message);
    }
    next()
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
