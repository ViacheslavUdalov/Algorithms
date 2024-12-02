import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "./CreateArrayFunc.js";
import {recreateResultDB} from "./dbInteraction/recreateSortType.js";
import {deleteFromDb} from "./dbInteraction/deleteFromDb.js";
import {createSingleSorting} from "./dbInteraction/createSingleSorting.js";


program.option('-t, run <number>', 'run test for array length')
    .option('-a, --array-type <type>', "type of array")
    .option('-bd, --bd-process <process>', "bd process")
    .option('-v, --console-writing <process>', "write to console");
program.parse();

const options = program.opts();
export async function toolings(funcForRes, sortType) {
if (options.run) {
    const arrayLength = parseInt(options.run);
    let arrayFunc;
    let arrayType;
    switch (options.arrayType) {
        case 's' :
            arrayType = 'sorted'
            arrayFunc = createSortedArray(arrayLength);
            break;
        case 'ran' :
            arrayType = 'random'
            arrayFunc = createArray(arrayLength);
            break;
        case 'rev' :
            arrayType = 'reversed'
            arrayFunc = createSortedReverseArray(createSortedArray(arrayLength));
            break;
        default:
            arrayFunc = createArray(arrayLength);
            arrayType = 'random'
            break;
    }

    // поменял console.time на перфоменс, по времени выдаёт тоже самое, погрешность ~0.05ms
    let startTime = performance.now();

    funcForRes(arrayFunc);

    let timeEnd = (performance.now() - startTime).toFixed(2);

    if (options.consoleWriting) {
        console.log(timeEnd);
    }

    switch (options.bdProcess) {
        case 'recreate' :
            await recreateResultDB(sortType, arrayLength, arrayType, timeEnd)
            break;
        case 'delete' :
            await deleteFromDb(sortType)
            break;
        case 'create' :
            await createSingleSorting(sortType, arrayLength, arrayType, timeEnd)
            break;
        default:
            helperLog("default bd")
            break;
    }
}
}

export function helperLog(message) {
    if (options.consoleWriting) {
        console.log(message)
    }
}