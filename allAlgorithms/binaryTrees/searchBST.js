var searchBST = function(root, val) {
    if (!root) return null;
    let stack = [root];
    while (stack.length) {
        let node = stack.pop();
        if (node.val === val) {
            return node;
        }
        if (val < node.val && node.left) stack.push(node.left);
        if (val > node.val && node.right) stack.push(node.right);
    }
    return null;
};