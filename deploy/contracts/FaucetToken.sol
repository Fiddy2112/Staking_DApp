// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FaucetToken is Ownable {
    ERC20 public token;
    uint256 public faucetAmount;
    uint256 public lastClaimTime;
    uint256 public claimCooldown =24 hours; // frefesh token 1 day

    mapping(address => uint256) public lastClaimed;

    constructor(ERC20 _token, uint256 _faucetAmount) Ownable(msg.sender){
        require(_faucetAmount > 0, "Cannot be lower than zero");
        token = _token;
        faucetAmount = _faucetAmount;
    }

    function claimTokens() external{
        require(block.timestamp >= lastClaimed[msg.sender] + claimCooldown,"You must wait before claiming again.");
        require(token.balanceOf(address(this)) >= faucetAmount, "Insufficient balance in faucet.");

        // approve token for user
        token.transfer(msg.sender, faucetAmount);
        
        // update time
        lastClaimed[msg.sender] = block.timestamp;
    }

    function updateFaucetAmount (uint256 _faucetAmount) external onlyOwner {
        faucetAmount = _faucetAmount;
    }

     function updateClaimCooldown(uint256 _claimCooldown) external onlyOwner {
        claimCooldown = _claimCooldown;
    }

    function withdraw (uint256 amount) external onlyOwner{
        token.transfer(owner(), amount);
    }
}

//# Guide
// Before claim token
// 1. approve send token for address(user)
// 2. mint token to faucetAddress
// 3. faucet now