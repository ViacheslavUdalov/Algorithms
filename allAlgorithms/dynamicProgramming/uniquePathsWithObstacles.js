var uniquePathsWithObstacles = function(obstacleGrid) {
    if (obstacleGrid[0][0] === 1) return 0;
    let n = obstacleGrid.length;
    let m = obstacleGrid[0].length;
    let dp = Array.from({length : n}).fill(0).map(() => Array.from({length : m}).fill(0));
    dp[0][0] = 1;
    for (let i = 0; i < obstacleGrid.length; i++) {
        for (let j = 0; j < obstacleGrid[0].length; j++) {
            if (obstacleGrid[i][j] === 1) {
                continue;
            }
            if (i > 0) dp[i][j] += dp[i - 1][j];
            if (j > 0) dp[i][j] += dp[i][j - 1];
        }
    }
    return dp[n - 1][m - 1];
};
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]));
