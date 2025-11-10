var findWords = function(words) {
    const rows = [
        new Set("qwertyuiop"),
        new Set("asdfghjkl"),
        new Set("zxcvbnm")
    ]
    return words.filter(word => {
        const lower = word.toLowerCase();
        const row = rows.find(r => r.has(lower[0]));
        return [...lower].every(char => row.has(char))
    })
};
console.log(findWords(["Hello","Alaska","Dad","Peace"]))