var levelOrder = function(root) {
    if (root === null) return [];
    let queue = [root];
    let res = [];
    while (queue.length) {
        let length = queue.length;
        let curr = [];
        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            curr.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right)queue.push(node.right);
        }
        res.push(curr);
    }
    return res;
};