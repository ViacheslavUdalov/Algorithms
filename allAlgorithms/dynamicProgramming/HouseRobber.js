var rob = function(nums) {
    if (nums.length === 1) return nums[0];
    let dp = new Array(nums.length).fill(0);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = Math.max(dp[i - 1] || 0, (dp[i - 2] || 0) + nums[i]);
    }
    return dp[dp.length - 1];
};
console.log(rob([2,7,9,3,1]))