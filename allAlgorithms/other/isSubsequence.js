var isSubsequence = function(s, t) {
    let index = 0;
    for (let char of t) {
        if (char === s[index]) {
            index++;
        }
    }
    return index === s.length;
};
var isSubsequence1 = function(s, t) {
    let sp = 0;
    let tp = 0;

    while (sp < s.length && tp < t.length) {
        if (s[sp] === t[tp]) {
            sp++;
        }
        tp++;
    }

    return sp === s.length;
};