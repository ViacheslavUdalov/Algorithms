var numTrees = function (n) {
    if (n === 1) return 1;
    let result = new Array(n).fill(1);

    for (let i = 2; i <= n; i++) {
        let total = 0;
        for (let j = 1; j <= i; j++) {
            total += result[j - 1] * result[i - j];
        }
        result[i] = total;
    }
    return result[n];
};
console.log(numTrees(3));
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}