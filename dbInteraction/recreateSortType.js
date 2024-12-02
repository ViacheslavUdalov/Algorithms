export async function recreateResultDB(sortType, arraySize, arrayType, time) {
    try {
        // получение данных по типу сортировки и размеру массива
        const getData = await fetch(`http://localhost:3000/results?sortType=${sortType}&arraySize=${arraySize}`);
        if (!getData.ok) {
            throw new Error("Нет данных, нельзя обновить данные, если их нет, вызовите метод create")
        }
        let resultItem = await getData.json();

        // по нулевому индексу, потому что в бд есть дупликат
        resultItem.times[arrayType] = time;

        // обновление по айди
        const response = await fetch(`http://localhost:3000/results/${resultItem.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                times: getData.times
            }), // объект с временами для random, sorted, reversed
            date: new Date().toString()
        });
        if (!response.ok) {
            return response.statusText
        }
        console.log('Data successfully saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}
