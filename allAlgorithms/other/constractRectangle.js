var constructRectangle = function (area) {
    let divisor = 1;
    let result = [];
    while (area / divisor >= divisor) {
        if (area % divisor === 0) {
            let data = area / divisor;
            result = [data, divisor];
        }
        divisor++;
    }
    return result;
};
var constructRectangle2 = function(area) {
    let w = Math.floor(Math.sqrt(area));
    while (area % w !== 0) {
        w--;
    }
    return [area / w, w];
};
console.log(constructRectangle(122122))
console.log(constructRectangle2(37))