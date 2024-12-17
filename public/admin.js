import config from "../config.js";

document.getElementById("wholeBase").addEventListener('click', async () => {
    await recreateWithSortType();
});

document.getElementById("byType").addEventListener('click', async () => {
    let sortTypeOpt = document.getElementById("sortType").value;
    await recreateWithSortType(sortTypeOpt);
});

document.getElementById("byTypeAndArray")
    .addEventListener('click', async () => {
        let sortTypeOpt = document.getElementById("sortType").value;
        let arraySizeOpt = document.getElementById("arraySize").value;

        await recreateWithSortType(sortTypeOpt, Number(arraySizeOpt));
    });

document.getElementById("examination")
    .addEventListener('click', async () => {
        await checkBd();
    });


document.getElementById("sortType").addEventListener('change', buttonDisabled);
document.getElementById("arraySize").addEventListener('change', buttonDisabled);

document.getElementById('Koma').addEventListener('click', () => {
    let sortTypeOpt = document.getElementById("sortType").value;
    let arraySizeOpt = document.getElementById("arraySize").value;
    requestSort(sortTypeOpt, arraySizeOpt, 'sorting')
})

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function (event) {
    console.log("Connection opened");
};

socket.onmessage = function (event) {
    console.log(event)
    const data = JSON.parse(event.data);
    const outputDiv = document
        .getElementById('output');
    outputDiv
        .innerHTML += `<p>Received <b>"${JSON.stringify(data)}"</b> from server.</p>`;
};

socket.onclose = function (event) {
    console.log('Disconnected from WebSocket server');
};


function requestSort(sortType, arraySize, typeForServer) {
    if (socket.readyState === WebSocket.OPEN) {
        console.log(sortType, arraySize)
        const parsedArraySize = parseInt(arraySize, 10);

        console.log(JSON.stringify({sortType, arraySize}));
        socket.send(JSON.stringify({type: "executeAlgorithms", sortType, arraySize: parsedArraySize}));

    } else {
        console.error('Web socket закрыты')
    }

}


functionForSortAndArraysForHTML('sortTypes', 'sortType')
functionForSortAndArraysForHTML('arrayTypes', 'arraySize')

function functionForSortAndArraysForHTML(typeForConfig, getHTMLElement) {
    let selectedElement = document.getElementById(getHTMLElement);
    config[typeForConfig].forEach(el => {
        let option = document.createElement('option');
        option.value = el;
        option.textContent = el;
        selectedElement.appendChild(option);
    })
}


async function recreateWithSortType(sortType = null, arraySize = null) {
    try {
        const response = await fetch('http://localhost:4000/writeToDb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({sortType, arraySize})
        });

        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        const result = await response.json();
        console.log('Server response:', result);
        return innerResultToClient('Новые данные успешно вернулись с сервера!');
    } catch (error) {
        console.error('Error:', error);
    }
}

function innerResultToClient(data) {
    // console.log(data)
    const div = document.getElementById("pylemyetchik");
    const row = document.createElement("div");
    Object.entries(data).forEach(item => {
        // console.log(item);
        for (let i = 0; i < item[1].length; i++) {
            console.log(item)
            const span = document.createElement("span");
            span.innerHTML = `
                   <span>${item[0]} - тип Сортировки: ${item[1][i]?.sortType} - размер Массива: ${item[1][i]?.arraySize} -count: ${item[1][i]?.count}</span> 
                `;
            row.appendChild(span);
            row.appendChild(document.createElement("br"));

        }
    })
    div.appendChild(row);
}

function buttonDisabled() {
    const sortType = document.getElementById("sortType").value;
    const arraySize = document.getElementById("arraySize").value;

    const byTypeButton = document.getElementById("byType");
    const byTypeAndArrayButton = document.getElementById("byTypeAndArray");

    if (!sortType && !arraySize) {
        byTypeButton.disabled = true;
        byTypeAndArrayButton.disabled = true;
    } else {
        byTypeButton.disabled = !sortType;
        byTypeAndArrayButton.disabled = !(arraySize && sortType);
    }
}

async function checkBd() {
    try {
        const response = await fetch('http://localhost:4000/check');

        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        const result = await response.json();
        // console.log(result)
        innerResultToClient(result.message);
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}