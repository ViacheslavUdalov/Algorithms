window.onload = async  () => {
    await loadData();
}
async function loadData() {
    try {
        const result = await fetch("http://localhost:4000/getData");

        if (!result.ok) {
            console.log(result.statusText);
        }
        const data = await result.json();
        displayData(data.message)
    } catch (error) {
        console.log(error);
    }
}

function displayData(data) {
    const table = document.getElementById("result-table");
    data
        // .reduce((prev, curr) => {
        //     if (!prev.find(result => result.sortType === curr.sortType && result.arraySize === curr.arraySize)) {
        //         prev.push(curr);
        //     }
        //     return prev;
        // }, [])
        // // grouping results by sortType
        // .reduce((prev, curr) => {
        //     if (!prev.find(group => group.sortType === curr.sortType)) {
        //         prev.push({
        //             sortType: curr.sortType,
        //             results: [],
        //         });
        //     }
        //     prev.find(group => group.sortType === curr.sortType)
        //         .results.push(curr);
        //     return prev;
        // }, [])
        .forEach((result, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                   <td>${result.sortType}</td>
                    <td>${result.arraySize}</td>
                    <td>${result.times.random}</td>
                    <td>${result.times.sorted}</td>
                    <td>${result.times.reversed}</td>
                `;
                table.appendChild(row);
        });
}