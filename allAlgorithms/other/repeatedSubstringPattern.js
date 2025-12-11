var repeatedSubstringPattern = function(s) {
    let n = s.length;
    for (let len = 1; len <= n / 2; len++) {
        if (n % len !== 0) continue;
        let pattern = s.substring(0, len);
        let repeated = pattern.repeat(n / len);
        if (repeated === s) return true;
    }
    return false;
};