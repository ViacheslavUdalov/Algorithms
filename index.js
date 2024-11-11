import bubbleSort from './bubbleSort.js';
import insertSort from './insertSort.js';
import choiceSort from './choiceSort.js';


console.log(choiceSort(createSortedReverseArray(createSortedArray(10000))))

export async function bubbleSorts(arrayOfNumbers) {
    const table = document.getElementById("result-table")

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

        let timeBTakenOne = await allSorting(bubbleSort, randomArray)

        let timeSortedTakenOne = await allSorting(bubbleSort, sortedArray);

        let reverseBROne = await allSorting(bubbleSort, reverseSortedArray);


        let row = document.createElement("tr");
        row.innerHTML = `
                            <td>Bubble Gum ${number}</td>
                            <td>${timeBTakenOne}</td>
                            <td>${timeSortedTakenOne}</td>
                            <td>${reverseBROne}</td>
                            `;
        table.appendChild(row);

    }
}
export async function choiceSorts(arrayOfNumbers) {
    const table = document.getElementById("result-table");

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

        let timeBTakenOne = await allSorting(choiceSort, randomArray);

        let timeSortedTakenOne = await allSorting(choiceSort, sortedArray);

        let reverseBROne = await allSorting(choiceSort, reverseSortedArray);



        let row4 = document.createElement("tr");
        row4.innerHTML = `
                            <td>Choice Sort ${number}</td>
                            <td>${timeBTakenOne}</td>
                            <td>${timeSortedTakenOne}</td>
                            <td>${reverseBROne}</td>
                            `;
        table.appendChild(row4);

    }
}

export async function insertSorts(arrayOfNumbers) {
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

        let timeBTakenOne = await allSorting(insertSort, randomArray)

        let timeSortedTakenOne = await allSorting(insertSort, sortedArray);

        let reverseBROne = await allSorting(insertSort, reverseSortedArray);


        let row6 = document.createElement("tr");
        row6.innerHTML = `
                            <td>Inser Sort ${number}</td>
                            <td>${timeBTakenOne}</td>
                            <td>${timeSortedTakenOne}</td>
                            <td>${reverseBROne}</td>
                            `;
        table.appendChild(row6);

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
































