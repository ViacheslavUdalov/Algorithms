import connectDB from "./connectDB.js";
import express from "express";

const app = express();
const port = 4000;

await connectDB();

// const wss = new WebSocketServer({port: 8080});

// wss.on('connection', function connection(ws) {
//
//     console.log('Client connected');


    // ws.on('message', async function incoming(message) {
    //     try {
    //         if (Buffer.isBuffer(message)) {
    //             // Преобразуем буфер в строку (предполагаем, что это UTF-8 строка)
    //             message = message.toString('utf-8');
    //         }
    //         let res;
    //         if (typeof message == 'string') {
    //             ws.send(JSON.stringify({message: message}));
    //         } else {
    //             try {
    //                 // Попробуем распарсить строку как JSON
    //                 const localMessage = JSON.parse(message);
    //
    //                 console.log(`localMessage`, localMessage)
    //
    //                 // Выполняем сортировку, если это указано
    //                 if (localMessage.sorting) {
    //                     res = await recreateDb(localMessage.sortType || null, localMessage.arraySize || null);
    //                     console.log(res);
    //                     ws.send(JSON.stringify(res));  // Отправляем результат обратно клиенту
    //                 }
    //             } catch (error) {
    //                 console.error("Error parsing JSON:", error);
    //                 ws.send(JSON.stringify({error: "Ошибка при парсинге JSON."}));
    //             }
    //         }
    //
    //     } catch (e) {
    //         console.error(e);
    //         ws.send(JSON.stringify({error: `Ошибка: ${e.message}`}));
    //     }
    //
    // });


//     ws.on('close', function () {
//         console.log('Client disconnected');
//     });
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'public')));


app.get('/config.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'config.js'));
});
// app.get('/getData', async (req, res) => {
//     let data = await getDataFromDb();
//     res.status(200).json({message: JSON.parse(data)})
// });





app.get('/getData', async (req, res) => {
    try{
        // console.log(Algorithm)

        const data = await Algorithm.find();
        console.log(data)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});




app.get('/check', async (req, res) => {
    let response = await checkBdForData();

    res.status(200).json({message: response})
});

app.post(`/writeToDb`, async (req, res) => {
    let {sortType, arraySize} = req.body;

    await recreateDb(sortType || null, Number(arraySize) || null);

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
