var canBeTypedWords = function (text, brokenLetters) {
    if (brokenLetters.length === 0) return text.split(" ").length;
    let result = 0;
    for (const word of text.split(" ")) {
        for (let i = 0; i < brokenLetters.length; i++) {
            const char = brokenLetters[i];
            if (word.includes(char)) {
                break;
            }
            if (i === brokenLetters.length - 1 && !word.includes(char)) {
                result++;
            }
        }
    }
    return result;
};


const canBeTypedWords2 = (text, broken) => {
    const brokenKeys = new Set(broken);
    const words = text.split(" ");
    let count = 0;

    for (const word of words) {
        for (const c of word) {
            if (brokenKeys.has(c)) {
                count++;
                break;
            }
        }
    }

    return words.length - count;
};