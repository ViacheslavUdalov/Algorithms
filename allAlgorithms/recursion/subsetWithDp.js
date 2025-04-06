var subsetsWithDup = function(nums) {
    nums.sort();
    let result = [];
    helper([], 0);
    return result;

    function helper(curr, i) {
        result.push([...curr]);
        if (i === nums.length) {
            return;
        }
        for (let k = i; k < nums.length; k++) {
            if (k > i && nums[k] === nums[k - 1]) continue;
            curr.push(nums[k]);
            helper(curr, k + 1);
            curr.pop();
        }
    }
};
console.log(subsetsWithDup([1,2,2]));