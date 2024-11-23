// наибольшая общаяя подпоследовательность.
function lcs(a, b) {
    let aLength = a.length
    let bLength = b.length
    let res = Array.from({ length: aLength + 1 }, () => Array(bLength + 1).fill(0));

    for (let i = 1; i <= aLength; i++) {
        for (let j = 1; j <= bLength; j++) {
            if (a[i - 1] === b[j - 1]) {
                res[i][j] = 1 + res[i - 1][j - 1];
            } else {
                res[i][j] = Math.max(res[i - 1][j], res[i][j - 1]);
            }
        }
    }
    return res[aLength][bLength];
}

console.log(lcs("ababc", "abcabc")) // выводит 5