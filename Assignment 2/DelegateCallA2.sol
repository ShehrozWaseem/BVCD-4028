// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageContract {
    uint256 public storedValue;

    function setValue(uint256 _newValue) public {
        storedValue = _newValue;
    }
}

contract CallerContract {
    uint256 public initialValue = 5;

    function callSetStorageValue(address _addressOfStorageContract) public {
        // Call the "setValue" function of the storage contract using delegate call
        _addressOfStorageContract.delegatecall(abi.encodeWithSignature("setValue(uint256)", 50));
    }
}
