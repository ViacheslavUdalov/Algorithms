import {program} from "commander";
import {helperLog} from "../utils/useTooling.js";

program.option('-ad, --admin <type>', "type of operation");
program.parse();

const options = program.opts();

if (options.admin) {

}


async function writeToDb() {
    try {
        const dataExist = await fetch(`http://localhost:3000/results`);
        if (dataExist.ok) {

// проверка есть ли уже данные по типу и размеру массива, если есть, то выходим
            let data = await dataExist.json();
            if (data.length !== 0) {
                helperLog("уже есть данные")
                return "уже есть данные"
            }
        }

        helperLog("Данных нет - Записываем")
        const response = await fetch('http://localhost:3000/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

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

async function recreateDb() {
    await deleteDb();
    await writeToDb();
}

async function deleteDb() {
    try {
        // получение данных по типу сортировки
        const getData = await fetch(`http://localhost:3000/results`);
        if (!getData.ok) {
            throw new Error("Нет данных")
        }
        let data = await getData.json()
        if (data.length === 0) {
            helperLog("Нет данных для удаления")
        }


        data.map( async elem => {
            // обноление по типу сотрировки
            const response = await fetch(`http://localhost:3000/results/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                return response.statusText
            }
            helperLog('Data successfully delete');
        });

    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

export async function commonFunction(arrayOfNumbers, funcForSort, row, sortType) {
    const table = document.getElementById("result-table");

    // Нужно для того, что бы браузер успел отрисовать изменения в DOM, setTimeout передаётся в очередь, это позволяет браузеру обновить UI между операциями сортировки
    await new Promise(resolve => setTimeout(resolve, 0));

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


        row = document.createElement("tr");
        row.innerHTML = `
                            <td>${sortType} Sort ${number}</td>
                            <td>${timeBTakenOne}</td>
                            <td>${timeSortedTakenOne}</td>
                            <td>${reverseBROne}</td>
                            `;
        table.appendChild(row);

        await saveResultToDB(sortType, number, {
            random: timeBTakenOne,
            sorted: timeSortedTakenOne,
            reversed: reverseBROne
        })
    }
}
