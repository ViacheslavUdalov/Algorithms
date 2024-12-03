import {helperLog} from "../useTooling.js";

export async function createSingleSorting(sortType, arraySize, arrayType, time) {
    try {
        const getData = await fetch(`http://localhost:3000/results?sortType=${sortType}&arraySize=${arraySize}`);
        if (getData.ok) {

// проверка есть ли уже данные по типу и размеру массива, если есть, то выходим
            let data = await getData.json();
            if (data.length !== 0) {
                helperLog("уже есть данные")
                return "уже есть данные"
            }
        }
        helperLog(arrayType)
        const timesDd = {
            random: arrayType === "random" ? time : "0.00" , // Укажите время для случайного массива
            sorted: arrayType === "sorted" ? time : "0.00", // Укажите время для отсортированного массива
            reversed: arrayType === "reversed" ? time : "0.00" // Укажите время для перевёрнутого массива
        };

        helperLog("Данных нет - Записываем")
        const response = await fetch('http://localhost:3000/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sortType: sortType,
                arraySize: arraySize,
                times: timesDd, // объект с временами для random, sorted, reversed
                date: new Date().toString(),
            })
        })
        if (!response.ok) {
            return response.statusText
        }
        helperLog('Data successfully saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}
