var isBalanced = function(root) {
    function dfs(node) {
        if (!node) return [true, 0];

        const [leftBalanced, leftHeight] = dfs(node.left);
        const [rightBalanced, rightHeight] = dfs(node.right);

        const isBalanced = leftBalanced && rightBalanced && Math.abs(leftHeight - rightHeight) <= 1;

        return [isBalanced, 1 + Math.max(leftHeight, rightHeight)];
    }

    return dfs(root)[0];
};