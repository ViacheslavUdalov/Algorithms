import EventEmitter from "node:events";
import {Types} from "mongoose";
import {AlgorithmModel, ArrayType} from "../serverModels/Algorithm.js";
import {AlgoStateInterface} from "../interfaces/AlgoState.js";
import {DbServiceInterface} from "../interfaces/DbServiceInterface.js";

export const ALGO_STATUSES = {
    VALID: 'VALID',
    MISSING: 'MISSING',
    CALCULATING: 'CALCULATING',
    INVALID: 'INVALID',
};

export const ALGO_MESSAGES = {
    oneUpdated: 'oneUpdated',
    allUpdated: 'allUpdated',
    extra: 'extra'
};

class AlgoResults implements AlgorithmModel{
    _id!: Types.ObjectId;
    sortType!: string;
    arraySize!: number;
    times = {
        random: undefined,
        sorted: undefined,
        reversed: undefined
    };
    status!: string;
    isValid!: boolean;
}

export class AlgorithmState implements AlgoStateInterface{
    config;
    db;
    algosData: AlgorithmModel[] = [];
    updateEmitter = new EventEmitter();

    constructor(db: DbServiceInterface, config: any) {
        this.db = db;
        this.config = config;
    }

    async init() {
        await this._syncAlgoDataWithDB();
    }

    getData() {
        return this.algosData;
    }

    async updateOneAlgo(arraySize: number, sortType: string, arrayType: ArrayType, result: string) {
        console.log('updateOneAlgo')

        console.log(result)
        const oldAlgo = this.algosData.find(nextAlgo => {
            return nextAlgo.arraySize === arraySize && nextAlgo.sortType === sortType;
        });
        if (oldAlgo) {
            console.log(`oldAlgo`, oldAlgo);
            oldAlgo.times[arrayType] = result;
            oldAlgo.isValid = this._getIsAlgoValid(oldAlgo);
            console.log(`oldAlgo`, oldAlgo);
            oldAlgo.isValid = this._getIsAlgoValid(oldAlgo);
        } else {
           return false;
            // this.algosData.push(oldAlgo);
        }
        this.updateEmitter.emit('oneUpdated', oldAlgo, arrayType);
    }

    updateAllAlgos(algos : AlgorithmModel[]) {
        const algoStates = algos.map(algo => algo);
        this._populateAlgosValidity(algoStates);
        algoStates.push(...this._getMissingAlgos(algoStates));
        this._getExtraAlgos(algoStates);
        this.algosData = algoStates;
        this.updateEmitter.emit('allUpdated', 'Мы это сделали босс!');
    }
    
    async _syncAlgoDataWithDB() {
        const algos = await this.db.find();
        this.updateAllAlgos(algos);
    }

    _populateAlgosValidity(algos : AlgorithmModel[]) {
        algos.forEach((algo, index) => {
            algos[index].isValid = this._getIsAlgoValid(algo);
        });
    }

    _getIsAlgoValid(algo : AlgorithmModel) {
        return this.config.arrayTypes.includes(algo.arraySize) && this.config.sortTypes.includes(algo.sortType);
    }

    _getMissingAlgos(algos : AlgorithmModel[]) {
        const missingAlgos : AlgorithmModel[] = [];
        this.config.arrayTypes.forEach((arraySize: number) => {
            this.config.sortTypes.forEach((sortType: string) => {
                if (!algos.find(algo => algo.sortType === sortType && algo.arraySize === arraySize)) {
                    const newAlgo = Object.assign(new AlgoResults(), {
                        sortType: sortType,
                        arraySize: arraySize,
                        times: {
                            random: null,
                            sorted: null,
                            reversed: null,
                        },
                        status: ALGO_STATUSES.MISSING,
                        isValid: true,
                        createAt: null
                    });
                    missingAlgos.push(newAlgo);
                }
            });
        });
        console.log(`missingAlgos`, missingAlgos)
        return missingAlgos;
    }
 
    _getExtraAlgos(algos : AlgorithmModel[]) {
        const extraAlgos : AlgorithmModel[] = [];
        algos.forEach(algo => {
                const isExtra = !this.config.arrayTypes.includes(algo.arraySize) ||
                    !this.config.sortTypes.includes(algo.sortType);
                if (isExtra) {
                    extraAlgos.push(algo);
                }
            }
        )
        console.log(`extra`, extraAlgos)
        this.updateEmitter.emit(ALGO_MESSAGES.extra, extraAlgos);
    }
} 
 