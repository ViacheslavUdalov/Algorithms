var guessNumber = function(n) {
    if (0 === guess(n)) return n;
    let left = 0;
    let right = n;
    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (guess(mid) > 0) {
            left = mid;
        } else if (guess(mid) < 0) {
            right = mid;
        } else {return mid}
    }
};
function guess(num) {
    return 5;
}