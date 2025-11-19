var thirdMax = function(nums) {
    let set = new Set(nums.sort((a, b) => b - a))
    let res = Array.from(set.keys())
    return res.length >= 3 ? res[2] : res[0];
};



console.log(thirdMax([3, 2, 1]))
console.log(thirdMax([1, 2]))
console.log(thirdMax([2, 2, 3, 1]))