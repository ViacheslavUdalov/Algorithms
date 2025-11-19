var isIsomorphic = function (s, t) {
    if (s.length !== t.length) return false;
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (!map.has(s[i]) && !Array.from(map.values()).includes(t[i])) {
            map.set(s[i], t[i]);
            continue;
        }
        if (map.get(s[i]) !== t[i]) {
            return false;
        }
    }
    return true;
};
console.log(isIsomorphic("egg", t = "add"))
console.log(isIsomorphic("foo", t = "bar"))
console.log(isIsomorphic("paper", t = "title"))
console.log(isIsomorphic("badc", t = "baba"))