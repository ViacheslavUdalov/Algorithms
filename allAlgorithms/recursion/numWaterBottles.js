var numWaterBottles = function(numBottles, numExchange) {
    function backtrack(full, result, surpluses) {
        result += full;
        if (full +  surpluses< numExchange) {
            return result;
        }
        let nextFull = Math.floor((full + surpluses) / numExchange);
        surpluses = full > numExchange ? (full + surpluses) % numExchange : 0;
        return backtrack(nextFull, result, surpluses);
    }
    return backtrack(numBottles, 0, 0);
};