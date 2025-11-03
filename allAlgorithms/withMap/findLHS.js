var findLHS = function(nums) {
    let map = new Map();
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], 1);
        } else {
            map.set(nums[i], map.get(nums[i]) + 1)
        }
    }
    for (const [key, value] of map.entries()) {
        max = Math.max(max, (map.get(key + 1) || map.get(key - 1) || -value) + value)
    }
    return max;
};
console.log(findLHS([1,1,1,1]))