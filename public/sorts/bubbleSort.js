import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "../../utils/CreateArrayFunc.js";
import {recreateResultDB} from "../../dbInteraction/recreateSortType.js";

//Сортировка называется устойчивой, если она не меняет порядок равных элементов.

program.option('-t, bubble <number>', 'run test for array length bubble')
    .option('-a, --array-type <type>', "type of array")
    .option('-bd, --bd-process <process>', "bd process");
program.parse();

const options = program.opts();

if (options.bubble) {
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

    // поменял console.time на перфоменс, по времени выдаёт тоже самое, погрешность ~0.05ms
    let startTime = performance.now();
    // console.time(`${arrayType} - bubbleSort`);

    bubbleSort(bubbleArray);

    // let timeConsole = console.timeEnd(`${arrayType} - bubbleSort`);
    let timeEnd = (performance.now() - startTime).toFixed(2);
    console.log(timeEnd);
    // console.log(timeConsole)

    switch (options.bdProcess) {
        case 'recreate' :
            await recreateResultDB('bubble', parseInt(options.bubble), arrayType, timeEnd)
            break;
        default:
            console.log('default Bd');
            await recreateResultDB('bubble', parseInt(options.bubble), arrayType, timeEnd)
            break;
    }
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