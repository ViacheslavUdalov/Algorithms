function wordBreak(s, wordDict) {
    let dict = new Set(wordDict);
    let cache = new Map();
    return dfs(dict, s, cache);
}
function dfs(dict, s, cache) {
    if (cache.has(s)) {
        return cache.get(s);
    }
    if (dict.has(s)) return true;
    for (let i = 1; i < s.length; i++) {
        if (dict.has(s.substring(0, i)) && dfs(dict, s.substring(i, s.length), cache)) {
            cache.set(s, true);
            return true;
        }
    }
    cache.set(s, false);
    return false;
}