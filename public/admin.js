import {program} from "commander";

program.option('-ad, --admin <type>', "type of operation");
program.parse();

const options = program.opts();

if (options.admin) {

}


function writeToDb() {

}

function recreateDb() {

}

function DeleteDb() {

}

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
