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
    data.forEach((result, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                   <td>${result.sortType}</td>
                    <td>${result.arrayType}</td>
                    <td>${result.times.random}</td>
                    <td>${result.times.sorted}</td>
                    <td>${result.times.reversed}</td>
                `;
                table.appendChild(row);
        });
}