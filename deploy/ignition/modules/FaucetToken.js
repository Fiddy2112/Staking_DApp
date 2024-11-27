// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FaucetTokenModule", (m) => {
  const faucet = m.contract("FaucetToken", [
    "0x3cc26036Ba29439C62001456eDAEcE8bC3a22db8",
    1,
  ]);

  return { faucet };
});
