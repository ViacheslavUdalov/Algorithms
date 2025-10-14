var binaryTreePaths = function(root) {
    if (!root) return []
    let result = [];
    backtrack(root, '');
    function backtrack(node, curr) {
        curr = curr.length === 0 ? `${node.val}` : curr + `->${node.val}`
        if (!node.left && !node.right) {
            result.push(curr);
            return;
        }

        if (node.left) backtrack(node.left, curr)
        if (node.right) backtrack(node.right, curr)
    }
    return result;
};