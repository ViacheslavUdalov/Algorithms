var numIslands = function (grid) {
    let result = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                result++;
                bfs(grid, i, j);
            }
        }
    }
    return result;
    function bfs(grid, i, j) {
        if (j < 0 || i < 0 || j >= grid[0].length || i >= grid.length || grid[i][j] === '0') {
            return;
        }
            grid[i][j] = '0';
            bfs(grid, i + 1, j);
            bfs(grid, i, j + 1);
            bfs(grid, i, j - 1);
            bfs(grid, i - 1, j);
    }
};
console.log(numIslands([
    ['1', '1', '0', "0"],
    ['1', '1', '0', "1"],
    ['1', '0', '0', "0"],
    ['0', '0', '1', "1"]]))