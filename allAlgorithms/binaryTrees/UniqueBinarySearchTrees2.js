var generateTrees = function (n) {
    if (n === 0) return 0;
    let memo = new Map();
    return generate(1, n);
   
    function generate(left, right) {
        console.log(`left`, left)
        console.log(`right`, right)
     if (memo.has(`${left}-${right}`)) {
         return memo.get(`${left}-${right}`);
     }
     let result = [];
        if (left > right) {
            result.push(null);
            return result;
        }
        
        for (let root = left; root <= right; root++) {
            const leftTreeNodes = generate(left,root - 1);
            let rightTreeNodes = generate(root + 1, right);
            for (const leftTreeNode of leftTreeNodes) {
                for (const rightTreeNode of rightTreeNodes) {
                    const val = new TreeNode(root, leftTreeNode, rightTreeNode);
                    result.push(val);
                }
            }
        }
        memo.set(`${left}-${right}`, result);
        return result;
    }
};

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
console.log(generateTrees(3));