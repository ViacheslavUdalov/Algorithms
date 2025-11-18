var countSegments = function(s) {
    if (s.trim().length === 0) return 0;
    return s.split(" ").map(el => el.trim()).filter(i => i.length !== 0).length;
};
console.log(countSegments("Of all the gin joints in all the towns in all the world,   "))
var countSegments2 = function(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== ' ' && (i === 0 || s[i - 1] === ' ')) {
            count++;
        }
    }
    return count;
}