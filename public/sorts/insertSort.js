import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "../../utils/CreateArrayFunc.js";

program.option('-t, insertTest <number>', 'run test for array length insert')
        .option('-a, --insert-array-type <type>', "type of array insert");
program.parse();

const options = program.opts();

if (options.insertTest) {
    const arrayLength = parseInt(options.insertTest);
    let insertArray;
    let insertArrayType;
    console.log(options)
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
        // case 'ran' :
        default :
            insertArray = createArray(arrayLength);
            insertArrayType = 'default'
            break;
    }
    console.time(`${insertArrayType} - insertSort`);
    insertSort(insertArray);
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
