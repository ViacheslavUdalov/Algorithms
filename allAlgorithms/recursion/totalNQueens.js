var totalNQueens = function(n) {
    let cols = new Set();
    let rightdiags = new Set();
    let leftdiags = new Set();
    let res = 0;
    function backtraking(row) {
        if (row === n) {
            res += 1;
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || rightdiags.has(row + col) || leftdiags.has(row - col)) continue;
            cols.add(col);
            rightdiags.add(row + col);
            leftdiags.add(row - col);
            backtraking(row + 1);
            cols.delete(col);
            rightdiags.delete(row + col);
            leftdiags.delete(row - col);
        }


    };
    backtraking(0);
    return res;
}
console.log(totalNQueens(4));
