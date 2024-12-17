import {WebSocketServer} from "ws";
import config from "./config.js";
import bubbleSort from "./sorts/bubbleSort.js";
import choiceSort from "./sorts/choiceSort.js";
import {insertSort} from "./sorts/insertSort.js";
import mergeSort from "./sorts/mergeSort.js";
import quickSort from "./sorts/quickSort.js";

const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;
const ARRAY_OF_SORT_FUNCTIONS = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

// const wss = new WebSocketServer({port: 8080});
//
// wss.on('connection', function connection(ws) {
//
//     console.log('Client connected');
//
//
//     ws.on('message', async function incoming(message) {
//       try {
//           // const {sortType, arraySize} = JSON.parse(message);
//           // let res = await recreateDb(sortType || null, arraySize || null);
//           console.log('Received: %s', message);
//
//           ws.send(message);
//       } catch (e) {
//           console.error(e);
//           ws.send({error: `Ошибука ${e}`});
//       }
//
//     });
//
//
//     ws.on('close', function () {
//         console.log('Client disconnected');
//     });
// });