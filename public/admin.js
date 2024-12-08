import {helperLog} from "../utils/useTooling.js";
import {createArray, createSortedArray, createSortedReverseArray} from "../utils/CreateArrayFunc.js";
import choiceSort from "../sorts/choiceSort.js";
import bubbleSort from "../sorts/bubbleSort.js";
import {insertSort} from "../sorts/insertSort.js";
import mergeSort from "../sorts/mergeSort.js";
import quickSort from "../sorts/quickSort.js";
import e from "express";


export async function writeToDb(sortType) {
    try {
        helperLog(sortType);
        let arrayOfFuncs = [bubbleSort, choiceSort, insertSort, mergeSort, quickSort];

        if (!sortType) {
            console.log('нет типа сортировки')
            for (let func of arrayOfFuncs) {
                await commonFunction([1000, 5000, 10000], func, func.name);

            }
        } else {
            const selectFunc = arrayOfFuncs.find(func => func.name === sortType);
            helperLog(selectFunc.name);
            if (selectFunc) {
                await commonFunction([1000, 5000, 10000], selectFunc, selectFunc.name);
            } else {
                helperLog("не найдена соптировка");
                return 'не найдена сортировка';
            }
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

export async function recreateDb(sortType = null) {
    await deleteDb(sortType);
    await writeToDb(sortType);
}

export async function deleteDb(sortType) {
    try {
        // получение данных по типу сортировки
        const getData = await fetch(`http://localhost:3000/result`);

        if (!getData.ok) {
            return 'данных нет - работаем'
        }

        let data = await getData.json();

        if (data.length === 0) {
            helperLog("Нет данных для удаления");
        }
        if (sortType) {
            console.log(data);
            console.log(sortType)
            data = data.filter(data => data.sortType === sortType)
            console.log('DATA AFTER')
            console.log(data)
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

export async function commonFunction(arrayOfNumbers, funcForSort, sortType) {
    for (const number of arrayOfNumbers) {
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
        console.log(data);
        const response = await fetch('http://localhost:3000/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            return response.statusText
        }
    }

}
