export function insertSort(array) {
    for (let i = 1; i < array.length; i++) {
        let inter = i;
        while (inter > 0 && array[inter] < array[inter - 1]) {
            let temp = array[inter];
            array[inter] = array[inter - 1];
            array[inter - 1] = temp;
            inter--;
        }
    }
    return array;
}
