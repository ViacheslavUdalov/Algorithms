function pow(a, n) {
    if (n === 0) {
        return 1;
    }
    // нечётно
    // на а умножается на обратном ходу рекурсии.
    else if (n % 2 === 1) {
        return pow(a, n - 1) * a
    }
    // чётное
    else {
        return pow(a ** 2, n / 2);
    }
}

console.log(pow(2, 9));