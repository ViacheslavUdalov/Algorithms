var search = function (nums, target) {
    let left = 0;
    let right = nums.length;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (target === nums[mid]) return true;
        if (nums[left] === nums[mid]) {
            left++;
            continue;
        }
        let leftMid = nums[left] <= nums[mid]; 
        let leftTarget = nums[left] <= target;
        if (leftMid === leftTarget) {
            if (target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (leftMid) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
};

console.log(search([2,5,6,0,0,1,2]))