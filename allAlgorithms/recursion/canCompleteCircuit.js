var canCompleteCircuit = function (gas, cost) {
    if (gas.reduce((a, b) => a + b, 0) < cost.reduce((a, b) => a + b, 0)) {
        return -1;
    }
    for (let i = 0; i < gas.length; i++) {
        if (helper(0, i, gas[i])) return i;
    }
    return -1;

    function helper(operations, currIndex, amount) {
        if (operations === gas.length) return true;
        if (amount - cost[currIndex] < 0 || currIndex >= gas.length) {
            return false;
        }
        return  helper(operations + 1, ((currIndex + 1) >= gas.length) ? 0 : currIndex + 1, amount - cost[currIndex] + gas[((currIndex + 1) >= gas.length) ? 0 : currIndex + 1]);
    }
};
console.log(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]))