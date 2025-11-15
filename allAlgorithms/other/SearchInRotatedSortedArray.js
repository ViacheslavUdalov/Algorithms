var searchInRotatedSortedArray = function (arr, target) {
        let left = 0;
        let right = arr.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {return mid}
            if (arr[left] < arr[mid]) {
                if (arr[left] <= target && target <= arr[mid] || target === arr[left]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (arr[right] >= target && target >= arr[mid] || target === arr[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

        }
        return -1;

    }
console.log(searchInRotatedSortedArray([3, 1], 1));