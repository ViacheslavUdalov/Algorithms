var permuteUnique = function (nums) {
    const answer = [];
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1);
        } else {
            map.set(nums[i], 1);
        }
    }
    helper([], map);
    function helper(curr, map) {
        if (curr.length === nums.length) {
            answer.push(curr);
            return;
        }
        for (const [key, value] of map.entries()) {
            if (value === 0) continue;
            map.set(key, value - 1);
            helper([...curr, key], map);
            map.set(key, map.get(key) + 1);
        }
    }
    return answer;
};
console.log(permuteUnique([1, 2, 3]));
