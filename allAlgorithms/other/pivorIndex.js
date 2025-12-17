// не оптимальный
var pivotIndex = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let leftSum = [...nums].splice(0, i).reduce((acc, curr) => {
            return acc += curr;
        }, 0);
        let rightSum = [...nums].splice(i + 1).reduce((acc, curr) => {
            return acc += curr;
        }, 0);
        if (leftSum === rightSum) return i;
    }
    return -1;
};
// оптимальный
var pivotIndex1 = function(nums) {
    let total = nums.reduce((acc, curr) => acc + curr, 0);
    let leftTotal = 0;

    for (let i = 0; i < nums.length; i++) {
        let rightTotal = total - leftTotal - nums[i];

        if (leftTotal === rightTotal) {
            return i;
        }

        leftTotal += nums[i];
    }
    return -1;
}

console.log(pivotIndex1([1, 7, 3, 6, 5, 6]))
console.log(pivotIndex1([1, 2, 3]))
console.log(pivotIndex1([2, 1, -1]))