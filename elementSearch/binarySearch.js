function binarySearch(array, value) {

    let left = 0;
    let right = array.length;

    while (left <= right) {

        let middle =  Math.floor((left + right) / 2);

        if (array[middle] == value) {
            return true;
        }
        else if (array[middle] < value) {
            left = middle + 1;
        } else if (array[middle] > value) {
            right = middle - 1;
        }
    }

    return false;
}

console.log(binarySearch([1, 2, 3, 4, 5, 5, 5, 6], 2))