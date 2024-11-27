const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
// const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Staking Contract", function () {
  let owner, addr1, addr2, staking;
  let tokenA, tokenB;
  const decimal = ethers.BigNumber.from(10).pow(18);

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy tokenA and tokenB (ERC20 tokens)
    const Token = await ethers.getContractFactory("ERC20Mock");
    tokenA = await Token.deploy("TokenA", "TKA", 1000000 * 10 ** 18); // Mint 1 million tokens to contract
    tokenB = await Token.deploy("TokenB", "TKB", 1000000 * 10 ** 18); // Reward token

    // Deploy Staking contract
    const Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy();

    // Transfer some tokens to addr1 and addr2
    await tokenA.transfer(addr1.address, 1000 * 10 ** 18);
    await tokenA.transfer(addr2.address, 1000 * 10 ** 18);

    // Add a staking pool with 10% APY and 30-day lock
    await staking.addPool(tokenA.address, tokenB.address, 10, 30);
  });

  describe("addPool", function () {
    it("should allow the owner to add a new pool", async function () {
      expect(await staking.poolCount()).to.equal(1);
    });

    it("should not allow non-owner to add a new pool", async function () {
      await expect(
        staking.connect(addr1).addPool(tokenA.address, tokenB.address, 10, 30)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("deposit", function () {
    it("should allow user to deposit tokens", async function () {
      const amount = ethers.utils.parseUnits("100", 18);
      await tokenA.connect(addr1).approve(staking.address, amount);

      await staking.connect(addr1).deposit(0, amount);

      const user = await staking.user(0, addr1.address);
      expect(user.amount).to.equal(amount);
    });

    it("should fail if user doesn't have enough balance", async function () {
      const amount = ethers.utils.parseUnits("10000", 18); // more than the balance
      await tokenA.connect(addr1).approve(staking.address, amount);

      await expect(
        staking.connect(addr1).deposit(0, amount)
      ).to.be.revertedWith("Insufficient balance");
    });
  });

  describe("withdraw", function () {
    it("should allow user to withdraw staked tokens after lock period", async function () {
      const depositAmount = ethers.utils.parseUnits("100", 18);
      await tokenA.connect(addr1).approve(staking.address, depositAmount);
      await staking.connect(addr1).deposit(0, depositAmount);

      // Fast forward time to simulate lock period passing
      await network.provider.send("evm_increaseTime", [31 * 24 * 60 * 60]); // 31 days
      await network.provider.send("evm_mine");

      await staking.connect(addr1).withdraw(0, depositAmount);

      const user = await staking.user(0, addr1.address);
      expect(user.amount).to.equal(0);
    });

    it("should fail if user tries to withdraw before lock period", async function () {
      const depositAmount = ethers.utils.parseUnits("100", 18);
      await tokenA.connect(addr1).approve(staking.address, depositAmount);
      await staking.connect(addr1).deposit(0, depositAmount);

      await expect(
        staking.connect(addr1).withdraw(0, depositAmount)
      ).to.be.revertedWith("Tokens are locked");
    });
  });

  describe("claimReward", function () {
    it("should allow user to claim rewards", async function () {
      const depositAmount = ethers.utils.parseUnits("100", 18);
      await tokenA.connect(addr1).approve(staking.address, depositAmount);
      await staking.connect(addr1).deposit(0, depositAmount);

      // Fast forward time to simulate reward accrual
      await network.provider.send("evm_increaseTime", [31 * 24 * 60 * 60]); // 31 days
      await network.provider.send("evm_mine");

      const initialBalance = await tokenB.balanceOf(addr1.address);

      // Claim rewards
      await staking.connect(addr1).claimReward(0);

      const finalBalance = await tokenB.balanceOf(addr1.address);
      expect(finalBalance).to.be.gt(initialBalance); // Check if reward was claimed
    });

    it("should fail if no reward is available", async function () {
      await expect(staking.connect(addr1).claimReward(0)).to.be.revertedWith(
        "No reward claim"
      );
    });
  });

  describe("withdrawStakedTokens", function () {
    it("should allow the owner to withdraw tokens from the contract", async function () {
      const amount = ethers.utils.parseUnits("100", 18);
      await tokenA.connect(addr1).approve(staking.address, amount);
      await staking.connect(addr1).deposit(0, amount);

      const initialBalance = await tokenA.balanceOf(owner.address);

      await staking.withdrawStakedTokens(tokenA.address, amount);

      const finalBalance = await tokenA.balanceOf(owner.address);
      expect(finalBalance).to.be.gt(initialBalance); // Owner balance should increase
    });

    it("should fail if non-owner tries to withdraw", async function () {
      await expect(
        staking.connect(addr1).withdrawStakedTokens(tokenA.address, 100)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
