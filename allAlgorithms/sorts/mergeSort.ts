// Устойчивая сортировка - не меняет порядок равных элементов

// Массив разбивается так же на две части рекурсивно и потом каждый элемент из двух массивов
// сравнивается и добавляется в третий.

// Сначала создаём функцию помошник, которая будет мержить два отсоритваронных массива.

// all cases - O(NlogN)


function mergeHelper(firstArray: number[], secondArray: number[]) {
    let resultArray = [];
    while (firstArray.length && secondArray.length) {
        if (firstArray[0] < secondArray[0]) {
            resultArray.push(firstArray.shift());
        } else {
            resultArray.push(secondArray.shift());
        }
    }
    // возвращаем деструктуризацией данные, если по какому-то массиву прошлись,
    // то тот, который остался просто копируется в результат
    return [...resultArray, ...firstArray, ...secondArray];
}

function mergeSort(array: number[]) {
    if (array.length <= 1) return array;

    let mid = Math.floor(array.length / 2);

// slice - делает копию массива от индекса до следующего индекса. Не меняет текущий массив.
    // @ts-ignore
    let leftArray: number[] = mergeSort(array.slice(0, mid));
    // @ts-ignore
    let rightArray: number[] = mergeSort(array.slice(mid));

// мержит два отсортированных массива - когда функция уйдёт в самую глубь рекурсии,
// начнёт мержить по одному элементу, потом по два итд. И будет выходить из рекурсии
    return mergeHelper(leftArray, rightArray);
}

// console.log(mergeSort([5, 4, 6, 5, 3, 4, 3, 2, 1]));

export default mergeSort;
