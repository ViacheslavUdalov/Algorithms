export async function commonFunction(arrayOfNumbers, funcForSort, row, sortType) {
    const table = document.getElementById("result-table");

    // Нужно для того, что бы браузер успел отрисовать изменения в DOM, setTimeout передаётся в очередь, это позволяет браузеру обновить UI между операциями сортировки
    await new Promise(resolve => setTimeout(resolve, 0));

    for (const number of arrayOfNumbers) {
        let randomArray = createArray(number);
        let sortedArray = createSortedArray(number);
        let reverseSortedArray = createSortedReverseArray(createSortedArray(number));

        async function allSorting(sortFunc, array) {
            let startOne = performance.now();
            sortFunc([...array]);
            return (performance.now() - startOne).toFixed(2)
        }

        let timeBTakenOne = await allSorting(funcForSort, randomArray)

        let timeSortedTakenOne = await allSorting(funcForSort, sortedArray);

        let reverseBROne = await allSorting(funcForSort, reverseSortedArray);


        row = document.createElement("tr");
        row.innerHTML = `
                            <td>${sortType} Sort ${number}</td>
                            <td>${timeBTakenOne}</td>
                            <td>${timeSortedTakenOne}</td>
                            <td>${reverseBROne}</td>
                            `;
        table.appendChild(row);

        await saveResultToDB(sortType, number, {
            random: timeBTakenOne,
            sorted: timeSortedTakenOne,
            reversed: reverseBROne
        })
    }
}

async function saveResultToDB(sortType, arraySize, times) {
    try {
       let response = await fetch('http://localhost:3000/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sortType: sortType,
                arraySize: arraySize,
                times: times, // объект с временами для random, sorted, reversed
                date: new Date().toISOString()
            }),
        });
        if (!response.ok) {
          return response.statusText
        }
        console.log('Data successfully saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

function createArray(number) {
    let array = [];
    for (let i = 0; i < number; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}

function createSortedArray(number) {
    return new Array(number).fill(0).map((el, index) => index + 1)
}


function createSortedReverseArray(array) {
    return array.reverse();
}
































