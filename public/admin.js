
export async function recreateWithSortType(sortType = null, arraySize= null) {
    try {
        const response = await fetch('http://localhost:4000/writeToDb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sortType, arraySize })
        });

        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        const result = await response.json();
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

