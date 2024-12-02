function gen(stringOfChars) {
    let map = new Map();

    map.set('}', '{');
    map.set(')', '(');
    map.set(']', '[');
    let stack = [];
    for (let i = 0; i < stringOfChars.length; i++) {

        let char = stringOfChars[i];

        if (map.has(char)) {

            if (stack.length === 0 || stack[stack.length - 1] !== map.get(char)) {
                return false;
            }

            stack.pop();

        } else {
            stack.push(char);
        }
    }

    return stack.length === 0;
}

console.log(gen('{}{}()'));