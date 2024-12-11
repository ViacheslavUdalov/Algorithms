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

        await recreateWithSortType(sortTypeOpt, arraySizeOpt);
    });

document.getElementById("examination")
    .addEventListener('click', async () => {
        await checkBd();
    });


document.getElementById("sortType").addEventListener('change', buttonDisabled);
document.getElementById("arraySize").addEventListener('change', buttonDisabled);


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
    } catch (error) {
        console.error('Error:', error);
    }
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
        const div = document.getElementById("pylemyetchik");
        const row = document.createElement("div");
        row.innerHTML = `
                   <span>${result.message}</span>
                `;
        div.appendChild(row);
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}