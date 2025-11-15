var rob = function(nums) {
    let memo = new Map();
    function robFrom(i) {
        if (i < 0) return 0;
        if (i === 0) return nums[0];
        if (memo.has(i)) {
            return memo.get(i);
        }
        const res = Math.max(robFrom(i - 1), robFrom(i - 2) + nums[i]);
        memo.set(i, res);
        return res;
    }
    return robFrom(nums.length - 1);
};
console.log(rob([2,7,9,3,1]))