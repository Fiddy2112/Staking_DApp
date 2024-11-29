// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");

module.exports = buildModule("TokenICOModule", (m) => {
  const tokenAddress = m.getParameter(
    "_tokenAddress",
    "0x3cc26036Ba29439C62001456eDAEcE8bC3a22db8"
  );
  const totalTokenForSale = m.getParameter(
    "_totalTokensForSale",
    "200000000000000000000000" //200000
  );
  const tokenSalePrice = m.getParameter(
    "_tokenSalePrice",
    "10000000000000000" //0.01
  );

  console.log("totalTokenForSale:", totalTokenForSale.toString());
  console.log("tokenSalePrice:", tokenSalePrice.toString());
  const tokenICO = m.contract("TokenICO", [
    tokenAddress,
    totalTokenForSale,
    tokenSalePrice,
  ]);
  return { tokenICO };
});
