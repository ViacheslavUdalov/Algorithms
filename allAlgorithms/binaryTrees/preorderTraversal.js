var preorderTraversal = function(root) {
    if (root === null) return [];
    let stack = [root];
    let result = [];
    while (stack.length) {
        const node = stack.pop();
        result.push(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    console.log(result)
    return result;
};