// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ContractOne.sol";

contract BridgeOne {
    ContractOne public contractOne;
    address public bridgeOne;
    mapping(address => uint256) public userDeposits;
    event TokensDeposited(address indexed sender, uint256 amount);
    event TokensWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _contractOne) {
        contractOne = ContractOne(_contractOne);
    }

    function setBridgeOne(address _bridgeOne) external {
        bridgeOne = _bridgeOne;
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(contractOne.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        userDeposits[msg.sender] += amount;
        emit TokensDeposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(bridgeOne != address(0), "BridgeOne address not set");
        require(userDeposits[msg.sender] >= amount, "Insufficient balance");
        userDeposits[msg.sender] -= amount;
        require(contractOne.transfer(msg.sender, amount), "Transfer failed");
        emit TokensWithdrawn(msg.sender, amount);
    }
}
