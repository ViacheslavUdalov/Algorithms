
// async function loadData() {
//     try {
//         const result = await fetch("http://localhost:3000/results");
//
//         if (!result.ok) {
//             console.log(result.statusText);
//         }
//         const data = await result.json();
//         displayData(data)
//     } catch (error) {
//         console.log(error);
//     }
// }

// function displayData(data) {
//     const table = document.getElementById("result-table");
//
//     data
//         .reduce((prev, curr) => {
//             if (!prev.find(result => result.sortType === curr.sortType && result.arraySize === curr.arraySize)) {
//                 prev.push(curr);
//             }
//             return prev;
//         }, [])
//         .reduce((prev, curr) => {
//             if (!prev.find(group => group.sortType === curr.sortType)) {
//                 prev.push({
//                     sortType: curr.sortType,
//                     results: [],
//                 });
//             }
//             prev.find(group => group.sortType === curr.sortType)
//                 .results.push(curr);
//             return prev;
//         }, [])
//         .forEach((resultGroup) => {
//             resultGroup.results.forEach((result, index) => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     ${index === 0
//                         ? ('<td rowspan="' + resultGroup.results.length + '"> ' + resultGroup.sortType + " sort </td>")
//                         : ''}
//                     <td>${result.arraySize}</td>
//                     <td>${result.times.random}</td>
//                     <td>${result.times.sorted}</td>
//                     <td>${result.times.reversed}</td>
//                 `;
//                 table.appendChild(row);
//             });
//         });
// }
//
//
// export default loadData;
// export async function commonFunction(arrayOfNumbers, funcForSort, sortType) {
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
//         let data = {
//             sortType: sortType,
//             arrayType: number,
//             times: {
//                 random: timeBTakenOne,
//                 sorted: timeSortedTakenOne,
//                 reversed: reverseBROne
//             }
//         }
//         console.log(data);
//         const response = await fetch('http://localhost:3000/result', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//         if (!response.ok) {
//             return response.statusText
//         }
//     }
// }