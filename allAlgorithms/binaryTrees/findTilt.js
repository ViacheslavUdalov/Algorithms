var findTilt = function(root) {
    let tilt = 0;
    backtrack(root)
    return tilt;
    function backtrack(node) {
        if (!node) return 0;
        let left = backtrack(node.left)
        let right = backtrack(node.right);
        tilt +=  Math.abs(left - right);
        return node.val + left + right;
    }
};