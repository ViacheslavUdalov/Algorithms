import bubbleSort from "./sorts/bubbleSort.js";
import choiceSort from "./sorts/choiceSort.js";
import {insertSort} from "./sorts/insertSort.js";
import mergeSort from "./sorts/mergeSort.js";
import quickSort from "./sorts/quickSort.js";
import config from "./config.js";
import Algorithm from './models/SortResultingSchema.js';
import {runChild} from './chlid.js'

const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;
const ARRAY_OF_SORT_FUNCTIONS = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

async function executeAndWriteToDb(sortType, arraySize) {
    let sortFunctions = sortType ? ARRAY_OF_SORT_FUNCTIONS.filter(func => func.name.toUpperCase() === sortType.toUpperCase()) : ARRAY_OF_SORT_FUNCTIONS;
    let arraySizes = arraySize ? [arraySize] : ARRAY_SIZES;
    let res = [];
    for (let sortFunc of sortFunctions) {
        for (let arraySize of arraySizes) {
            let interRes = await executeFunc(arraySize, sortFunc, sortFunc.name);
            res.push(interRes);
        }
    }
    // console.log(`execute`, res);
    return res;
}

export async function getDataFromDb() {
    let data = await Algorithm.find();
    return data;
}


export async function recreateDb(sortType = null, arraySize = null, arrayType = null) {
    if (arrayType) {
       return  await executeFuncForCell(arraySize, sortType, arrayType)
    } else {
        await deleteDb(sortType, arraySize);
       return await executeAndWriteToDb(sortType, arraySize);
    }

}

async function deleteDb(sortType, arraySize) {
    const query = {};
    if (sortType !== null) query.sortType = sortType;
    if (arraySize !== null) query.arraySize = arraySize;
    console.log(sortType, arraySize)
    const result = await Algorithm.deleteMany(query);

    console.log(`result.deletedCount`, result.deletedCount);
    return result.detetedCount;
}


async function executeFunc(arraySize, funcForSort, sortType) {
    const algorithm = new Algorithm({
        sortType,
        arraySize,
        times: {
            random: await runChild(arraySize, sortType, 'random'),
            sorted: await runChild(arraySize, sortType, 'sorted'),
            reversed: await runChild(arraySize, sortType, 'reversed'),
        }
    })
    await algorithm.save();
    return algorithm;
}

async function executeFuncForCell(arraySize, sortType, arrayType) {
    let result = await runChild(arraySize, sortType, arrayType)
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
    console.log(`algorithm`, algorithm)
    // console.log('result', result)
    return algorithm;
}

export async function checkBdForData() {

    let data = await Algorithm.find();
    let missingData = [];
    let duplicates = [];
    let dataForCycle = data;

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


