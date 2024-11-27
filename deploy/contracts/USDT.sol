// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDT is ERC20,Ownable,ERC20Burnable {
    uint256 private initialSupply = 50_000_000 * decimals();

    constructor() ERC20("Usdt","USDT") Ownable(msg.sender)  {
    _mint(msg.sender, initialSupply);
    }

    function updateInitalSupply(uint256 _initialSupply) external onlyOwner{
        initialSupply = _initialSupply;
    }

     function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}