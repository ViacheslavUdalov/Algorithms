var merge = function (intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let mergedIntervals = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let lastInterval = mergedIntervals[mergedIntervals.length - 1];
        if (lastInterval[1] < intervals[i][0]) {
            mergedIntervals.push(intervals[i]);
        } else {
            lastInterval[1] = Math.max(lastInterval[1], intervals[i][1]);
        }
    }
    return mergedIntervals;
};
console.log(merge([[1,4],[4,5], [0, 2]]));