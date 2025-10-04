var IsSameTree = function (p, q) {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    if (p.val !== q.val) return false;
    return IsSameTree(p.left, q.left) && IsSameTree(p.right, q.right);
}
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
var isSameTree = function(p, q) {
    if (!p || !q) {
        return p === q;
    }
    return (p.val === q.val) && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}