// Client

import config from "../config.js";
import getSocket from "./socketProvider.js";

export const socket = getSocket();
console.log(socket)
document.getElementById('writeToDb')
    .addEventListener('click', async () => {

        const Komaru = {
            type: 'writeToDb',
            message: _getTokenFromLocalStr()
        }
        console.log(Komaru);
        socket.send(JSON.stringify(Komaru));
    });

document.getElementById('logout')
    .addEventListener('click', async () => {
        console.log('кликнули')
        localStorage.removeItem('token');
        const username = localStorage.getItem('username');
        localStorage.removeItem('username');
        const logout = {
            type: 'logout',
            message: username
        }
        socket.send(JSON.stringify(logout));
    });

const {sortTypes, arrayTypes} = config;
const types = ['random', 'sorted', 'reversed'];

socket.onopen = function (event) {
    console.log('index')

    console.log('connected from Websocket server');
    const dataToSend = {
        type: 'connect',
        message: 'Присоединились к серверу'
    }

    socket.send(JSON.stringify(dataToSend));
    getAllData();
    const Komaru = {
        type: 'Komaru return',
        message: 'Default: Komaru forever!'
    }
    socket.send(JSON.stringify(Komaru));
};

socket.onmessage = function (event) {
    let jsondata = JSON.parse(event.data);

    let outputDiv = '';
    switch (jsondata.type) {
        case 'getData' :
            window.data = jsondata.message;
            renderTable(jsondata.message);
            setLoading(false);
            break;
        case 'updateAll' :
            window.data = jsondata.message;
            setLoading(false);
            break;
        case 'updateRow' :
            renderRow(jsondata.message);
            break;
        case 'updateCell' :
            console.log('updateCell');
            renderCell(jsondata.message, jsondata.arrayType);
            break;
        case 'Komaru return' :
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        case 'connect' :
            console.log(`connected`, jsondata)
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        case 'requestStart' :
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        case 'oneUpdated' :
            renderCell(jsondata.message, jsondata.arrayType);
            break;
        case 'allUpdated' :
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        case 'extra' :
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message.arraySize}" - "${jsondata.message.sortType}" - "${jsondata.message._id}"</b> from server.</p>`;
            break;
        case 'writeToDb' :
            console.log('writeToDb')
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        case 'register' :
        case 'login' :
            console.log(jsondata)
            localStorage.setItem('token', JSON.stringify(jsondata.message.token))
            localStorage.setItem('username', JSON.stringify(jsondata.message.userData.username))
            // window.location.href = '/';
            break;
        case 'notification' :
            console.log('notification')
            console.log(jsondata)
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        default:
            console.log(jsondata)
            console.log('не выполнен ни один из кейсов');
    }
};


function _getTokenFromLocalStr() {
    return JSON.parse(localStorage.getItem('token'));
}

socket.onclose = function (event) {
    console.log('Disconnected from Websocket server');
    setLoading(false);
    const Disconnected = document.createElement('div');
    Disconnected.innerHTML = 'Disconnected from Websocket server';

};


// Engine

// renders
function renderRow(data) {
    console.log('одна строка рендерится')
    const existingRow = document.getElementById(`${data.sortType}_${data.arraySize}`);
    if (existingRow) {
        existingRow.innerHTML = `
            <td>${data.sortType || '!'}</td>
            <td>${data.arraySize || '!'}</td>
            <td id="${data.sortType}_${data.arraySize}_random">${data.times.random || 'null'} <button id="${data.sortType}_${data.arraySize}_random_button">Ячейка</button></td>
            <td id="${data.sortType}_${data.arraySize}_sorted">${data.times.sorted || 'null'} <button id="${data.sortType}_${data.arraySize}_sorted_button">Ячейка</button></td>
            <td id="${data.sortType}_${data.arraySize}_reversed">${data.times.reversed || 'null'}  <button id="${data.sortType}_${data.arraySize}_reversed_button">Ячейка</button>
</td>
            <td><button class='button' id="${data.sortType}_${data.arraySize}_button">Запустить данную сортировку</button></td>
        `;
    }
    document.getElementById(`${data.sortType}_${data.arraySize}_button`)
        .addEventListener('click', () => {
            updateRow(data.sortType, data.arraySize).then(() => {
                renderRow(data)
            });
        });
}

function renderCell(data, arrayType) {
    console.log('одна ячейка рендерится')
    const existingCell = document.getElementById(`${data.sortType}_${data.arraySize}_${arrayType}`);
    if (existingCell) {
        existingCell.innerHTML = `
            <td id="${data.sortType}_${data.arraySize}_${arrayType}">
                ${data.times[arrayType]}
 <button id="${data.sortType}_${data.arraySize}_${arrayType}_button">Ячейка</button>
</td>
        `;
    }
    setCellLoading(data.sortType, data.arraySize, arrayType, false);
    document.getElementById(`${data.sortType}_${data.arraySize}_${arrayType}_button`)
        .addEventListener('click', async () => {
            console.log('кликнули')
            await updateCell(data.sortType, data.arraySize, arrayType, data.id)
            //     .then(() => {
            //     renderCell(data, arrayType)
            // });
        });
}


function renderTable() {
    console.log('вся таблица рендерится');
    const tableElement = document.getElementById('sortingTable');
    tableElement.innerHTML = `
        <tr>
            <th>Sort Type</th>
            <th>Array Size</th>
            <th>Random</th>
            <th>Sorted</th>
            <th>Reversed</th>
            <th>Action</th>
        </tr>
    `;
    window.data && window.data.reduce((prev, curr) => {
        if (!prev.find(result => result.sortType === curr.sortType && result.arraySize === curr.arraySize)) {
            prev.push(curr);
        }
        return prev;
    }, [])
        // grouping results by sortType
        .reduce((prev, curr) => {
            if (!prev.find(group => group.sortType === curr.sortType)) {
                prev.push({
                    sortType: curr.sortType,
                    results: [],
                });
            }
            prev.find(group => group.sortType === curr.sortType)
                .results.push(curr);
            return prev;
        }, []).forEach(row => {
            for (let sortRes of row.results) {
                let rowElement;
                if (sortRes.sortType && sortRes.arraySize) {
                    rowElement = `
            <tr id="${sortRes.sortType}_${sortRes.arraySize}">
                <td>${sortRes.sortType || '!'}</td>
                <td>${sortRes.arraySize || '!'}</td>
                <td id="${sortRes.sortType}_${sortRes.arraySize}_random">${sortRes.times.random || 'null'}<button id="${sortRes.sortType}_${sortRes.arraySize}_random_button">Ячейка</button></td>
                <td id="${sortRes.sortType}_${sortRes.arraySize}_sorted">${sortRes.times.sorted || 'null'}<button id="${sortRes.sortType}_${sortRes.arraySize}_sorted_button">Ячейка</button></td>
                <td id="${sortRes.sortType}_${sortRes.arraySize}_reversed">${sortRes.times.reversed || 'null'}<button id="${sortRes.sortType}_${sortRes.arraySize}_reversed_button">Ячейка</button></td>
                <td><button class='button' id="${sortRes.sortType}_${sortRes.arraySize}_button">Запустить данную сортировку</button></td>
            </tr>
        `;
                }

                tableElement.insertAdjacentHTML('beforeend', rowElement);
                document.getElementById(`${sortRes.sortType}_${sortRes.arraySize}_button`)
                    .addEventListener('click', async () => {
                        await updateRow(sortRes.sortType, sortRes.arraySize);
                    });
                restartCell(sortRes, 'reversed');
                restartCell(sortRes, 'sorted');
                restartCell(sortRes, 'random');
            }
        });
}

function restartCell(sortResult, arrayType) {
    const elementId = `${sortResult.sortType}_${sortResult.arraySize}_${arrayType}_button`;
    const element = document.getElementById(elementId);
    element.addEventListener('click', () => {
        updateCell(sortResult.sortType, sortResult.arraySize, arrayType, sortResult.id).then(() => {
            renderCell(sortResult, arrayType);
        });
    });
}

document.getElementById('restartAll')
    .addEventListener('click', async () => {
        console.log('кликнули');
        await updateAll();
    });

// actions

async function requestSort(sortType, arraySize, typeForServer, arrayType = null, id = null) {
    if (socket.readyState === WebSocket.OPEN) {
        const parsedArraySize = parseInt(arraySize, 10);

        socket.send(JSON.stringify({type: typeForServer, sortType, arraySize: parsedArraySize, arrayType, id}));

    } else {
        console.error('Web socket закрыты')
    }

}

function getAllData() {
    setLoading(true);
    if (socket.readyState === WebSocket.OPEN) {
        const getData = {
            type: 'getData'
        }
        socket.send(JSON.stringify(getData));
    } else {
        console.error('Web socket закрыты')
    }
}


function setLoading(isLoading) {
    const loadingElement = document.getElementById('loading');
    const buttonElement = document.getElementById('restartAll');
    if (isLoading) {
        loadingElement.style.display = 'block';
        buttonElement.style.display = 'none';
    } else {
        loadingElement.style.display = 'none';
        buttonElement.style.display = 'block';
    }
}

function setCellLoading(sortType, arraySize, arrayType, isLoading) {
    const cellId = `${sortType}_${arraySize}_${arrayType}`;
    const cellElement = document.getElementById(cellId);

    if (!cellElement) {
        console.error('ячейка с данным айди не найдена');
        return;
    }
    const buttonElement = document.getElementById(`${cellId}_button`);
    if (isLoading) {
        cellElement.classList.add('cell-loading');
        buttonElement.style.display = 'none';
    } else {
        cellElement.classList.remove('cell-loading');
        buttonElement.style.display = 'block';
    }
}

// updaters

async function updateRow(sortType, arraySize) {
    const types = ['random', 'sorted', 'reversed'];
    for (const arrayType of types) {
        setCellLoading(sortType, arraySize, arrayType, true);
    }

    await requestSort(sortType, arraySize, "updateRow");
}

async function updateAll() {
    for (const sortType of sortTypes) {
        for (const arraySize of arrayTypes) {
            for (const arrayType of types) {
                setCellLoading(sortType, arraySize, arrayType, true);
            }
        }
    }
    await requestSort(null, null, "updateAll");
}

async function updateCell(sortType, arraySize, arrayType, id) {
    setCellLoading(sortType, arraySize, arrayType, true);
    await requestSort(sortType, arraySize, "updateCell", arrayType, id);
}