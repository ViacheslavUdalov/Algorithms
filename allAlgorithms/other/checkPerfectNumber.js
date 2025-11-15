var checkPerfectNumber = function(num) {
    if (num === 1) return false;
    let sum = 0;
    for (let i = 1; i <= Math.floor(Math.sqrt(num)); i++) {
        if (num % i === 0) {
            sum += i;
            let p = num / i
            if (p !== i && p !== num) {
                sum += p;
            }
        }

    }
    return num === sum;
};
console.log(checkPerfectNumber(2016))