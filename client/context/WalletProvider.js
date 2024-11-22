import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ethers } from "ethers";
import { showAddress } from "@/utils/Features";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  // state
  const [wallet, setWallet] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [owner, setOwner] = useState(null);

  // variables
  const [] = useState("");
  const contractAddress = "";
  const contractABI = "";

  useEffect(() => {
    const checkWalletConnection = async () => {
      const isWalletConnected = Cookies.get("walletConnected");

      if (isWalletConnected) {
        const address = Cookies.get("walletAddress");
        if (address) {
          // check wallet
          await reconnectWallet(address);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const reconnectWallet = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const currentAddress = await signer.getAddress();
      if (currentAddress === address) {
        setWallet(address);
        setWalletConnected(true);
        // await loadWalletData(signer, provider, address);
      } else {
        console.log("Address mismatch. Please reconnect the wallet.");
      }
    } catch (error) {
      handleError(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const wallet = await signer.getAddress();
        // save connect wallet in cookie
        const expirationTime = 24; // expired time
        Cookies.set("walletAddress", showAddress(wallet), {
          expires: expirationTime,
        });
        Cookies.set("walletConnected", true, { expires: expirationTime });
        setWallet(wallet);
        setWalletConnected(true);
        const contract = signerOfProvider(contractAddress, contractABI, signer);
        console.log(contract);
        const owner = await contractRead.owner();
        setOwner(owner);
      } else {
        console.log("Please install metamask");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signerOfProvider = (contractAddress, contractABI, providerOrSigner) => {
    const newContract = new ethers.Contract(
      contractAddress,
      contractABI,
      providerOrSigner
    );
    return newContract;
  };

  const disconnectWallet = async () => {
    // remove cookie
    Cookies.remove("walletAddress");
    Cookies.remove("walletConnected");
    // Update status app
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
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
