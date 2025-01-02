function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Нод не изменяется если большее число заменить на остаток от деления на меньшее.
console.log(gcd(50, 20))

function gcdWithRecursion(a, b) {
    if (b === 0) {
        return a
    }
    return gcdWithRecursion(b, a % b);
}

console.log(gcdWithRecursion(50, 20))