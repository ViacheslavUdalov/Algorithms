// функция достижения финальной точки finalPoint за минимальную стоимость

function reachThePointWithMinCost(finalPoint, prices) {
    let arrayForFPoint = Array(finalPoint + 1).fill(0);
    arrayForFPoint[0] = prices[0];
    arrayForFPoint[1] = prices[0] + prices[1];

    for (let i = 2; i <= finalPoint; i++) {
        arrayForFPoint[i] = prices[i] + Math.min(arrayForFPoint[i - 1], arrayForFPoint[i - 2]);
    }
    return arrayForFPoint[finalPoint];
}

console.log(reachThePointWithMinCost(5, [5, 6, 4, 3, 1, 2])); // должен вывести 12