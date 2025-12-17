var reverseStr = function (s, k) {
    s = s.split("");
    for (let i = 0; i < s.length; i += 2 * k) {
        console.log('i', i);
        let left = i;
        let right = Math.min(i + k - 1, s.length - 1);
        while (left < right) {
            [s[left], s[right]] = [s[right], s[left]];
            left++;
            right--;
        }
    }
    return s.join("");
};
console.log(reverseStr("abcdefg", 2))
console.log(reverseStr("abcd", 2))