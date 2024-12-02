export function createArray(number) {
    let array = [];
    for (let i = 0; i < number; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}

export function createSortedArray(number) {
    console.log(number)
    return new Array(number).fill(0).map((el, index) => index + 1)
}

export function createSortedReverseArray(array) {
    return array.reverse();
}
