var surroundedRegions = function (board) {
    let i = 0;
    let j = 0;
    while (j < board[0].length) {
        if (board[i][j] === 'O') {
            helper(i, j);
        }
        j++;
    }

    j--;
    while (i < board.length) {
        if (board[i][j] === 'O') {
            helper(i, j);
        }
        i++;

    }
    i--;
    while (j > 0) {
        if (board[i][j] === 'O') {
            helper(i, j);
        }
        j--;
    }
    while (i > 0) {
        if (board[i][j] === 'O') {
            helper(i, j);
        }
        i--;

    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === "O") board[i][j] = "X";
            if (board[i][j] === "T") board[i][j] = "O";
        }
    }

    function helper(i, j) {
        board[i][j] = 'T';
        if (i - 1 > 0 && board[i - 1][j] === 'O') {
            helper(i - 1, j);
        }
        if (i + 1 < board.length && board[i + 1][j] === 'O') {
            helper(i + 1, j);
        }
        if (j - 1 > 0 && board[i][j - 1] === 'O') {
            helper(i, j - 1);
        }
        if (j + 1 < board[0].length && board[i][j + 1] === 'O') {
            helper(i, j + 1);
        }
    }
    return board;
};


console.log(surroundedRegions([
    ["X","O","X"],
    ["O","X","O"],
    ["X","O","X"]]))