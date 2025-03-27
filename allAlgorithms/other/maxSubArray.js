var maxSubArray = function (nums) {
    let sum = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        let right = nums.length;
        while (i < right) {
            sum = Math.max(sum, findSum(nums.slice(i, right)));
            right--;
        }
    }
    function findSum(array) {
        let localSum = 0;
        for (let i = 0; i < array.length; i++) {
            localSum += array[i];
        }
        return localSum;
    }
    return sum;
};
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));