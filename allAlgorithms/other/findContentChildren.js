var findContentChildren = function(g, s) {
    g = g.sort((a, b) => a - b);
    s = s.sort((a, b) => a - b);
    let j = 0, i = 0;
    while (i < g.length && j < s.length) {
        if (s[j] >= g[i]) i++;
        j++;
    }
    return i;
};
console.log(findContentChildren([1,2,3], s = [1,1]))
console.log(findContentChildren([1,2], s = [1,2,3]))
console.log(findContentChildren([10,9,8,7], s = [5,6,7,8]))