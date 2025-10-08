var maximalRectangle = function(matrix) {
    let maxValue = 0;
    let stack = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j <= matrix[0].length; j++) {
            let currheight = j === matrix[0].length ? 0 : countHeight(i, j);
            while (
                stack.length &&
                countHeight(i, stack[stack.length - 1]) > currheight
                ) {
                const height = countHeight(i, stack.pop());
                const width = stack.length === 0 ? j : j - stack[stack.length - 1] - 1;
                maxValue = Math.max(maxValue, height * width);
            }
            stack.push(j);
        }
        stack = [];
    }

    function countHeight(i, j) {
        let curr = matrix[i][j] === '1' ? 1 : 0;
        while (matrix[i - 1] && matrix[i][j] === "1" && matrix[i - 1][j] === "1") {
            curr += 1;
            i--;
        }
        return curr;
    }

    return maxValue;
}