import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "../../utils/CreateArrayFunc.js";

program.option('-ti, insertTest <number>', 'run test for array length insert')
    .option('-ai, --insert-array-type <type>', "type of array insert");
program.parse();

const options = program.opts();

if (options.insertTest) {
    const arrayLength = parseInt(options.insertTest);
    let insertArray;
    let insertArrayType;
    switch (options.insertArrayType) {
        case 's' :
            insertArrayType = 'sorted'
            insertArray = createSortedArray(arrayLength);
            break;
        case 'ran' :
            insertArrayType = 'random'
            insertArray = createArray(arrayLength);
            break;
        case 'rev' :
            insertArrayType = 'reversed'
            insertArray = createSortedReverseArray(createSortedArray(arrayLength));
            break;
        default:
            insertArray = createArray(arrayLength);
            break;
    }
    console.time(`${insertArrayType} - insertSort`);
    insertArray(insertArray);
    console.timeEnd(`${insertArrayType} - insertSort`);
}

export function insertSort(array) {
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
