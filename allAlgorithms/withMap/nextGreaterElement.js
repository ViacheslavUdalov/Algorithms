var nextGreaterElement = function(nums1, nums2) {
    let ans = [];
    let map = new Map();
    let stack = [];
    for (const num of nums2) {
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }
    for (const num of stack) {
        map.set(num, -1);
    }

    for (const num of nums1) {
        ans.push(map.get(num));
    }
    return ans;
};
console.log(nextGreaterElement([4,1,2], [1,3,4,2]))