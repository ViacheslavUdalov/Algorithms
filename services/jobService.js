import bubbleSort from "../sorts/bubbleSort.js";
import choiceSort from "../sorts/choiceSort.js";
import {insertSort} from "../sorts/insertSort.js";
import mergeSort from "../sorts/mergeSort.js";
import quickSort from "../sorts/quickSort.js";
import {ALGO_STATUSES} from "../controllers/AlgorithmState.js";
import Algorithm from "../models/AlgorithmSchema.js";
import config from "../config.js";
import {runChild} from "../chlid.js";

const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;
const ARRAY_OF_SORT_FUNCTIONS = [bubbleSort, choiceSort, 
    insertSort, mergeSort, quickSort];

export class JobService {
    constructor(config) {
        this.config = config;
    }


    async executeFuncForString(algoState, sortType, arraySize) { 
        const random = await this.executeFuncForCell(algoState, arraySize, sortType, 'random');
        const sorted = await this.executeFuncForCell(algoState, arraySize, sortType, 'sorted');
        const reversed = await this.executeFuncForCell(algoState, arraySize, sortType, 'reversed');
        const algorithm = {
            arraySize,
            sortType,
            times: {
                random: random,
                sorted: sorted,
                reversed: reversed
            },
            status: ALGO_STATUSES.VALID,
            isValid: true
        }
        return algorithm;
    }

    async executeFuncForCell(algoState, arraySize, sortType, arrayType) {
        const result = await runChild(arraySize, sortType, arrayType);
        await algoState.updateOneAlgo(arraySize, sortType, arrayType, result);
        return result;
    }

    async executeFuncForAllAlgos(algoState) {
        let res = [];
        for (let sortFunc of ARRAY_OF_SORT_FUNCTIONS) {
            for (let arraySize of ARRAY_SIZES) {
                let interRes = await this.executeFuncForString(algoState, sortFunc.name, arraySize);
                res.push(interRes);
            }
        }
        // console.log(res)
        algoState.updateAllAlgos(res);
        // console.log(`execute`, res);
        return res;
    }

    async checkBdForData() {

        let dataForCycle = await Algorithm.find();
        let missingData = [];
        let duplicates = [];

        SORT_TYPES.forEach(sortType => {
            ARRAY_SIZES.forEach(arraySize => {
                let exist = dataForCycle.some(item =>
                    item.sortType.toUpperCase() === sortType.toUpperCase() && item.arraySize === arraySize
                );
                if (!exist) {
                    missingData.push({sortType, arraySize});
                }
            });
        });

        const duplicatedDataMap = new Map();

        dataForCycle.forEach(item => {
            const keyForMap = `${item.sortType.toUpperCase()}_${item.arraySize}`;
            duplicatedDataMap.set(keyForMap, (duplicatedDataMap.get(keyForMap) || 0) + 1);
        })

        for (let [key, count] of duplicatedDataMap.entries()) {
            if (count > 1) {
                const [sortType, arraySize] = key.split('_');
                duplicates.push({sortType, arraySize, count});
            }
        }

        if (missingData.length > 0 || duplicates.length > 0) {
            return {
                missingData,
                duplicates
            }
        } else {
            let result = new Map();
            config.sortTypes.forEach(sortType => {
                result.set(sortType, [...config.arrayTypes]);
            });
            return `База данных заполнена полностью — все сортировки и размеры массивов: ${JSON.stringify(
                Object.fromEntries(result))}`;
        }
    }


}