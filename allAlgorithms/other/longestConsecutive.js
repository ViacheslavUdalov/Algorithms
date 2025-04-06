var longestConsecutive = function (nums) {
    let set = new Set(nums);
    let outputNum = 0;
    for (const num of nums) {
        if (!set.has(num - 1)) {
            let y = num;
            let currStreak = 1;
            while (set.has(y + 1)) {
                currStreak++;
                y++;
            }
            outputNum = Math.max(outputNum, currStreak);
        }
    }

    return outputNum;
};
console.log(longestConsecutive([100,4,200,1,3,2]));