// Генерирует перестановки с повторяющимися числами.
function generateNumbers(n, m, prefix = []) {
    if (m === 0) {
        console.log(prefix)
        return;
    }
    // prefix = prefix || [];
   for (let i = 0; i <= n; i++) {
        prefix.push(i);
        generateNumbers(n, m - 1, prefix)
        prefix.pop();
    }
}


function genBin(m, prefix="") {
    if (m === 0) {
        console.log(prefix);
        return
    }
    genBin(m - 1, prefix + "0");
    genBin(m - 1, prefix + "1");

}


// для двоичной
// console.log(genBin(3))


// для произвольной системы счисления
console.log(generateNumbers(4, 3));