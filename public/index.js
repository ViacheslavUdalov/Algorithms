window.onload = async () => {

    await loadData();
    renderTable();
}


const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function (event) {
    console.log('connected from WebSocket server');
    const dataToSend = {
        type: 'connect',
        message: 'Присоединились к серверу'
    }
    socket.send(JSON.stringify(dataToSend));
    const Komaru = {
        type: 'Komaru return',
        message: 'Default: Komaru forever!'
    }
    socket.send(JSON.stringify(Komaru));
};

socket.onmessage = function (event) {
    const outputDiv = document
        .getElementById('output');
    outputDiv
        .innerHTML += `<p>Received <b>"${event.data}"</b> from server.</p>`;
    renderString(JSON.parse(event.data))

};

socket.onclose = function (event) {
    console.log('Disconnected from WebSocket server');
};

async function loadData() {
    try {
        const result = await fetch("http://localhost:4000/getData");

        if (!result.ok) {
            console.log(result.statusText);
        }

        const data = await result.json();
        window.data = data;
    } catch (error) {
        console.log(error);
    }
}



function renderString(data) {
    console.log('одна строка рендерится')
    console.log(data);
    const existingRow = document.getElementById(`${data.sortType}_${data.arraySize}`);
    if (existingRow) {
        existingRow.innerHTML = `
            <td>${data.sortType || '!'}</td>
            <td>${data.arraySize || '!'}</td>
            <td>${data.times.random || 'null'}</td>
            <td>${data.times.sorted || 'null'}</td>
            <td>${data.times.reversed || 'null'}</td>
            <td><button class='button' id="${data.sortType}_${data.arraySize}_button">Запустить данную сортировку</button></td>
        `;
    }
    document.getElementById(`${data.sortType}_${data.arraySize}_button`)
        .addEventListener('click', () => {
            requestSort(data.sortType, data.arraySize, 'executeAlgorithms').then(() => {
                renderString(data)
            });

        });
}

function renderTable() {
    console.log('вся таблица рендерится')
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
                <td>${sortRes.times.random || 'null'}</td>
                <td>${sortRes.times.sorted || 'null'}</td>
                <td>${sortRes.times.reversed || 'null'}</td>
                <td><button class='button' id="${sortRes.sortType}_${sortRes.arraySize}_button">Запустить данную сортировку</button></td>
            </tr>
        `;
            tableElement.insertAdjacentHTML('beforeend', rowElement);
            document.getElementById(`${sortRes.sortType}_${sortRes.arraySize}_button`)
                .addEventListener('click', () => {
                    requestSort(sortRes.sortType, sortRes.arraySize, 'executeAlgorithms').then(() => {
                        // console.log(resData);

                        // renderString(data)
                    });

                });
        }
    });

}

async function requestSort(sortType, arraySize, typeForServer) {
    console.log(sortType, arraySize, typeForServer)
    if (socket.readyState === WebSocket.OPEN) {
        const parsedArraySize = parseInt(arraySize, 10);

        socket.send(JSON.stringify({type: typeForServer, sortType, arraySize: parsedArraySize}));

    } else {
        console.error('Web socket закрыты')
    }

}
// function displayData(data) {
//
//     const table = document.getElementById("result-table");
//     data
//         .reduce((prev, curr) => {
//             if (!prev.find(result => result.sortType === curr.sortType && result.arraySize === curr.arraySize)) {
//                 prev.push(curr);
//             }
//             return prev;
//         }, [])
//         // grouping results by sortType
//         .reduce((prev, curr) => {
//             if (!prev.find(group => group.sortType === curr.sortType)) {
//                 prev.push({
//                     sortType: curr.sortType,
//                     results: [],
//                 });
//             }
//             prev.find(group => group.sortType === curr.sortType)
//                 .results.push(curr);
//             return prev;
//         }, [])
//         .forEach((result, index) => {
//             for (let sortRes of result.results) {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                    <td>${sortRes.sortType}</td>
//                     <td>${sortRes.arraySize}</td>
//                     <td>${sortRes.times.random}</td>
//                     <td>${sortRes.times.sorted}</td>
//                     <td>${sortRes.times.reversed}</td>
//                 `;
//                 table.appendChild(row);
//             }
//
//         });
// }