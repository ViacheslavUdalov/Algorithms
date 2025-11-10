var diameterOfBinaryTree = function(root) {
    let maxDiam = 0;
    backtrack(root);
    return maxDiam;
    function backtrack(root) {
        if (!root) return 0;
        let leftSubTree = backtrack(root.left);
        let rightSubTree = backtrack(root.right);
        maxDiam = Math.max(maxDiam, leftSubTree + rightSubTree);
        return 1 + Math.max(leftSubTree, rightSubTree);
    }
};