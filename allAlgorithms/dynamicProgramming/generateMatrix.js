
var generateMatrix = function (n) {
    let dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
    dp[0][0] = 1;
    let left = 0;
    let right = n;
    let top = 0;
    let bottom = n;
    let i = 0;
    let j = 0;
    while (left <= right || top <= bottom) {
        while (j < right - 1) {
            j++;
            dp[i][j] = dp[i][j - 1] + 1;
        }
        top++;
        while (i < bottom - 1) {
            i++;
            dp[i][j] = dp[i - 1][j] + 1;
        }
        right--;
        while (j > left) {
            j--;
            dp[i][j] = dp[i][j + 1] + 1;
        }
        left++;
        while (i > top) {
            i--;
            dp[i][j] = dp[i + 1][j] + 1;

        }
        bottom--;
    }
    return dp;
};
console.log(generateMatrix(4));