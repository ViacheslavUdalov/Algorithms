import {helperLog} from "./utils/useTooling.js";
import bubbleSort from "./sorts/bubbleSort.js";
import choiceSort from "./sorts/choiceSort.js";
import {insertSort} from "./sorts/insertSort.js";
import mergeSort from "./sorts/mergeSort.js";
import quickSort from "./sorts/quickSort.js";
import {promises as fs} from 'fs';
import {dbFilePath} from "./server.js";
import {v4 as uuidv4} from 'uuid';
import config from "./config.js";
import {runChild} from "./chlid.js";

const ARRAY_SIZES = config.arrayTypes;
const SORT_TYPES = config.sortTypes;
const ARRAY_OF_SORT_FUNCTIONS = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

async function executeAndWriteToDb(sortType, arraySize) {
    let sortFunctions = sortType ? ARRAY_OF_SORT_FUNCTIONS.filter(func => func.name.toUpperCase() === sortType.toUpperCase()) : ARRAY_OF_SORT_FUNCTIONS;
    let arraySizes = arraySize ? [arraySize] : ARRAY_SIZES;
    let result = [];
    for (let sortFunc of sortFunctions) {
        for (let arraySize of arraySizes) {
            let data = await executeFunc(arraySize, sortFunc, sortFunc.name);
            result.push(data);
        }
    }
    console.log(result)
    let localData = await concatenate(result);
    await writeDataToDb(localData);
}


export async function recreateDb(sortType = null, arraySize = null) {
    await deleteDb(sortType, arraySize);
    await executeAndWriteToDb(sortType, arraySize);
}

export async function getDataFromDb() {
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }

}

async function concatenate(newData) {
    let currdata = await getDataFromDb();
    let currJsonData = currdata ? JSON.parse(currdata) : [];
    let date = [...currJsonData, ...newData];
    return date;
}

async function writeDataToDb(data) {
    try {
        await fs.writeFile(dbFilePath,
            JSON.stringify(data, null, 2), 'utf8');
        return data;
    } catch (e) {
        console.log(e)
    }
}


async function deleteDb(sortType, arraySize) {
    try {
        let data = await getDataFromDb();
        if (!data) {
            helperLog("Нет данных для удаления");
            return;
        }
        let updatedDate = JSON.parse(data);
        if (sortType !== null && arraySize === null) {
            updatedDate = updatedDate.filter(item => item.sortType.toUpperCase() !== sortType.toUpperCase())
        } else if (arraySize !== null) {
            updatedDate = updatedDate.filter(item => !(item.arraySize === arraySize
                && item.sortType.toUpperCase() === sortType.toUpperCase()));
        } else if (sortType === null && arraySize === null) {
            await writeDataToDb([]);
            return;
        }
        await writeDataToDb(updatedDate);

    } catch (error) {
        console.error('Error deleting data:', error);
    }
}


async function executeFunc(arraySize, funcForSort, sortType) {
    return {
        id: uuidv4(),
        sortType,
        arraySize,
        times: {
            random: await runChild(arraySize, sortType, 'ran'),
            sorted: await runChild(arraySize, sortType, 's'),
            reversed: await runChild(arraySize, sortType, 'rev'),
        }
    }
}

export async function checkBdForData() {
    let data = await getDataFromDb();
    let missingData = [];
    let dataForCycle = JSON.parse(data);
    SORT_TYPES.forEach(sort => {
        ARRAY_SIZES.forEach(array => {
            let exist = dataForCycle.some(item =>
                item.sortType.toUpperCase() === sort.toUpperCase() && item.arraySize === array
            );
            if (!exist) {
                missingData.push({sort, array});
            }
        });
    });
    if (missingData.length > 0) {
        return missingData
    } else {
        let result = new Map();
        config.sortTypes.forEach(sortType => {
            result.set(sortType, [...config.arrayTypes]);
        });
        return `База данных заполнена полностью — все сортировки и размеры массивов: ${JSON.stringify(
            Object.fromEntries(result))}`;
    }
}


