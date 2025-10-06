var largestRectangleArea = function (heights) {
    let maxArea = 0;
    let stack = [];
    for (let i = 0; i <= heights.length; i++) {
        let curr = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > curr) {
        let height = heights[stack.pop()];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, width * height);
    }
    stack.push(i);
    }
    return maxArea;
};
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]))
console.log(largestRectangleArea([6, 5, 4, 3, 2, 1]))