export async function recreateResultDB(sortType, arraySize, arrayType, time) {
    try {
        // получение данных по типу сортировки и размеру массива
        let getData = await fetch(`http://localhost:3000/results?sortType=${sortType}&arraySize=${arraySize}`);
        if (!getData.ok) {
            throw new Error("Нет данных")
        }
        let dataForMap = await getData.json();

        // по нулевому индексу, потому что в бд есть дупликат
        console.log(dataForMap[0])
        dataForMap[0].times[arrayType] = time;


        console.log("new getData")
        console.log(dataForMap);

        // обноление по айди
        let response = await fetch(`http://localhost:3000/results/${dataForMap[0].id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                times: getData.times
            }), // объект с временами для random, sorted, reversed
            date: new Date().toISOString()
        });
        if (!response.ok) {
            return response.statusText
        }
        console.log('Data successfully saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}
