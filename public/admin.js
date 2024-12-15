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
    requestSort(sortTypeOpt, arraySizeOpt)
})

function requestSort(sortType, arraySize) {
    if (socket.readyState === WebSocket.OPEN) {
        console.log(sortType, arraySize)
        const parsedArraySize = parseInt(arraySize, 10);

        console.log(JSON.stringify({sortType, arraySize}));
        socket.send(JSON.stringify({sortType, arraySize: parsedArraySize}));
    } else {
        console.error('Web socket закрыты')
    }

}


    // let selectedElement = document.getElementById('sortType');
    // config.sortTypes.forEach(el => {
    //     debugger
    //     let option = document.createElement('option');
    //     option.value = el;
    //     option.textContent = el;
    //     console.log(option)
    //     selectedElement.appendChild(option);
    // })

functionForSortAndArraysForHTML('sortTypes', 'sortType')
functionForSortAndArraysForHTML('arrayTypes', 'arraySize')
function functionForSortAndArraysForHTML(typeForConfig, getHTMLElement) {
    let selectedElement = document.getElementById(getHTMLElement);
    config[typeForConfig].forEach(el => {
        let option = document.createElement('option');
        option.value = el;
        option.textContent = el;
        console.log(option)
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
function innerResultToClient(stringForReturnResult) {
    const div = document.getElementById("pylemyetchik");
    const row = document.createElement("div");
    row.innerHTML = `
                   <span>${stringForReturnResult}</span>
                `;
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
        innerResultToClient(result.message);
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}