function MaxSunArrayEasy(nums) {
    let maxSum = nums[0];
    let currSum = nums[0];
    for (let i = 0; i < nums.length; i++) {
        currSum = Math.max(0, currSum) +  nums[i];
        maxSum = Math.max(currSum, maxSum);
    }
    return maxSum;
};
console.log(MaxSunArrayEasy([-2,1,-3,4,-1,2,1,-5,4]));
