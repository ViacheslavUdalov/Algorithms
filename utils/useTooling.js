import {program} from "commander";
import {createArray, createSortedArray, createSortedReverseArray} from "./CreateArrayFunc.js";


program.option('-t, run <number>', 'run test for array length')
    .option('-a, --array-type <type>', "type of array")
    .option('-bd, --bd-process <process>', "bd process")
    .option('-v, --console-writing', "write to console")
    .option('-admin, --admin <type>', 'using admin process')
    .option('-sortType, --sort-type <type>', 'func sort Type')

program.parse();

const options = program.opts();

export async function useTooling(funcForRes, sortType) {
    if (options.run) {
        const arrayLength = parseInt(options.run);
        let arrayFunc;
        let arrayType;
        switch (options.arrayType) {
            case 's':
                arrayType = 'sorted'
                arrayFunc = createSortedArray(arrayLength);
                break;
            case 'rev':
                arrayType = 'reversed'
                arrayFunc = createSortedReverseArray(createSortedArray(arrayLength));
                break;
            case 'ran':
            default:
                arrayFunc = createArray(arrayLength);
                arrayType = 'random'
        }

        // поменял console.time на перфоменс, по времени выдаёт тоже самое, погрешность ~0.05ms
        let startTime = performance.now();

        funcForRes(arrayFunc);

        let timeEnd = (performance.now() - startTime).toFixed(2);
        // console.log('TIMEEND')
        // console.log(timeEnd)
        // if (options.consoleWriting) {
            console.log(timeEnd);
        // }

        // switch (options.bdProcess) {
        //     case 'recreate' :
        //         await recreateResultDB(sortType, arrayLength, arrayType, timeEnd)
        //         break;
        //     case 'delete' :
        //         await deleteFromDb(sortType)
        //         break;
        //     case 'create' :
        //         await createSingleSorting(sortType, arrayLength, arrayType, timeEnd)
        //         break;
        //     default:
        //         helperLog("default bd")
        //         break;
        // }
        // return timeEnd;
    }

}


export function helperLog(message) {
    if (options.consoleWriting) {
        console.log(message)
    }
}