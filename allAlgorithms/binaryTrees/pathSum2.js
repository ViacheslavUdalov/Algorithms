var pathSum = function(root, targetSum) {
    if (!root) return []
    let result = [];
    backtrack([], root, targetSum);
    function backtrack(curr, node, target) {
        curr.push(node.val);
        if (!node.left && !node.right) {
            if (target - node.val === 0) {
                result.push(curr);
            }
            return;
        }

        target -= node.val;

        if (node.left) backtrack([...curr], node.left, target);
        if (node.right) backtrack([...curr], node.right, target);

    }
    return result;
};