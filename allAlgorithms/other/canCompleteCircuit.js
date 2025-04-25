var canCompleteCircuit = function (gas, cost) {
    if (gas.reduce((a, b) => a + b, 0) < cost.reduce((a, b) => a + b, 0)) {
        return -1;
    }
    
    let currBank = 0;
    let start = 0;
    
    for (let i = 0; i < gas.length; i++) {
        currBank += gas[i] - cost[i];
        if (currBank < 0) {
            currBank = 0;
            start ++;
        }
    }
    return start;
}
console.log(canCompleteCircuit([2,3,4], [3,4,3]))