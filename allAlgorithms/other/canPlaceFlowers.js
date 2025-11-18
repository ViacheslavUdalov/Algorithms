var canPlaceFlowers = function(flowerbed, n) {
    if (n === 0) return true;
    let result = 0;
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0 && (flowerbed[i - 1] === 0 || !flowerbed[i - 1]) && (flowerbed[i + 1] === 0 || !flowerbed[i + 1])) {
            result++;
            if (result === n) return true;
            flowerbed[i] = 1;
        }

    }
    return false;
};
console.log(canPlaceFlowers([1,0,0,0,1], n = 1))
console.log(canPlaceFlowers([1,0,0,0,1], n = 2))