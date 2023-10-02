// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./ContractTwo.sol";
contract BridgeTwo {
    ContractTwo public contractTwo;
    address public bridgeTwo;
    mapping(address => uint256) public userDeposits;
    event TokensDeposited(address indexed sender, uint256 amount);
    event TokensWithdrawn(address indexed recipient, uint256 amount);

    constructor(address _contractTwo) {
        contractTwo = ContractTwo(_contractTwo);
    }
    
    function setBridgeOne(address _bridgeTwo) external {
        bridgeTwo = _bridgeTwo;
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(contractTwo.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        userDeposits[msg.sender] += amount;
        emit TokensDeposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(bridgeTwo != address(0), "bridge Two address not set");
        require(userDeposits[msg.sender] >= amount, "Insufficient balance");
        userDeposits[msg.sender] -= amount;
        require(contractTwo.transfer(msg.sender, amount), "Transfer failed");
        emit TokensWithdrawn(msg.sender, amount);
    }
}
