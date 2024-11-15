// Генерирует перестановки с неповторяющимися числами.
function generatePermutations(n, m = -1, prefix = []) {
    if (m === -1) {
        m = n
    }
 // m = m ? m !== -1 : n ;
 if (m === 0) {
     console.log(prefix);
     return;
 }
 for (let i = 0; i <= n; i++) {
    if (prefix.includes(i)) {
        continue;
    }
     prefix.push(i);
     generatePermutations(n, m - 1, prefix);
     prefix.pop();
 }
}

console.log(generatePermutations(3))