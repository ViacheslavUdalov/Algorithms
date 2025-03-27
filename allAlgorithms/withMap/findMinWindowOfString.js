function findMinWindowOfString(s, t) {
    let map = new Map();
    for (const char of t) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    let charsRemaining = t.length;
    let minWindow = [0, Infinity];
    let startIndex = 0;

    for (let endIndex = 0; endIndex < s.length; endIndex++) {
        const currChar = s[endIndex];
        if (map.has(currChar) && (map.get(currChar) > 0)) {
            charsRemaining--;
        }
        map.set(currChar, (map.get(currChar) || 0) - 1);
        if (charsRemaining === 0) {
            while (true) {
                const startChar = s[startIndex];
                if (map.has(currChar) && map.get(startChar) === 0) {
                    break;
                }
                map.set(startChar, (map.get(startChar) || 0) + 1);
                startIndex++;
            }
            if (endIndex - startIndex < minWindow[1] - minWindow[0]) {
                minWindow = [startIndex, endIndex];
            }

            map.set(startChar, (map.get(startChar) || 0) + 1);
            charsRemaining++;
            startIndex++;
        }
    }
    return minWindow.length >= s.length ? '' : s.slice(minWindow[0], minWindow[1]);
}
