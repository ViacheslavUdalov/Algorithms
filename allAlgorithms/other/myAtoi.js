var myAtoi = function (s) {
    s = s.trim();
    if (!s) return 0;
    let result = 0;
    let sign = 1;
    let i = 0;
    if (s[0] === '-') {
        sign = sign * -1;
        i++;
    }
    if (s[0] === '+') {
        i++;
    }

    for (; i < s.length; i++) {
        const curr = s.charCodeAt(i) - '0'.charCodeAt(0);
        if (curr < 0 && curr > 9) break;
        if (result > Math.floor(2147483647 / 10) &&
            result > Math.floor((2147483647 - curr) / 10)) {
            return sign > 0 ? 2147483647 : -2147483648;
        }
        result = result * 10 + curr;
    }
    return result * sign;
};
console.log(myAtoi('   -042'));