var matrixReshape = function(mat, r, c) {
    let newArr = mat.flat();
    if (newArr.length !== r * c) return mat;
    let res = [];
    for (let i = 0; i < r * c; i += c) {
        res.push(newArr.slice(i, i + c));
    }
    return res;
};
console.log(matrixReshape([[1,2],[3,4]], r = 2, c = 4));
