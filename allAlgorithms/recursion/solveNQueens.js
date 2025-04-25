function solveNQueens(n) {
    let columns = Array(n).fill(0);
    let rightDiagonal = Array(n * 2).fill(0);
    let leftDiagonal = Array(n * 2).fill(0);
    let solutions = [];
    
    let board = Array(n).fill(0).map(() => Array(n).fill('.'));
    
    function dfs(row) {
        if (row === n) {
             solutions.push(board.map(el => el.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (columns[col] + rightDiagonal[col + row] + leftDiagonal[n - row + col] === 0) {
                columns[col] = rightDiagonal[col + row] = leftDiagonal[n - row + col] = 1;
                board[row][col] = 'Q';
                dfs(row + 1);
                columns[col] = rightDiagonal[col + row] = leftDiagonal[n - row + col] = 0;
                board[row][col] = '.';
            }
        }
    }
    dfs(0);
    return solutions;
}

console.log(solveNQueens(4))