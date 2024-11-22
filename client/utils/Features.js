import { ethers } from "ethers";

export const numberToEth = (amount) => {
  return ethers.utils.parseEther(amount.toString());
};

export const toNumber = (bigNumber) => {
  try {
    return bigNumber.toNumber();
  } catch (err) {
    return Number.parseFloat(ethers.utils.formatEther(bigNumber));
  }
};

export const toEther = (bigNumber) => {
  return Number.parseFloat(ethers.utils.formatEther(bigNumber));
};

export const toWei = (amount) => {
  return ethers.utils.parseUnits(amount.toString());
};

export const showAddress = (address) => {
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 0,
    address.length - 4
  )}`;
};
