export async function saveResultToDB(sortType, arraySize, times) {
    try {
        let response = await fetch('http://localhost:3000/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sortType: sortType,
                arraySize: arraySize,
                times: times, // объект с временами для random, sorted, reversed
                date: new Date().toISOString()
            }),
        });
        if (!response.ok) {
            return response.statusText
        }
        console.log('Data successfully saved');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}
