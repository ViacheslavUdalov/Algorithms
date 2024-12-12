import bubbleSort from "../bubbleSort.js";

describe('bubble sort testing', () => {
    it('should return small sort array', () => {
        const input = [5, 3, 6, 2, 1];
        const returnArray = [1, 2, 3, 5, 6];
        expect(bubbleSort(input)).toEqual(returnArray);
    });
    it('should return array same', () => {
        const input = [1, 2, 3, 5, 6];
        expect(bubbleSort(input)).toEqual(input);
    });
    it('should return array same', () => {
        const input = [5, 3, 6, 2, 1];
        let sortedArray = bubbleSort(input);
        expect(sortedArray[0]).toBeLessThan(sortedArray[sortedArray.length - 1]);
    });
})