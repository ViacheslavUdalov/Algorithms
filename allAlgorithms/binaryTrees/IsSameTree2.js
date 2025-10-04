var isSameTree = function(p, q) {
    let queue1 = [p];
    let queue2 = [q];
    while (queue1.length > 0 && queue2.length > 0) {
        const node1 = queue1.shift();
        const node2 = queue2.shift();
        if (!node1 && !node2) {
            continue;
        }
        if (!node1 || !node2 || node1.val !== node2.val) {
            return false;
        }

        queue1.push(node1.left);
        queue1.push(node1.right);
        queue2.push(node2.left);
        queue2.push(node2.right);
    }
    return queue1.length === 0 && queue2.length === 0;
};
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}