
// export async function commonFunction(arrayOfNumbers, funcForSort, row, sortType) {
//     const table = document.getElementById("result-table");
//
//     // Нужно для того, что бы браузер успел отрисовать изменения в DOM, setTimeout передаётся в очередь, это позволяет браузеру обновить UI между операциями сортировки
//     await new Promise(resolve => setTimeout(resolve, 0));
//
//     for (const number of arrayOfNumbers) {
//         let randomArray = createArray(number);
//         let sortedArray = createSortedArray(number);
//         let reverseSortedArray = createSortedReverseArray(createSortedArray(number));
//
//         async function allSorting(sortFunc, array) {
//             let startOne = performance.now();
//             sortFunc([...array]);
//             return (performance.now() - startOne).toFixed(2)
//         }
//
//         let timeBTakenOne = await allSorting(funcForSort, randomArray)
//
//         let timeSortedTakenOne = await allSorting(funcForSort, sortedArray);
//
//         let reverseBROne = await allSorting(funcForSort, reverseSortedArray);
//
//
//         row = document.createElement("tr");
//         row.innerHTML = `
//                             <td>${sortType} Sort ${number}</td>
//                             <td>${timeBTakenOne}</td>
//                             <td>${timeSortedTakenOne}</td>
//                             <td>${reverseBROne}</td>
//                             `;
//         table.appendChild(row);
//
//         await saveResultToDB(sortType, number, {
//             random: timeBTakenOne,
//             sorted: timeSortedTakenOne,
//             reversed: reverseBROne
//         })
//     }
// }

// async function saveResultToDB(sortType, arraySize, times) {
//     try {
//         let response = await fetch('http://localhost:3000/results', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 sortType: sortType,
//                 arraySize: arraySize,
//                 times: times, // объект с временами для random, sorted, reversed
//                 date: new Date().toISOString()
//             }),
//         });
//         if (!response.ok) {
//             return response.statusText
//         }
//         console.log('Data successfully saved');
//     } catch (error) {
//         console.error('Error saving data:', error);
//     }
// }

async function loadData() {
    try {
        const result = await fetch("http://localhost:3000/results");

        if (!result.ok) {
            console.log(result.statusText);
        }
        const data = await result.json();
        // await commonFunction([1000, 5000, 10000, 15000, 20000], mergeSort, "row1", "merge")
        // await commonFunction([1000, 5000, 10000, 15000, 20000], quicksort, "row1", "quick")
        displayData(data)
    } catch (error) {
        console.log(error);
    }
}

function displayData(data) {
    const table = document.getElementById("result-table");

    data
        .reduce((prev, curr) => {
            if (!prev.find(result => result.sortType === curr.sortType && result.arraySize === curr.arraySize)) {
                prev.push(curr);
            }
            return prev;
        }, [])
        .reduce((prev, curr) => {
            if (!prev.find(group => group.sortType === curr.sortType)) {
                prev.push({
                    sortType: curr.sortType,
                    results: [],
                });
            }
            prev.find(group => group.sortType === curr.sortType)
                .results.push(curr);
            return prev;
        }, [])
        .forEach((resultGroup) => {
            resultGroup.results.forEach((result, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    ${index === 0
                        ? ('<td rowspan="' + resultGroup.results.length + '"> ' + resultGroup.sortType + " sort </td>")
                        : ''}
                    <td>${result.arraySize}</td>
                    <td>${result.times.random}</td>
                    <td>${result.times.sorted}</td>
                    <td>${result.times.reversed}</td>
                `;
                table.appendChild(row);
            });
        });
}


export default loadData;
