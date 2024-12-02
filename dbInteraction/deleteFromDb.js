import {helperLog} from "../public/sorts/bubbleSort.js";

export async function deleteFromDb(sortType) {
   try {
        // получение данных по типу сортировки
       const getData = await fetch(`http://localhost:3000/results?sortType=${sortType}`);
        if (!getData.ok) {
            throw new Error("Нет данных")
        }
        let data = await getData.json()
       if (data.length === 0) {
           helperLog("Нет данных для удаления")
       }


        data.map( async elem => {
            // обноление по типу сотрировки
            const response = await fetch(`http://localhost:3000/results/${elem.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                return response.statusText
            }
            helperLog('Data successfully delete');
        })

    } catch (error) {
        console.error('Error deleting data:', error);
    }
}
