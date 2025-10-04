var isSameTree = function(p, q) {
    let stack1 = [p];
    let stack2 = [q];
    while (stack1.length > 0 && stack2.length > 0) {
        const node1 = stack1.pop();
        const node2 = stack2.pop();
        if (!node1 && !node2) {
            continue;
        }
        if (!node1 || !node2 || node1.val !== node2.val) {
            return false;
        }

        stack1.push(node1.left);
        stack1.push(node1.right);
        stack2.push(node2.left);
        stack2.push(node2.right);
    }
    return stack1.length === 0 && stack2.length === 0;
};