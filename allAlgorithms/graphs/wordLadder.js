function wordLadder(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return 0;
    wordList.push(beginWord);
    let res = 1;
    let map = {};
    for (const word of wordList) {
        for (let i = 0; i < word.length; i++) {
            let pattern = word.slice(0, i) + "*" + word.slice(i + 1);
            if (!map[pattern]) map[pattern] = [];
            map[pattern].push(word);
        }
    }

    let queue = [beginWord];
    let visited = new Set();
    while (queue.length) {
        let length = queue.length;
        for (let j = 0; j < length; j++) {
            let word = queue.shift();
            if (word === endWord) return res;
            for (let i = 0; i < word.length; i++) {
                let pattern = word.slice(0, i) + "*" + word.slice(i + 1);
                for (const neighbour of map[pattern]) {
                    if (!visited.has(neighbour)) {
                        visited.add(neighbour);
                        queue.push(neighbour);
                    }
                }
            }
        }
        res++;
    }
    return 0;
}

console.log(wordLadder( "hit",  "cog", ["hot", "dot", "dog", "lot", "log", "cog"]))