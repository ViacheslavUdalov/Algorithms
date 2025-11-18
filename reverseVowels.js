var reverseVowels = function(s) {
    s = s.split("");
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (!vowels.includes(s[left].toLowerCase())) {
            left++;
            continue;
        }
        if (!vowels.includes(s[right].toLowerCase())) {
            right--;
            continue;
        }
        [s[left], s[right]] = [s[right], s[left]]
        left++;
        right--;

    }
    return s.join("");
};
console.log(reverseVowels("IceCreAm"))