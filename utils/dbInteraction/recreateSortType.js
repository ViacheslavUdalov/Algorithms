import {helperLog} from "../toolings.js";

export async function recreateResultDB(sortType, arraySize, arrayType, time) {
    try {
        // получение данных по типу сортировки и размеру массива
        const getData = await fetch(`http://localhost:3000/results?sortType=${sortType}&arraySize=${arraySize}`);
        if (!getData.ok) {
            throw new Error("Нет данных, нельзя обновить данные, если их нет, вызовите метод create")
        }
        let resultItem = await getData.json();

        // по нулевому индексу, потому что в бд есть дупликат
        helperLog(resultItem)
        helperLog(resultItem[0].times)
        resultItem[0].times[arrayType] = time;

        // обновление по айди
        const response = await fetch(`http://localhost:3000/results/${resultItem[0].id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                times: resultItem[0].times,
            }), // объект с временами для random, sorted, reversed
            date: new Date().toString(),
        });
        if (!response.ok) {
            return response.statusText
        }
        helperLog('Data successfully saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}
