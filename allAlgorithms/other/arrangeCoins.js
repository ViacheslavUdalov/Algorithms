var arrangeCoins = function(n) {
    let currentStep = 1;
    while (n - currentStep >= 0) {
        n -= currentStep;
        currentStep++;
    }
    return currentStep - 1;
};
console.log(arrangeCoins(8))