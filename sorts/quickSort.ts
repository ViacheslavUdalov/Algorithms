// Порядок работы функции -
// Находится один элемент массива - pivot, относительно которого потом массив делиться
// на две части - в левой части значения меньше pivot, в правой больше,
// и дальше вызываются две функции сортировки, в одну
// попадает первая половина массива, в вторую другая половина. В функции сортировки опять
// находится pivot, по которму потом так же деоится массив и свапаются элементы.

// worst case - O(N2) когда все элементы больше или меньше pivot.
// average and base case - O(NlogN)


function swap(array: number[], a: number, b: number) {
    // функция смены двух элементов
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function quickSort(array: number[]){
    // основная функция сортировки
    const length = array.length;
    quicksort(array, 0, length - 1);
    return array;
}

function quicksort(array: number[], start: number, end: number) {
    // условие выхода из функции
    if (start >= end) {
        return array;
    }

    const index = partition(array, start, end);

    // вызов функции в первой половине.
    quicksort(array, start, index - 1);
    // вызов функции во второй половине.
    quicksort(array, index, end);

    return array;
}

function partition(array: number[], start: number, end: number) {
    let middleValue = array[Math.floor((start + end) / 2)];

    while (start <= end ) {

        // Если текущий элемент с начала массива меньше pivot, то всё окей, идём дальше
        while (array[start] < middleValue) {
            start++;
        }

        // Если текущий элемент с конца массива больше pivot, то всё окей, идём дальше
        while (array[end] > middleValue) {
            end--;
        }

        // Если верхние два условия false свапаем элементы.
        // И соответсвенно сразу увеличиваем индекс левой части и уменьшаем индекс правой части.
        if (start <= end) {
            swap(array, start, end);
            start++;
            end--;
        }
    }
    // Возвращаем как pivot индекс старта. Он показывает где заканчивается левая часть массива.
    return start;
}


// console.log(quicksort([2, 6, 4, 4, 4, 3, 1, 5]))

export default quickSort;