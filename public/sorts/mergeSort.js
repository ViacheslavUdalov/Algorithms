// Устойчивая сортировка - не меняет порядок равных элементов

// Массив разбивается так же на две части рекурсивно и потом каждый элемент из двух массивов
// сравнивается и добавляется в третий.

// Сначала создаём функцию помошник, которая будет мержить два отсоритваронных массива.

// all cases - O(NlogN)


import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "../../utils/CreateArrayFunc.js";

program.option('-tm, mergeSort <number>', 'run test for array length merge')
    .option('-am, --merge-array-type <type>', "type of array merge");
program.parse();

const options = program.opts();

if (options.insertTest) {
    const arrayLength = parseInt(options.mergeSort);
    let mergeArray;
    let mergeArrayType;
    switch (options.insertArrayType) {
        case 's' :
            mergeArrayType = 'sorted'
            mergeArray = createSortedArray(arrayLength);
            break;
        case 'ran' :
            mergeArrayType = 'random'
            mergeArray = createArray(arrayLength);
            break;
        case 'rev' :
            mergeArrayType = 'reversed'
            mergeArray = createSortedReverseArray(createSortedArray(arrayLength));
            break;
        default:
            mergeArray = createArray(arrayLength);
            break;
    }
    console.time(`${mergeArrayType} - insertSort`);
    mergeSort(mergeArray);
    console.timeEnd(`${mergeArrayType} - insertSort`);
}


function mergeHelper(firstArray, secondArray) {
    let resultArray = [];
    while (firstArray.length && secondArray.length) {
        if (firstArray[0] < secondArray[0]) {
            resultArray.push(firstArray.shift());
        } else {
            resultArray.push(secondArray.shift());
        }
    }
    // возвращаем деструктуризацией данные, если по какому-то массиву прошлись,
    // то тот, который остался просто копируется в результат
    return [...resultArray, ...firstArray, ...secondArray];
}

function mergeSort(array) {
    if (array.length <= 1) return array;

    let mid = Math.floor(array.length / 2);

// slice - делает копию массива от индкса до следующего индекса. Не меняет текущий массив.
    let leftArray = mergeSort(array.slice(0, mid));
    let rightArray = mergeSort(array.slice(mid));

// мержит два отсортированных массива - когда функция уйдёт в самую глубь рекурсии,
// начнёт мержить по одному элементу, потом по два итд. И будет выходить из рекурсии
    return mergeHelper(leftArray, rightArray);
}

console.log(mergeSort([5, 4, 6, 5, 3, 4, 3, 2, 1]));

export default mergeSort;
