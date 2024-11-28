import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ethers } from "ethers";
import { showAddress } from "@/utils/Features";
import { USDTABI } from "@/utils/USDTABI.";
import { FaucetABI } from "@/utils/FaucetABI";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  // state
  const [wallet, setWallet] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [owner, setOwner] = useState(null);

  // ABI & Address
  const addressUSDT = "0x3cc26036Ba29439C62001456eDAEcE8bC3a22db8";
  const contractUSDTABI = USDTABI;

  const addressFaucet = "0xB01AE3A7Bd9075E063C8FEdD436A8Fd5e05a7e31";
  const contractFaucetABI = FaucetABI;

  useEffect(() => {
    const checkWalletConnection = async () => {
      const isWalletConnected = Cookies.get("walletConnected");

      if (isWalletConnected) {
        const address = Cookies.get("walletAddress");
        if (address) {
          await reconnectWallet(address);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const reconnectWallet = async (address) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
        const currentAddress = await signer.getAddress();

        if (currentAddress === address) {
          setWallet(address);
          setWalletConnected(true);
        } else {
          console.log("Address mismatch. Please reconnect the wallet.");
        }
      } else {
        console.log("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error during reconnecting wallet:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();

        const expirationTime = 24; // time cookie
        Cookies.set("walletAddress", walletAddress, {
          expires: expirationTime,
        });
        Cookies.set("walletConnected", true, { expires: expirationTime });

        setWallet(walletAddress);
        setWalletConnected(true);
      } else {
        console.log("Please install MetaMask");
      }
    } catch (err) {
      console.error("Error during wallet connection:", err);
    }
  };

  const faucetToken = async () => {
    const amount = ethers.utils.parseEther("1.0");
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        // approve address
        const contract = new ethers.Contract(
          addressUSDT,
          contractUSDTABI,
          signer
        );

        // faucet address
        const faucetContract = new ethers.Contract(
          addressFaucet,
          contractFaucetABI,
          signer
        );
        const lastClaimTimeBigNumber = await faucetContract.lastClaimed(wallet);
        const lastClaimTime = lastClaimTimeBigNumber.toNumber();

        const cooldown = await faucetContract.claimCooldown();

        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime - lastClaimTime < cooldown) {
          const remainingTime = cooldown - (currentTime - lastClaimTime);
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;
          const formattedTime = `${hours > 0 ? hours + " hours " : ""}${
            minutes > 0 ? minutes + " minutes " : ""
          }${seconds} seconds`;
          alert(`Please wait ${formattedTime} before claiming again.`);
          return;
        }
        // approve
        const approveTx = await contract.approve(addressFaucet, amount);
        console.log("Approve transaction:", approveTx);
        await approveTx.wait();
        console.log("Approve successful!");
        // faucet
        const faucetTx = await faucetContract.claimTokens();
        console.log("Faucet transaction:", faucetTx);
        await faucetTx.wait();
        console.log("Faucet successful!");
      } else {
        console.log("Please install MetaMask or connect your wallet.");
      }
    } catch (err) {
      console.error("Error during faucet process:", err);
    }
  };

  const disconnectWallet = () => {
    Cookies.remove("walletAddress");
    Cookies.remove("walletConnected");
    setWalletConnected(false);
    setWallet(null);
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
        walletConnected,
        owner,
        faucetToken,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
