// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Token {
    string public name = "My Hardhat Token";
    string public symbol = "MHT";
    uint public totalSupply = 1000000;
    address public owner;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to Send %s tokens to %s", amount, to);
        require(balances[msg.sender] >= amount, "Not Enough Tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint balance) {
        return balances[account];
    }
}
