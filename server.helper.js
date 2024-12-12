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
            let localData = await concatenate(result)
            await writeDataToDb(localData);

        } else {
            const selectFunc = arrayOfFuncs.find(func => func.name.toUpperCase() === sortType.toUpperCase());
            helperLog(selectFunc.name);
            console.log('Есть тип сортировки')
            if (selectFunc) {
                if (arraySize) {
                    console.log('попали в массив')
                    let interRes = await commonFunctionExpress(arraySize, selectFunc, selectFunc.name);
                    result.push(interRes);
                } else {
                    for (let array of [1000, 5000, 10000]) {
                        let interRes = await commonFunctionExpress(array, selectFunc, selectFunc.name);
                        console.log(interRes)
                        result.push(interRes);
                    }
                }
            } else {
                helperLog("не найдена сортировка");
                return 'не найдена сортировка';
            }
            let localData = await concatenate(result)
            await writeDataToDb(localData);
        }

    } catch (error) {
        console.error('Error saving data:', error);
    }
}


export async function recreateDb(sortType = null, arraySize = null) {
    await deleteDb(sortType, arraySize);
    await writeToDbe(sortType, arraySize);
}

export async function getDataFromDb() {
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        return data
    } catch (e) {
        console.log(e)
        return null;
    }

}

async function concatenate(newData) {
    let currdata = await getDataFromDb();
    let currJsonData = currdata ? JSON.parse(currdata) : []
    let date = [...currJsonData, ...newData]
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
        }
       else if (arraySize !== null) {
            updatedDate = updatedDate.filter(item => !(item.arrayType === arraySize
                && item.sortType.toUpperCase() === sortType.toUpperCase()));
        }
        else if (sortType === null && arraySize === null) {
            await writeDataToDb([]);
            return;
        }
        await writeDataToDb(updatedDate);

    } catch (error) {
        console.error('Error deleting data:', error);
    }
}


async function commonFunctionExpress(number, funcForSort, sortType) {

    let timeBTakenOne = await runChild(number, sortType, 'ran');

    let timeSortedTakenOne = await runChild(number, sortType, 's');

    let reverseBROne = await runChild(number, sortType, 'rev');

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
    return data;
}

export async function checkBdForData() {
   let data = await getDataFromDb();
   let missingData = [];
  let dataForCycle = JSON.parse(data);
    config.sortTypes.forEach(sort => {
        config.arrayTypes.forEach(array => {
            let exist = dataForCycle.some(item =>
                item.sortType.toUpperCase() === sort.toUpperCase() && item.arrayType === array
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


