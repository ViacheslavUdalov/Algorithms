var findLadders = function(beginWord, endWord, wordList) {
    let wordDict = new Set(wordList);

    function isConnected(a, b) {
        let count = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                count++;
            }
        }
        return count === 1;
    }
    let reached = false;
    let queue = [beginWord];
    let nodesPerLevel = [];

    while (queue.length && !reached) {
        nodesPerLevel.push([...queue]);
        const len = queue.length;
        for (let i = 0; i < len && !reached; i++) {
            const from = queue.shift();
            for (const to of wordDict) {
                if (!isConnected(from, to)) continue;
                if (to === endWord) {
                    reached = true;
                    break;
                }
                queue.push(to)
                wordDict.delete(to);
            }
        }
    }
    if (!reached) return [];
    console.log(nodesPerLevel);

    const ans = [[endWord]];

    for (let level = nodesPerLevel.length - 1; level >= 0; level--) {
        console.log('ans', ans);

        const len = ans.length;
        for (let i = 0; i < len; i++) {
            let path = ans.shift();
            console.log('path', path);

            let first = path[0];
            console.log('nodesPerLevel[level]', nodesPerLevel[level]);

            for (let word of nodesPerLevel[level]) {
                if (!isConnected(first, word)) continue;
                ans.push([word, ...path]);
            }
        }
    }
    return ans;
};
console.log(findLadders("hit","cog",["hot","dot","dog","lot","log","cog"]));
