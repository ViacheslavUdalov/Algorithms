import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "../../utils/CreateArrayFunc.js";

program.option('-tс, choiceTest <number>', 'run test for array length choice')
    .option('-aс, --choice-array-type <type>', "type of array");
program.parse();

const options = program.opts();

if (options.choiceTest) {
    const arrayLength = parseInt(options.choiceTest);
    let choiceArray;
    let choiceArrayType;
    switch (options.choiceArrayType) {
        case 's' :
            choiceArrayType = 'sorted'
            choiceArray = createSortedArray(arrayLength);
            break;
        case 'ran' :
            choiceArrayType = 'random'
            choiceArray = createArray(arrayLength);
            break;
        case 'rev' :
            choiceArrayType = 'reversed'
            choiceArray = createSortedReverseArray(createSortedArray(arrayLength));
            break;
        default:
            choiceArray = createArray(arrayLength);
            break;
    }
    console.time(`${choiceArrayType} - choiceSort`);
    choiceSort(choiceArray);
    console.timeEnd(`${choiceArrayType} - choiceSort`);
}
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
export default choiceSort;