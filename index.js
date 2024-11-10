// console.log(bubbleSort([3, 5, 4, 2, 1]));
// console.log(choiceSort([3, 5, 4, 2, 1]));
// console.log(insertSort([3, 5, 4, 2, 1]));
// console.log('Отсортированный перевёрнутый массив')
// console.log(createSortedReverseArray(createSortedArray(100)))
// let sortedArray = createSortedArray(1000)
// let sortedReverseArray = createSortedReverseArray(1000)
// let notSortedArray = createArray(1000)
// console.log(bubbleSort(createArray(1000)))
// console.log(bubbleSort(createArray(10000)))
// console.log(bubbleSort(createArray(100000)))
// console.log(insertSort(createArray(1000)))
// console.log(insertSort(createArray(10000)))
// console.log(insertSort(createArray(100000)))
// console.log(choiceSort(createArray(1000)))
// console.log(choiceSort(createArray(10000)))
// console.log(choiceSort(createArray(100000)))
// console.log(bubbleSort(createSortedArray(1000)))
// console.log(bubbleSort(createSortedArray(10000)))
// console.log(bubbleSort(createSortedArray(100000)))
// console.log(insertSort(createSortedArray(1000)))
// console.log(insertSort(createSortedArray(10000)))
// console.log(insertSort(createSortedArray(100000)))
// console.log(choiceSort(createSortedArray(1000)))
// console.log(choiceSort(createSortedArray(10000)))
// console.log(choiceSort(createSortedArray(100000)))
// function ReturnAnything() {
//     console.log(bubbleSort(createSortedReverseArray(1000)))
//     console.log(bubbleSort(createSortedReverseArray(10000)))
//     console.log(bubbleSort(createSortedReverseArray(100000)))
//     console.log(insertSort(createSortedReverseArray(1000)))
//     console.log(insertSort(createSortedReverseArray(10000)))
//     console.log(insertSort(createSortedReverseArray(100000)))
//     console.log(choiceSort(createSortedReverseArray(1000)))
//     console.log(choiceSort(createSortedReverseArray(10000)))
//     console.log(choiceSort(createSortedReverseArray(100000)))
//
// }
// console.log(createArray(100));

function bubbleSort(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}


console.log(choiceSort(createSortedReverseArray(createSortedArray(10000))))


function choiceSort(array)  {
    for (let i = 0; i < array.length - 1; i ++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp
            }
        }
    }
    return array;
}


function insertSort(array) {
    for (let i = 1; i < array.length; i++) {
        let inter = i;
        while (inter > 0 && array[inter] < array[inter - 1]) {
            let temp = array[inter];
            array[inter] = array[inter - 1]
            array[inter - 1] = temp
            inter--;
        }
    }
    return array;
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


































