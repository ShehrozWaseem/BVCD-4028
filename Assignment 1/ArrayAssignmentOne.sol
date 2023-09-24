// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library ArrayUtils {
    // this function will sort array
    function sort(uint[] storage data) internal {
        uint n = data.length;
        for (uint i = 0; i < n - 1; i++) {
            for (uint j = 0; j < n - i - 1; j++) {
                if (data[j] > data[j + 1]) {
                    (data[j], data[j + 1]) = (data[j + 1], data[j]);
                }
            }
        }
    }

    function removeDuplicates(uint[] storage arr) internal {
        require(arr.length > 1, "Array must have more than one element");

        uint[] memory uniqueArray = new uint[](arr.length);
        uint uniqueCount = 0;

        for (uint i = 0; i < arr.length; i++) {
            bool isItemDuplicate = false;
            
            //loop through array to identify unique em as soon we identify break the loop
            for (uint j = 0; j < uniqueCount; j++) {
                if (arr[i] == uniqueArray[j]) {
                    isItemDuplicate = true;
                    break;
                }
            }

            //if duplicated item is not found add to new arr
            if (!isItemDuplicate) {
                uniqueArray[uniqueCount] = arr[i];
                uniqueCount++;
            }
        }

        // clear the original array
        while (arr.length > 0) {
            arr.pop();
        }

        // copy back unique elements to the original array
        for (uint i = 0; i < uniqueCount; i++) {
            arr.push(uniqueArray[i]);
        }
    }


}

contract ArrayManipulation {
    using ArrayUtils for uint[];

    uint[] private data;

    constructor() {
        // Initialize the data array with some values for demonstration purposes
        data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    }

    function sortArray() external{
        data.sort();
    }

    function remArrayDuplicate() external{
        data.removeDuplicates();
    }


    function getData() external view returns (uint[] memory) {
        return data;
    }
}