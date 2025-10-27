var addStrings = function(num1, num2) {
    let maxLength = Math.max(num1.length, num2.length);
    num1 = num1.padStart(maxLength, "0");
    num2 = num2.padStart(maxLength, "0");
    let index = num1.length - 1;
    let carry = 0;
    let result = '';
    while (index >= 0) {
        let temp = Number(num1[index]) + Number(num2[index]);
        if (carry !== 0) {
            temp += carry;
        }
        carry = Math.floor(temp / 10);
        result = temp % 10 + result;
        index--;
    }
    return carry !== 0 ? carry + result : result;
};
console.log(addStrings("1", "9"))