var sumOfLeftLeaves = function(root) {
    let sum = 0;
    function backtrack(root, isLeft) {
        if (root.left) backtrack(root.left, true)
        if (root.right) backtrack(root.right, false)
        if (isLeft && !root.right && !root.left) sum += root.val;
    }
    backtrack(root, false);
    return sum;
};
var sumOfLeftLeaves1 = function(root) {
    const dfs = (node, isLeft) => {
        if (!node) return 0;
        if (!node.left && !node.right) return isLeft ? node.val : 0;
        return dfs(node.left, true) + dfs(node.right, false);
    };
    return dfs(root, false);
};