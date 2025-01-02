// наибольшая возрастающая подпоследовательность
function gis(a) {
    let resArray = Array.from({length: a.length}).fill(0);
    for (let i = 1; i < a.length; i++) {
        let max = 0;
        for (let j = 0; j < i; j++) {
            if (a[i] > a[j] && resArray[j] > max) {
                max = resArray[j];
            }
        }
        resArray[i] = max + 1;
    }
    return Math.max.apply(null, resArray);
}

console.log(gis([1, 2, 3, 1, 1, 1]));