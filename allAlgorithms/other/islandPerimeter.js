var islandPerimeter = function(grid) {
    let res = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                res += 4;
                if (i > 0 && grid[i - 1][j] === 1) res -= 2;
                if (j > 0 && grid[i][j - 1] === 1) res -= 2;
            }
        }
    }
    return res;
};
var islandPerimeter1 = function(grid) {
    let common = 0;
    let full = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                full++;
                if (grid[i - 1] && grid[i - 1][j] !== 0) {
                    common++;
                }
                if (grid[i][j - 1] && grid[i][j - 1] !== 0) {
                    common++;
                }
            }
        }
    }
    return 4 * full - 2 * common;
};