function partitionPalindrome(s) {
    let result = [];
    dfs([], 0)
    return result;
    
    function dfs(curr, start) {
        if (start === s.length) {
            result.push([...curr]);
            return;
        }
        for (let end = start + 1; end <= s.length; end++) {
            let sub = s.substring(start, end);
            if (isPalindrome(sub)) {
                curr.push(sub);
                dfs(curr, end);
                curr.pop();
            }
        }
    }
}
function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}