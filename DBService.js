import bubbleSort from "./sorts/bubbleSort.js";
import choiceSort from "./sorts/choiceSort.js";
import {insertSort} from "./sorts/insertSort.js";
import mergeSort from "./sorts/mergeSort.js";
import quickSort from "./sorts/quickSort.js";
import config from "./config.js";
import Algorithm from './models/SortResultingSchema.js';
import {runChild} from './chlid.js'
import eventEmmiter from "./eventEmmiter.js";
import {ALGO_STATUSES} from "./controllers/AlgorithmState.js";
import {helperLog} from "./utils/useTooling.js";


const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;
const ARRAY_OF_SORT_FUNCTIONS = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

export class DBService {
    constructor(config) {
        this.config = config;
    }

    async deleteDb() {
        const result = await Algorithm.deleteMany({});
        return result.detetedCount;
    }

    async saveDataForCell(algoState, arraySize, sortType, arrayType, result) {
        eventEmmiter.emit('requestStart');
        const algorithm = await Algorithm.findOneAndUpdate({
                sortType,
                arraySize
            },
            {
                // для обновления
                $set: {
                    [`times.${arrayType}`]: result,
                }
            },
            {new: true, upsert: true}
        )
        algoState.updateOneAlgo(algorithm, arrayType);
    }

   async saveAllToDb(jobService, algoState, dbService) {
        const result =  await jobService.executeFuncForAllAlgos(algoState, dbService);
    }  
    // async saveCheckedDB(jobService, algoState, dbService) {
    //     const result =  await jobService.executeFuncForAllAlgos(algoState, dbService);
    //    console.log(`result`, result);
    // }

}