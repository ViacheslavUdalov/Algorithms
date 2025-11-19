var distributeCandies = function(candyType) {
    let set = new Set(candyType);
    return set.size > candyType.length / 2 ? Math.floor(candyType.length / 2) : set.size;
};

var distributeCandies1 = function(candyType) {
    let canEat= candyType.length/2;
    let our_set= new Set(candyType);
    let uniqueCount = our_set.size;
    return Math.min(canEat,uniqueCount);
};

console.log(distributeCandies([1,1,2,2,3,3]))
console.log(distributeCandies([1,1,2,3]))
console.log(distributeCandies([6,6,6,6]))