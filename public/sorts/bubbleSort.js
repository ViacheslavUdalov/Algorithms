import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "../../utils/CreateArrayFunc.js";

//Сортировка называется устойчивой, если она не меняет порядок равных элементов.

program.option('-t, bubble <number>', 'run test for array length bubble')
        .option('-a, --array-type <type>', "type of array");
program.parse();

const options = program.opts();

if (options.test) {
    const arrayLength = parseInt(options.bubble);
    let bubbleArray;
    let arrayType;
    switch (options.arrayType) {
        case 's' :
            arrayType = 'sorted'
            bubbleArray = createSortedArray(arrayLength);
            break;
        case 'ran' :
            arrayType = 'random'
            bubbleArray = createArray(arrayLength);
            break;
        case 'rev' :
            arrayType = 'reversed'
            bubbleArray = createSortedReverseArray(createSortedArray(arrayLength));
            break;
        default:
            bubbleArray = createArray(arrayLength);
            break;
    }
    console.time(`${arrayType} - bubbleSort`);
    bubbleSort(bubbleArray);
    console.timeEnd(`${arrayType} - bubbleSort`);
}

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
export default bubbleSort;