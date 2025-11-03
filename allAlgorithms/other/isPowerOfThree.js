var isPowerOfThree = function(n) {
    if (n <= 0) return false;
    let currval = 0;
    let degree = 0;
    while (currval <= n) {
        currval = Math.pow(3, degree);
        if (currval === n) return true;
        degree++;
    }
    return false;
};