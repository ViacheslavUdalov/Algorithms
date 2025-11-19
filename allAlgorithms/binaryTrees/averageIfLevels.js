var averageOfLevels = function(root) {
    let result = [];
    let queue = [root];
    while (queue.length > 0) {
        let len = queue.length;
        let curr = 0;
        for (let i = 0; i < len; i++) {
            const node = queue.shift();
            curr += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(curr / len);

    }
    return result;
};