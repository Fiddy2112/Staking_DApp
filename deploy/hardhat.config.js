require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
};

// Staking https://sepolia.etherscan.io/address/0xe425FC2C8509933F34B18a1C51F760A3Ed8DFa09#code

// USDT https://sepolia.etherscan.io/address/0x3cc26036Ba29439C62001456eDAEcE8bC3a22db8#code

// FaucetToken https://sepolia.etherscan.io/address/0xB01AE3A7Bd9075E063C8FEdD436A8Fd5e05a7e31#code
