var solveSudoku = function (board) {
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    backtrack(board, 0, 0);
    return board;
    function backtrack(curr, i, j) {
        if (i === 9) return true;

        let nextI = i, nextJ = j + 1;
        if (nextJ === 9) {
            nextI = i + 1;
            nextJ = 0;
        }

        if (curr[i][j] !== '.') {
            return backtrack(curr, nextI, nextJ);
        }

        let set = new Set();
        for (let k = 0; k < 9; k++) {
            if (curr[k][j] !== '.') set.add(curr[k][j]);
            if (curr[i][k] !== '.') set.add(curr[i][k]);
        }

        let startRow = Math.floor(i / 3) * 3;
        let startCol = Math.floor(j / 3) * 3;

        for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
                if (curr[row][col] !== '.') {
                    set.add(curr[row][col]);
                }
            }
        }

        for (let u = 0; u < data.length; u++) {
            if (!set.has(data[u])) {
                curr[i][j] = data[u];
                if (backtrack(curr, nextI, nextJ)) return true;
                curr[i][j] = '.';
            }
            if (set.size === 8 && u === data.length - 1) {
                return;
            }
        }
        return false;
    }
};
console.log(solveSudoku(
    [["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]]));