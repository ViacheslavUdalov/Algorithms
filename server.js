import express from 'express';
import path from 'path';
import {checkBdForData, getDataFromDb, recreateDb} from "./server.helper.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 4000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const dbFilePath = path.join(__dirname, 'db.json');

app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.get('/getData', async (req, res) => {
    let data = await getDataFromDb();
    res.status(200).json({message: JSON.parse(data)})
});
app.get('/check', async (req, res) => {
    let response = await checkBdForData();

    res.status(200).json({message:response})
});

app.post(`/writeToDb`, async (req, res) => {
  try {
      console.log(req.body);
        let { sortType, arraySize } = req.body;

      await recreateDb(sortType || null, Number(arraySize) || null);

        res.status(200).json({message: "Komaru One Love"})

  } catch (e) {
      console.log(e);
  }



})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
