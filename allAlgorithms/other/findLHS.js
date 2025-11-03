var findLHS = function(nums) {
   nums.sort((a,b) => a - b)
   let max = 0;
   let curInARow = 1;
   for (let i = 0; i < nums.length; i++) {
      if (nums[i + 1] - nums[i] === 1) {
         let j = i + 1;
         let forward = 1;
         while (nums[j] === nums[j + 1]) {
            forward++;
            j++
         }
         max = Math.max(max, curInARow + forward)
         curInARow = 1;
      }
      else if (nums[i + 1] === nums[i]) {
         curInARow++;
      } else {
         curInARow = 1;
      }
   }
   return max;
};
var findLHS1 = function(nums) {
   nums.sort((a, b) => a - b);
   let j = 0, maxLength = 0;

   for (let i = 0; i < nums.length; i++) {
      while (nums[i] - nums[j] > 1) {
         j++;
      }
      if (nums[i] - nums[j] === 1) {
         maxLength = Math.max(maxLength, i - j + 1);
      }
   }
   return maxLength;
};