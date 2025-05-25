function wordBreak(s, wordDict) {
    let n = s.length;
    let dp = new Array(n + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i < n; i++) {
        for (const w of wordDict) {
            let start = i - w.length;
            if (dp[start] && start >= 0 && s.substring(start, i) === w) {
            dp[i] = true;
            break;
            }
        }
    }
    return dp[n];
}