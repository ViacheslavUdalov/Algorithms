var longestPalindrome = function(s) {
    let map = {};
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        map[s[i]] = (map[s[i]] || 0) + 1
    }

    for (const count of Object.values(map)) {
        result += count % 2 === 0 ? count : count - 1;
    };
    return result < s.length ? result + 1 : result;
}
console.log(longestPalindrome("abccccdd"))
console.log(longestPalindrome("a"))