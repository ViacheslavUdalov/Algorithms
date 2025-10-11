var isBalanced = function (root) {
    if (root === null) return true;
    return Math.abs(dfs(root.left) - dfs(root.right)) <= 1
        && isBalanced(root.left)
        && isBalanced(root.right);

    function dfs(root) {
        if (root === null) return 0;
        return 1 + Math.max(dfs(root.left), dfs(root.right));
    }

};