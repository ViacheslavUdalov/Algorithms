var maxFrequencyElements = function(nums) {
    let map = new Map();
    let maximum = 1;
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1);
            maximum = Math.max(maximum, map.get(nums[i]));
            continue;
        }
        map.set(nums[i], 1);
    }
    for (const value of map.values()) {
        if (value === maximum) {
            result += value;
        }
    }
    return result;
};