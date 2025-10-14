var countNodes = function(root) {
    let leftHeight = count(root, true);
    let rightHeight = count(root, false);
    if (leftHeight === rightHeight) {
        return Math.pow(2, leftHeight) - 1;
    }
    return countFullNodes(root.left) + countFullNodes(root.right) + 1;
    function countFullNodes(root) {
        if(!root) return 0;
        return countFullNodes(root.left) + countFullNodes(root.right) + 1;
    }
    function count(node, isLeft) {
        if (!node) return 0;
        return (isLeft ? count(node.left, isLeft) : count(node.right, isLeft)) + 1;
    }
};