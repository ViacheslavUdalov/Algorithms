var canConstruct = function(ransomNote, magazine) {
    let map = new Map();
    let result = ransomNote.length;
    for (let i = 0; i < magazine.length; i++) {
        if (map.has(magazine[i])) {
            map.set(magazine[i], map.get(magazine[i]) + 1)
            continue;
        }
        map.set(magazine[i], 1);
    }
    for (let i = 0; i < ransomNote.length; i++) {
        if (map.get(ransomNote[i]) > 0) {
            map.set(ransomNote[i], map.get(ransomNote[i]) - 1);
            result--;
        }
    }
    return result === 0;
};
console.log(canConstruct("aa", "ab")) // false
console.log(canConstruct("bg", "efjbdfbdgfjhhaiigfhbaejahgfbbgbjagbddfgdiaigdadhcfcj")) // true
console.log(canConstruct("a", "b")) // false
console.log(canConstruct("aa", "aab")) // true
console.log(canConstruct("baa", "aab")) // true