import {program} from "commander";
import {createArray} from "../../utils/CreateArrayFunc.js";

//Сортировка называется устойчивой, если она не меняет порядок равных элементов.

program.option('-t, test <number>', 'run test for array length');
program.parse();

const options = program.opts();

if (options.test) {
    const arrayLength = parseInt(options.t);
    const testArray = createArray(arrayLength);
    console.time('bubbleSort');
    bubbleSort(testArray);
    console.timeEnd('bubbleSort');
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