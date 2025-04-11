var countAndSay = function (n) {
    if (n === 1) return '1';
    let result = '';
    helper('1', 1)
    return result;

    function helper(curr, index) {
        if (index === n) {
            result = curr;
            return;
        }
        let res = '';
        let startIndex = 1;
        for (let i = 0; i < curr.length; i++) {
            if (curr[i + 1] !== curr[i]) {
                res += startIndex + curr[i];
                startIndex = 0;
            }
            startIndex++;
        }
        index++;
        helper(res, index);
    }
};

console.log(countAndSay(5));