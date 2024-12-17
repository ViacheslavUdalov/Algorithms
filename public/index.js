window.onload = async () => {
    await loadData();
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
        displayData(data)
    } catch (error) {
        console.log(error);
    }
}

function displayData(data) {

    const table = document.getElementById("result-table");
    data
        .reduce((prev, curr) => {
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
        }, [])
        .forEach((result, index) => {
            for (let sortRes of result.results) {
                console.log(result);
                const row = document.createElement("tr");
                row.innerHTML = `
                   <td>${sortRes.sortType}</td>
                    <td>${sortRes.arraySize}</td>
                    <td>${sortRes.times.random}</td>
                    <td>${sortRes.times.sorted}</td>
                    <td>${sortRes.times.reversed}</td>
                `;
                table.appendChild(row);
            }

        });
}