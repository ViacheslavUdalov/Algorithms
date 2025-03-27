var longestPalindrome = function (s) {
    const length = s.length;
    const isPalindrome = Array(length)
        .fill(0)
        .map(() => Array(length).fill(true));
    let startIndex = 0;
    let maxLength = 1;
    for (let i = length - 2; i >= 0; i--) {
        for (let j = i + 1; j < length; j++) {
            isPalindrome[i][j] = false;
            if (s[i] === s[j]) {
                isPalindrome[i][j] = isPalindrome[i + 1][j - 1];
                if (isPalindrome[i][j] && maxLength < j - i + 1) {
                    maxLength = j - i + 1;
                    startIndex = i;
                }
            }
        }
    }
    return s.slice(startIndex, startIndex + maxLength);
};
console.log(longestPalindrome("babdadaba"));