import { createArray } from '../utils/array.js';
import { program } from 'commander';

program.option('-t, --test <number>', 'run test for array lentgh');
program.parse();

const options = program.opts();

if (options.test) {
    const arrayLength = parseInt(options.test);
    const testArr = createArray(arrayLength);
    console.time('bubbleSort');
    bubbleSort(testArr);
    console.timeEnd('bubbleSort');
}

//Сортировка называется устойчивой, если она не меняет порядок равных элементов.

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
