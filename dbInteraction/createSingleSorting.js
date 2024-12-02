export async function createSingleSorting(sortType, arraySize, time) {
    try {
        const getData = await fetch(`http://localhost:3000/results?sortType=${sortType}&arraySize=${arraySize}`);
        if (getData.ok) {

// проверка есть ли уже данные по типу и размеру массива, если есть, то выходим
            let data = await getData.json();
            if (data.length !== 0) {
                console.log("уже есть данные")
                return "уже есть данные"
            }
        }
        console.log("Данных нет - Записываем")
        const response = await fetch('http://localhost:3000/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sortType: sortType,
                arraySize: arraySize,
                times: {
                    sortType: time
                }, // объект с временами для random, sorted, reversed
                date: new Date().toString()
            })
        })
        if (!response.ok) {
            return response.statusText
        }
        console.log('Data successfully saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}
