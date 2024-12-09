import {helperLog} from "./utils/useTooling.js";
import bubbleSort from "./sorts/bubbleSort.js";
import choiceSort from "./sorts/choiceSort.js";
import {insertSort} from "./sorts/insertSort.js";
import mergeSort from "./sorts/mergeSort.js";
import quickSort from "./sorts/quickSort.js";
import {createArray, createSortedArray, createSortedReverseArray} from "./utils/CreateArrayFunc.js";
import * as fs from "fs";
import {dbFilePath} from "./server.js";



export async function writeToDbe(sortType, arraySize) {
    try {
        helperLog(sortType);
        let arrayOfFuncs = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

        if (!sortType) {
            console.log('нет типа сортировки')
            for (let func of arrayOfFuncs) {
                for (let array of [1000, 5000, 10000]) {
                    await commonFunctionExpress(array, func, func.name);
                }

            }
        } else {
            const selectFunc = arrayOfFuncs.find(func => func.name === sortType);
            helperLog(selectFunc.name);
            console.log('Есть тип сортировки')
            if (selectFunc) {
                if (arraySize) {
                    await commonFunctionExpress(arraySize, selectFunc, selectFunc.name);
                } else {
                    for (let array of [1000, 5000, 10000]) {
                        await commonFunctionExpress(array, selectFunc, selectFunc.name);
                    }
                }
            } else {
                helperLog("не найдена сортировка");
                return 'не найдена сортировка';
            }
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
}


export async function recreateDb(sortType = null, arraySize = null) {
    await deleteDb(sortType, arraySize);
    await writeToDbe(sortType, arraySize);
}

async function getDataFromDb() {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return err
        } else {
            return data
        }
    });
}

async function writeDataToDb(data) {
    fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            return err
        } else {
            return data
        }
    });
}


async function deleteDb(sortType, arraySize) {
    try {
        let data = await getDataFromDb();
        console.log(data);

        if (data.length === 0) {
            helperLog("Нет данных для удаления");
        }
        if (sortType) {
            data = data.filter(data => data.sortType === sortType)
        }
        if (arraySize) {
            data = data.filter(data => data.arraySize === arraySize)
        }
        for (const elem of data) {

            // обноление по типу сотрировки
            const response = await fetch(`http://localhost:3000/result/${elem.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                return response.statusText
            }
            helperLog('Data successfully delete');
        }

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
        sortType: sortType,
        arrayType: number,
        times: {
            random: timeBTakenOne,
            sorted: timeSortedTakenOne,
            reversed: reverseBROne
        }
    }
    console.log(data)
    await writeDataToDb(data);
    return data;
}



