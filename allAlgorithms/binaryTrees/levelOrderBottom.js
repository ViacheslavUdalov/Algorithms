var levelOrderBottom = function(root) {
    if (root === null) return [];
    let queue = [root];
    let result = [];
    while (queue.length) {
        let length = queue.length;
        let curr = [];
        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            curr.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(curr);
    }
    return result.reverse();
};