var findLadders = function (beginWord, endWord, wordList) {
    let wordDict = new Set(wordList);
    let map = {};
    for (const word of wordDict) {
        for (let i = 0; i < word.length; i++) {
            let pattern = word.slice(0, i) + "*" + word.slice(i + 1);
            if (!map[pattern]) map[pattern] = [];
            map[pattern].push(word);
        }
    }

    function isConnected(wordOne, wordTwo) {
        let count = 0;
        for (let i = 0; i < wordOne.length && count < 2; i++) {
            if (wordOne[i] !== wordTwo[i]) count++;
        }
        return count === 1;
    }

    let queue = [beginWord];
    let nodesPerLevel = [];
    let reached = false;
    while (queue.length && !reached) {
        nodesPerLevel.push([...queue]);
        const len = queue.length;

        for (let i = 0; i < len && !reached; i++) {
            let word = queue.shift();

            for (const to of wordDict) {

                if (!isConnected(word, to)) continue;
                if (to === endWord) {
                    reached = true;
                    break;
                }
                queue.push(to);
                wordDict.delete(to);
            }
        }

    }
    if (!reached) return [];

    let ans = [[endWord]];

    for (let level = nodesPerLevel.length - 1; level >= 0; level--) {
        const ansLen = ans.length;
        for (let i = 0; i < ansLen; i++) {
            const path = ans.shift();
            const first = path[0];
            for (let word of nodesPerLevel[level]) {
                if (!isConnected(first, word)) continue;
                ans.push([word, ...path]);
            }
        }
    }
    return ans;
};
console.log(findLadders(beginWord = "hit", endWord = "cog", wordList = ["hot", "dot", "dog", "lot", "log", "cog"]));
