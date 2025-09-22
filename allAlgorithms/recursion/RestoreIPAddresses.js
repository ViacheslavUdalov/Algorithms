var restoreIpAddresses = function(s) {
    let result = [];
    dfs([], 0, '')
    return result;

    function dfs(curr, index) {
        if (curr.length > 4) {
            return;
        }
        if (index === s.length && curr.length === 4) {
            result = [...result, curr.join('.')];
            return;
        }
        let sum = '';
        for (let i = index; i < s.length || sum.length < 4; i++) {
            sum += s[i];
            if (sum.length > 1 && sum[0] === '0') return;
            if (Number(sum) <= 255) {
                curr.push(sum)
                dfs(curr, i + 1);
                curr.pop();
            } else {
                return;
            }
        }
    }
};
console.log(restoreIpAddresses("25525511135"));
console.log(restoreIpAddresses("0000"));
console.log(restoreIpAddresses("101023"));