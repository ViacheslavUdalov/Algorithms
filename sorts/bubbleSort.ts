//Сортировка называется устойчивой, если она не меняет порядок равных элементов.

function bubbleSort(array: number[]) {
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

export default bubbleSort;