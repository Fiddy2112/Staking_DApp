import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

export const numberToEth = (amount) => {
  return ethers.utils.parseEther(amount.toString());
};

export const getContract = async (addressContract, abi) => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(addressContract, abi, signer);
      return contract;
    } else {
      console.log("Please install metamask");
    }
  } catch (err) {
    console.log(err);
  }
};

export const toNumb = (bigNumber) => {
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

export const parseErrorMsg = (msg) => {
  const json = JSON.stringify(msg);
  return json?.reason || json?.error?.message;
};

export const convertTime = (timestamp) => {
  if (timestamp === 0 || !timestamp) {
    return "No time set";
  }
  const date = new Date(timestamp * 1000);
  const readableTime = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return readableTime;
};

export const copyPaste = (text) => {
  navigator.clipboard.writeText(text);
  notifySuccess("Copy Successfully");
};

export const notifySuccess = (msg) => toast.success(msg, { duration: 3000 });
export const notifyError = (msg) => toast.error(msg, { duration: 3000 });
