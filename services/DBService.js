import Algorithm from "../models/AlgorithmSchema.js";
import config from "../config.js";
import bubbleSort from "../sorts/bubbleSort.js";
import choiceSort from "../sorts/choiceSort.js";
import {insertSort} from "../sorts/insertSort.js";
import mergeSort from "../sorts/mergeSort.js";
import quickSort from "../sorts/quickSort.js";


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
        algoState.updateEmitter.emit('requestStart');
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
    async getOneAlgo(arraySize, sortType,) {
        const algorithm = await Algorithm.find({
            sortType,
            arraySize
        })
        return algorithm[0];
    }

   async saveAllToDb(algoState, token) {
        algoState.algosData.map(async item => {
            const {_id, ...itemForDb} = item;
            const algo = await new Algorithm(itemForDb);
            algo.save();
        });
        algoState.updateEmitter.emit('writeToDb');
    }  
    // async saveCheckedDB(jobService, algoState, dbService) {
    //     const result =  await jobService.executeFuncForAllAlgos(algoState, dbService);
    //    console.log(`result`, result);
    // }

}