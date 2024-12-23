import EventEmitter from "node:events";
import {helperLog} from "../utils/useTooling.js";

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

class AlgoResults {
    id;
    sortType;
    arraySize;
    times = {
        random: undefined,
        sorted: undefined,
        reversed: undefined
    };
    status;
    isValid;
}

export class AlgorithmState {
    config;
    db;
    algosData = [];
    updateEmitter = new EventEmitter();

    constructor(db, config, dbService) {
        this.db = db;
        this.config = config;
    }

    async init() {
        await this._syncAlgoDataWithDB();
    }

    getData() {
        console.log(this.algosData)
        return this.algosData;
    }

    async updateOneAlgo(arraySize, sortType, arrayType, result) {
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
        } else {
            oldAlgo.isValid = this._getIsAlgoValid(oldAlgo);
            this.algosData.push(oldAlgo);
        }
        this.updateEmitter.emit('oneUpdated', oldAlgo, arrayType);
    }

    updateAllAlgos(algos) {
        const algoStates = algos.map(algo => algo);
        this._populateAlgosValidity(algoStates);
        algoStates.push(...this._getMissingAlgos(algoStates));
        this._getExtraAlgos(algoStates);
        this.algosData = algoStates;
        this.updateEmitter.emit('allUpdated', this.algosData);
    }

    updateAlgos(algos) {
        algos.forEach(algo => this.updateOneAlgo(algo));
    }

    async _syncAlgoDataWithDB() {
        const algos = await this.db.find({});
        this.updateAllAlgos(algos);
    }

    _populateAlgosValidity(algos) {
        algos.forEach((algo, index) => {
            algos[index].isValid = this._getIsAlgoValid(algo);
        });
    }

    _getIsAlgoValid(algo) {
        return this.config.arrayTypes.includes(algo.arraySize) && this.config.sortTypes.includes(algo.sortType);
    }

    _getMissingAlgos(algos) {
        const missingAlgos = [];
        this.config.arrayTypes.forEach(arraySize => {
            this.config.sortTypes.forEach(sortType => {
                if (!algos.find(algo => algo.sortType === sortType && algo.arraySize === arraySize)) {
                    const newAlgo = Object.assign(new AlgoResults(), {
                        sortType: sortType,
                        arraySize: arraySize,
                        status: ALGO_STATUSES.MISSING,
                        isValid: true,
                    });
                    missingAlgos.push(newAlgo);
                }
            });
        });
        console.log(`missingAlgos`, missingAlgos)
        return missingAlgos;
    }

    _getExtraAlgos(algos) {
        const extraAlgos = [];
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
 