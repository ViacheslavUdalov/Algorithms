import {helperLog} from "./utils/useTooling.js";
import bubbleSort from "./sorts/bubbleSort.js";
import choiceSort from "./sorts/choiceSort.js";
import {insertSort} from "./sorts/insertSort.js";
import mergeSort from "./sorts/mergeSort.js";
import quickSort from "./sorts/quickSort.js";
import {createArray, createSortedArray, createSortedReverseArray} from "./utils/CreateArrayFunc.js";
import {promises as fs} from 'fs';
import {dbFilePath} from "./server.js";
import {v4 as uuidv4} from 'uuid';
import {json} from "express";


export async function writeToDbe(sortType, arraySize) {
    try {
        let result = [];
        helperLog(sortType);
        let arrayOfFuncs = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

        if (!sortType) {
            console.log('нет типа сортировки')
            for (let func of arrayOfFuncs) {
                for (let array of [1000, 5000, 10000]) {
                    let interRes = await commonFunctionExpress(array, func, func.name);
                    result.push(interRes);
                }

            }
            await writeDataToDb(result);
        } else {
            const selectFunc = arrayOfFuncs.find(func => func.name.toUpperCase() === sortType.toUpperCase());
            helperLog(selectFunc.name);
            console.log('Есть тип сортировки')
            if (selectFunc) {
                if (arraySize) {
                    let interRes = await commonFunctionExpress(arraySize, selectFunc, selectFunc.name);
                    result.push(interRes);
                } else {
                    for (let array of [1000, 5000, 10000]) {
                        console.log(array)
                        let interRes = await commonFunctionExpress(array, selectFunc, selectFunc.name);
                        result.push(interRes);
                    }
                }
            } else {
                helperLog("не найдена сортировка");
                return 'не найдена сортировка';
            }
            await writeDataToDb(result);
        }

    } catch (error) {
        console.error('Error saving data:', error);
    }
}


export async function recreateDb(sortType = null, arraySize = null) {
    debugger
    await deleteDb(sortType, arraySize);
    await writeToDbe(sortType, arraySize);
}

async function getDataFromDb() {
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        return data
    } catch (e) {
        console.log(e)
        return null;
    }

}

async function writeDataToDb(data) {
    try {
        console.log('1!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log(data)
        let currdata = await getDataFromDb();
let currJsonData = JSON.parse(currdata)
        console.log('currDATA')
        console.log(JSON.parse(currdata))

        let newData = [...currJsonData, ...data]
        console.log(newData)
        await fs.writeFile(dbFilePath, JSON.stringify(newData, null, 2), 'utf8');
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
        if (sortType !== null) {
            data = data.filter(item => item.sortType.toUpperCase() !== sortType.toUpperCase())
        }
        if (arraySize !== null) {
            data = data.filter(item => item.arraySize !== arraySize && item.sortType.toUpperCase() !== sortType.toUpperCase())
        }

        await writeDataToDb(data);
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}


async function commonFunctionExpress(number, funcForSort, sortType) {
    let randomArray = createArray(number);
    let sortedArray = createSortedArray(number);
    let reverseSortedArray = createSortedReverseArray(createSortedArray(number));

    async function allSorting(sortFunc, array) {
        let startOne = performance.now();
        sortFunc([...array]);
        return (performance.now() - startOne).toFixed(2)
    }

    let timeBTakenOne = await allSorting(funcForSort, randomArray)

    let timeSortedTakenOne = await allSorting(funcForSort, sortedArray);

    let reverseBROne = await allSorting(funcForSort, reverseSortedArray);

    let data = {
        id: uuidv4(),
        sortType: sortType,
        arrayType: number,
        times: {
            random: timeBTakenOne,
            sorted: timeSortedTakenOne,
            reversed: reverseBROne
        }
    }
    console.log(data)
    return data;
}



