//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract LendingContract {
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function depositFunds() public payable {
        require(msg.value > 0, "You must send Ether to deposit");
        balances[msg.sender] += msg.value;
    }

    function borrowFunds(uint256 amount) public payable {
        require(amount > 0, "Borrowed amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        payable(msg.sender).transfer(amount);
        balances[msg.sender] -= amount;
    }
}
