var isInterleave = function(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) {
        return false;
    }
    return bt(s1, s2, s3, 0, 0);
};

function bt(s1, s2, s3, i, j) {
    let k = i + j;

    if (i === s1.length && j === s2.length && k === s3.length) {
        return true;
    }

    let a = (i < s1.length) && (s3[k] === s1[i]) && bt(s1, s2, s3, i + 1, j);
    let b = (j < s2.length) && (s3[k] === s2[j]) && bt(s1, s2, s3, i, j + 1);

    return a || b;
}
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));