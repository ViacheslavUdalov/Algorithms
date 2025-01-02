
import {DbServiceInterface} from "../interfaces/DbServiceInterface.js";

import {AlgorithmModel} from "../serverModels/Algorithm.js";
import {AlgoStateInterface} from "../interfaces/AlgoState.js";
import config from "../../config.js";
import Algorithm from "../schema/AlgorithmSchema.js";

const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;

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