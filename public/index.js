// Client

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function (event) {
    console.log('connected from WebSocket server');
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
            renderTable(jsondata.message);
            setLoading(false);
            break;
        case 'updateRow' :
            renderRow(jsondata.message);
            break;
        case 'updateCell' :
            renderCell(jsondata.message, jsondata.arrayType);
            break;
        case 'Komaru return' :
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        case 'connect' :
            outputDiv = document
                .getElementById('output');
            outputDiv.innerHTML += `<p>Received <b>"${jsondata.message}"</b> from server.</p>`;
            break;
        default:
            console.log('не выполнен ни один из кейсов');
    }
};

socket.onclose = function (event) {
    console.log('Disconnected from WebSocket server');
    setLoading(false);
    const Disconnected = document.createElement('div');
    Disconnected.innerHTML = 'Disconnected from WebSocket server';

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
            <td id="${data.sortType}_${data.arraySize}_random">${data.times.random || 'null'} <button id="${data.sortType}_${data.arraySize}_random">Ячейка</button></td>
            <td id="${data.sortType}_${data.arraySize}_sorted">${data.times.sorted || 'null'} <button id="${data.sortType}_${data.arraySize}_sorted">Ячейка</button></td>
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
    const existingCell = document.getElementById(`${data.sortType}_${data.arraySize}_${Object.keys(data.times).find(el => el === arrayType)}`);
    if (existingCell) {
        existingCell.innerHTML = `
            <td id="${data.sortType}_${data.arraySize}_${Object.keys(data.times).find(el => el === arrayType)}">
                ${data.times[arrayType] || 'null'}
 <button id="${data.sortType}_${data.arraySize}_${Object.keys(data.times).find(el => el === arrayType)}_button">Ячейка</button>
</td>

        `;
    }
    document.getElementById(`${data.sortType}_${data.arraySize}_${Object.keys(data.times).find(el => el === arrayType)}_button`)
        .addEventListener('click', () => {
            console.log('кликнули')
            updateCell(data.sortType, data.arraySize, Object.keys(data.times).find(el => el === arrayType)).then(() => {
                renderCell(data, arrayType)
            });
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
    window.data.reduce((prev, curr) => {
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
            const rowElement = `
            <tr id="${sortRes.sortType}_${sortRes.arraySize}">
                <td>${sortRes.sortType || '!'}</td>
                <td>${sortRes.arraySize || '!'}</td>
                <td id="${sortRes.sortType}_${sortRes.arraySize}_random">${sortRes.times.random || 'null'}<button id="${sortRes.sortType}_${sortRes.arraySize}_random_button">Ячейка</button></td>
                <td id="${sortRes.sortType}_${sortRes.arraySize}_sorted">${sortRes.times.sorted || 'null'}<button id="${sortRes.sortType}_${sortRes.arraySize}_sorted_button">Ячейка</button></td>
                <td id="${sortRes.sortType}_${sortRes.arraySize}_reversed">${sortRes.times.reversed || 'null'}<button id="${sortRes.sortType}_${sortRes.arraySize}_reversed_button">Ячейка</button></td>
                <td><button class='button' id="${sortRes.sortType}_${sortRes.arraySize}_button">Запустить данную сортировку</button></td>
            </tr>
        `;
            tableElement.insertAdjacentHTML('beforeend', rowElement);

            document.getElementById(`${sortRes.sortType}_${sortRes.arraySize}_button`)
                .addEventListener('click', async () => {
                    await updateRow(sortRes.sortType, sortRes.arraySize);
                });
            document.getElementById(`${sortRes.sortType}_${sortRes.arraySize}_${Object.keys(sortRes.times).find(el => el === 'reversed')}_button`)
                .addEventListener('click', () => {
                    console.log('кликнули')
                    console.log(Object.keys(sortRes.times))
                    updateCell(sortRes.sortType, sortRes.arraySize, Object.keys(sortRes.times).find(el => el === 'reversed')).then(() => {
                        renderCell(sortRes, 'reversed')
                    });
                });
            document.getElementById(`${sortRes.sortType}_${sortRes.arraySize}_${Object.keys(sortRes.times).find(el => el === 'sorted')}_button`)
                .addEventListener('click', () => {
                    console.log('кликнули')
                    updateCell(sortRes.sortType, sortRes.arraySize, Object.keys(sortRes.times).find(el => el === 'sorted')).then(() => {
                        renderCell(sortRes, 'sorted')
                    });
                });
            document.getElementById(`${sortRes.sortType}_${sortRes.arraySize}_${Object.keys(sortRes.times).find(el => el === 'random')}_button`)
                .addEventListener('click', () => {
                    console.log('кликнули')
                    updateCell(sortRes.sortType, sortRes.arraySize, Object.keys(sortRes.times).find(el => el === 'random')).then(() => {
                        renderCell(sortRes, 'random')
                    });
                });
        }
    });
}

document.getElementById('restartAll')
    .addEventListener('click', () => {
        console.log('кликнули');
        updateAll().then(() => {
            renderTable();
        });
    });

// actions

async function requestSort(sortType, arraySize, typeForServer, arrayType = null) {
    if (socket.readyState === WebSocket.OPEN) {
        const parsedArraySize = parseInt(arraySize, 10);

        socket.send(JSON.stringify({type: typeForServer, sortType, arraySize: parsedArraySize, arrayType}));

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
    const table = document.getElementById('sortingTable');
    if (isLoading) {
        loadingElement.style.display = 'block';
        buttonElement.style.display = 'none';
        table.style.display = 'none';
    } else {
        loadingElement.style.display = 'none';
        buttonElement.style.display = 'block';
        table.style.display = 'inline-block';
    }
}
// updaters

async function updateRow(sortType, arraySize) {
    await requestSort(sortType, arraySize, "updateRow");
}

async function updateAll() {
    setLoading(true);
    await requestSort(null, null, "updateAll");

}

async function updateCell(sortType, arraySize, arrayType) {
    await requestSort(sortType, arraySize, "updateCell", arrayType);
}