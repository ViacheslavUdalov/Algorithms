var findPoisonedDuration = function(timeSeries, duration) {
    let output = 0;
    for (let i = 0; i < timeSeries.length; i++) {
        if (i === timeSeries.length - 1 || timeSeries[i + 1] - timeSeries[i] >= duration) {
            output += duration;
        } else {
            output += timeSeries[i + 1] - timeSeries[i];
        }
    }
    return output;
};
console.log(findPoisonedDuration([1,4], 2))
console.log(findPoisonedDuration([1,2], 2))