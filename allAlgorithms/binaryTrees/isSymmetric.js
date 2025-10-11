var isSymmetric = function(root) {
    if (root === null) return true;
    let queue1 = [root.left];
    let queue2 = [root.right];
    while(queue1.length && queue2.length) {
        var root1 = queue1.shift();
        var root2 = queue2.shift();
        if (root1 === null && root2 === null) continue;
        if (root1 === null || root2 === null) return false;
        if (root1.val !== root2.val) return false;

        queue1.push(root1.right);
        queue1.push(root1.left);
        queue2.push(root2.left);
        queue2.push(root2.right);
    }
    return queue1.length === 0 && queue2.length === 0;
};