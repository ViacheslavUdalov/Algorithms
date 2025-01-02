import bubbleSort from "../sorts/bubbleSort.js";
import choiceSort from "../sorts/choiceSort.js";
import {insertSort} from "../sorts/insertSort.js";
import mergeSort from "../sorts/mergeSort.js";
import quickSort from "../sorts/quickSort.js";
import {DbServiceInterface} from "../interfaces/DbServiceInterface.js";
import Algorithm from "../serverModels/schema/AlgorithmSchema.js";
import config from "../config.js";
import {AlgorithmModel} from "../serverModels/Algorithm.js";
import {AlgoStateInterface} from "../interfaces/AlgoState.js";

const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;
const ARRAY_OF_SORT_FUNCTIONS = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

export class DBService implements DbServiceInterface{
    config: any;
    constructor(config: any) {
        this.config = config;
    }

    async deleteDb() {
        const result = await Algorithm.deleteMany({});
        return result.deletedCount;
    }

    async find(): Promise<AlgorithmModel[]> {
        const result = await Algorithm.find({}).lean() as AlgorithmModel[];
        return result;
    }

    async saveAllToDb(algoState: AlgoStateInterface) {
        algoState.algosData.map(async (item : any)=> {
            const {_id, ...itemForDb} = item;
            const algo = await new Algorithm(itemForDb);
            algo.save();
        });
        algoState.updateEmitter.emit('writeToDb');
    }  
  }