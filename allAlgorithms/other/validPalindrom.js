var validPalindrome = function (s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return (
                isPalindrome(s, left + 1, right) ||
                isPalindrome(s, left, right - 1)
            )
        }
        left++;
        right--;

    }
    return true;

};
function isPalindrome(s, l, r) {
    while (l < r) {
        if (s[l] !== s[r]) return false;
        l++;
        r--;
    }
    return true;
}

console.log(validPalindrome('aba'))
console.log(validPalindrome('abca'))
console.log(validPalindrome('abc'))
console.log(validPalindrome('abca'))
console.log(validPalindrome('abcac'))
console.log(validPalindrome("tebbem"))