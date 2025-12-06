var findShortestSubArray = function (nums) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i],
                {
                    count: 1,
                    startIndex: i,
                    endIndex: i,
                })
        }
        else {
            map.set(
                nums[i],
                {
                    count: map.get(nums[i]).count + 1,
                    startIndex: map.get(nums[i]).startIndex,
                    endIndex: i,
                }

            )
        }
    }
    let maxIndex = 0;
    result = nums.length;
    for (const [key, value] of map) {
        if (maxIndex < value.count) {
            maxIndex = value.count;
            result = value.endIndex - value.startIndex;
        } else if (maxIndex === value.count) {
            if (result > (value.endIndex - value.startIndex)) {
                result = value.endIndex - value.startIndex;
            }
        }
    }
    return result + 1;
};
console.log(findShortestSubArray([1, 2, 2, 3, 1]))
console.log(findShortestSubArray([1, 2, 2, 3, 1, 4, 2]))
