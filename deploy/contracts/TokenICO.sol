// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenICO is Ownable {
    address public tokenAddress;
    uint256 public tokenSalePrice;
    uint256 public soldTokens;
    uint256 public totalTokensForSale;
    ERC20 public token;

    constructor(address _tokenAddress, uint256 _totalTokensForSale, uint256 _tokenSalePrice) Ownable(msg.sender) {
        tokenAddress = _tokenAddress;
        token = ERC20(_tokenAddress);
        totalTokensForSale = _totalTokensForSale;
        tokenSalePrice = _tokenSalePrice;
    }

    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress= _tokenAddress;
        token = ERC20(_tokenAddress);
    }

    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner{
        tokenSalePrice = _tokenSalePrice;
    }

    function multiply (uint256 tokenA,uint256 tokenB) internal pure returns(uint256 tokenC){
        tokenC = tokenA * tokenB;
        require(tokenB == 0 || tokenC / tokenB == tokenA, "Overflow error");
    }

    function buyToken (uint256 amount) public payable{
        uint256 value = msg.value;
        uint256 requiredValue = multiply(amount, tokenSalePrice);
        // check balance sender
        require(value == requiredValue, "Insufficient Ether provided for the token purchase");
        // check balance
        require(soldTokens + amount <= totalTokensForSale,"Not enough tokens left to sell");
        // token = ERC20(tokenAddress);
        require(amount <= token.balanceOf(address(this)),"Insufficient Ether provided for the token purchase");
        //  send token
         uint256 decimals = token.decimals();
        require(token.transfer(msg.sender, amount * 10**decimals),"Token transfer failed");
        // transfer token to owner
        payable(owner()).transfer(value);
        // update soldToken
        soldTokens += amount;
    }

    // get info token
    function getTokenDetail()public view returns(string memory name,string memory symbol,uint256 balance,uint256 supply,uint256 tokenPrice, address _tokenAddress){
        return(
             token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress
        );
    }

    // withdraw token from ICO
    function withdrawAllToken()public onlyOwner{
        uint256 balance = token.balanceOf(address(this));
        require(balance >0 ,"No token to withdraw");
        require(token.transfer(owner(),balance),"Token transfer failed");
    }

    //widthdraw token from ICO
    function withdraw()public onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }
}