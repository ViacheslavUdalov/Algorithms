var isPowerOfTwo = function(n) {
    let degree = 0;
    let m = 0
    while (m < n) {
        m = Math.pow(2, degree);
        if (m === n) return true;
        degree++;
    }
    return false;
}
console.log(isPowerOfTwo(3))