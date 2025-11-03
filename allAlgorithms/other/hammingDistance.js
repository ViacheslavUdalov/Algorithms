var hammingDistance = function(x, y) {
    let xLen  = (x >>> 0).toString(2)
    let yLen  = (y >>> 0).toString(2)
    let result = 0;
    let maxLength = Math.max(xLen.length, yLen.length)
    xLen = xLen.padStart(maxLength, "0");
    yLen = yLen.padStart(maxLength, "0");
    for (let i = 0; i < maxLength; i++) {
        if (xLen[i] !== yLen[i]) {
            result++;
        }
    }
    return result
};