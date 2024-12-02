// количество операция для получения второго слова из первого, путём заменой, добавлением или удалением символа.

function levinstein(a, b) {
    let resArray = Array.from({length: a.length}, () => Array(b.length).fill(0));

    for (let i = 1; i < a.length; i++) {
        for (let j = 1; j < b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                resArray[i][j] = resArray[i - 1][j - 1];
            } else {
                resArray[i][j] = 1 + Math.min(resArray[i - 1][j - 1], resArray[i - 1][j], resArray[i][j - 1]);
            }
        }
    }
    return resArray[a.length - 1][b.length - 1];
}

console.log(levinstein('колокол', 'молоко')); // выведет 2