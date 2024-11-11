import bubbleSort from './bubbleSort.js';
import insertSort from './insertSort.js';
import choiceSort from './choiceSort.js';


console.log(choiceSort(createSortedReverseArray(createSortedArray(10000))))

export async function bubbleSorts(arrayOfNumbers) {
    const table = document.getElementById("result-table")
    for (const number of arrayOfNumbers) {
        let randomArray = createArray(number);
        let sortedArray = createSortedArray(number);
        let reverseSortedArray = createSortedReverseArray(createSortedArray(number));

        function allSorting(sortFunc, array) {
            let startOne = performance.now();
            sortFunc([...array]);
            return (performance.now() - startOne).toFixed(2)
        }

        let timeBTakenOne = allSorting(bubbleSort, randomArray)

        let timeSortedTakenOne = allSorting(bubbleSort, sortedArray);

        let reverseBROne = allSorting(bubbleSort, reverseSortedArray);


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
    const table = document.getElementById("result-table")
    for (const number of arrayOfNumbers) {
        let randomArray = createArray(number);
        let sortedArray = createSortedArray(number);
        let reverseSortedArray = createSortedReverseArray(createSortedArray(number));

        function allSorting(sortFunc, array) {
            let startOne = performance.now();
            sortFunc([...array]);
            return (performance.now() - startOne).toFixed(2)
        }

        let timeBTakenOne = allSorting(choiceSort, randomArray);

        let timeSortedTakenOne = allSorting(choiceSort, sortedArray);

        let reverseBROne = allSorting(choiceSort, reverseSortedArray);



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
    const table = document.getElementById("result-table")
    for (const number of arrayOfNumbers) {
        let randomArray = createArray(number);
        let sortedArray = createSortedArray(number);
        let reverseSortedArray = createSortedReverseArray(createSortedArray(number));

        function allSorting(sortFunc, array) {
            let startOne = performance.now();
            sortFunc([...array]);
            return (performance.now() - startOne).toFixed(2)
        }

        let timeBTakenOne = allSorting(insertSort, randomArray)

        let timeSortedTakenOne = allSorting(insertSort, sortedArray);

        let reverseBROne = allSorting(insertSort, reverseSortedArray);


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
































