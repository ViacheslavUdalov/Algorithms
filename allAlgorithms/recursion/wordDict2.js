function wordBreak(s, wordDict) {
    let maxLength = wordDict.reduce((max, curr) => {
        return Math.max(max, curr.length)
    }, 0)
    let result = [];
    for (let i = 1; i <= maxLength; i++) {
        if (wordDict.includes(s.substring(0, i))) {
            dfs(s.substring(0, i), i);
        }
    }
    return result;

    function dfs(curr, index) {
        if (index === s.length) {
            result.push(curr);
            return;
        }
        for (let i = index + 1; i <= s.length; i++) {
            if (wordDict.includes(s.substring(index, i))) {
                dfs(curr + ' ' + s.substring(index, i), i);
            }
        }
    }
}
console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]));