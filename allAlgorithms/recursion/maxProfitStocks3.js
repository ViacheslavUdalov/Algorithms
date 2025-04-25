let maxProfit = function(prices) {
    function dfs(i, t) {
        if (i === prices.length || t === 4) return 0;

        if (t % 2) {
            return Math.max(prices[i] + dfs(i + 1, t + 1), 0 + dfs(i + 1, t));
        }
        return Math.max(-prices[i] + dfs(i + 1, t + 1), 0 + dfs(i + 1, t));
    }
    return dfs(0, 0)
};
console.log(maxProfit([1,2,4,2,5,7,2,4,9,0]));