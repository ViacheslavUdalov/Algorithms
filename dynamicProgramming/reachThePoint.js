// функция выполняет - от стартовой точки нужно достичь финальную точку, имея возможность прыжка 1 и 2,
// в парамметрах есть число финальной финальной точки, а так же массив с запрещёнными индексами,
// куда нельзя прыгать. Нужно вернуть количество возможных вариаций прыжков до точки, то есть перестановок.

// Динамическое программирование - рекурсия наоборот
function reachThePoint(finalPoint, allowed) {
    let arrayForPermutations = Array(finalPoint + 1).fill(0);
    arrayForPermutations[0] = 1;

    if (allowed[1]) arrayForPermutations[1] = 1;
    if (allowed[2]) arrayForPermutations[2] = 1;

    for (let i = 3; i <= finalPoint; i++) {
        if (allowed[i]) {
            arrayForPermutations[i] = arrayForPermutations[i - 1] + arrayForPermutations[i - 2] + arrayForPermutations[i - 3];

        }
    }
    return arrayForPermutations[finalPoint];
}

console.log(reachThePoint(5, [true, true, false, true, true, true]));