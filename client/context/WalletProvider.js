import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ethers } from "ethers";
import {
  convertTime,
  notifyError,
  notifySuccess,
  parseErrorMsg,
  showAddress,
  toEther,
  toNumb,
} from "@/utils/Features";
import { USDTABI } from "@/utils/USDTABI.";
import { FaucetABI } from "@/utils/FaucetABI";
import { StakingABI } from "@/utils/StakingABI";
import { TokenICOABI } from "@/utils/TokenICOABI";
import { Toaster } from "react-hot-toast";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  // state
  const [wallet, setWallet] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [owner, setOwner] = useState(null);
  const [transaction, setTransaction] = useState(null);

  // ABI & Address
  const addressUSDT = "0x3cc26036Ba29439C62001456eDAEcE8bC3a22db8";
  const contractUSDTABI = USDTABI;

  const addressTokenICO = "0x9B11aF4C04537d295f94d3db1f89672d4Cd173Cf";
  const contractTokenICOABI = TokenICOABI;

  const addressFaucet = "0xB01AE3A7Bd9075E063C8FEdD436A8Fd5e05a7e31";
  const contractFaucetABI = FaucetABI;

  const addressStaking = "0xe425FC2C8509933F34B18a1C51F760A3Ed8DFa09";
  const contractStakingABI = StakingABI;

  const PINATA_IPFS =
    "https://teal-managing-gull-902.mypinata.cloud/ipfs/QmQzMtLoFDM27UdoiFzKNec675uXjprTNbrqqq6AGudayf";

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

        // get owner
        const contract = new ethers.Contract(
          addressUSDT,
          contractUSDTABI,
          signer
        );

        const owner = await contract.owner();
        console.log(owner);
        setOwner(owner);

        if (currentAddress === address) {
          setWallet(address);
          setWalletConnected(true);
        } else {
          console.log("Address mismatch. Please reconnect the wallet.");
          notifyError("Address mismatch. Please reconnect the wallet.");
        }
      } else {
        console.log("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error during reconnecting wallet:", error);
      notifyError("Error during wallet reconnection. Please try again.");
    }
  };

  const getProviderAndSigner = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      return { provider, signer };
    } else {
      throw new Error("Please install MetaMask");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        notifyError("Please install MetaMask!");
        return;
      }
      const { signer } = await getProviderAndSigner();
      const walletAddress = await signer.getAddress();

      const expirationTime = 24; // time cookie
      Cookies.set("walletAddress", walletAddress, {
        expires: expirationTime,
      });
      Cookies.set("walletConnected", true, { expires: expirationTime });

      setWallet(walletAddress);
      setWalletConnected(true);
    } catch (err) {
      console.error("Error during wallet connection:", err);
      notifyError("Error during wallet connection. Please try again.");
    }
  };

  const faucetToken = async () => {
    const amount = ethers.utils.parseEther("1.0");
    try {
      const { signer } = await getProviderAndSigner();
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

        notifyError(
          `You have requested tokens in the last 24 hours. Please wait ${formattedTime} before trying again.`
        );

        return;
      }
      // dont need approve
      // const approveTx = await contract.approve(addressFaucet, amount);
      // console.log("Approve transaction:", approveTx);
      // await approveTx.wait();
      // console.log("Approve successful!");
      // faucet
      const faucetTx = await faucetContract.claimTokens();
      // console.log("Faucet transaction:", faucetTx.hash);
      await faucetTx.wait();
      setTransaction(faucetTx.hash);
      notifySuccess("Faucet successful!");
    } catch (err) {
      console.error("Error during faucet process:", err);
      notifyError("Error during faucet process. Please try again.");
    }
  };

  const tokenERC20 = async (address, userAddress) => {
    try {
      const { signer } = await getProviderAndSigner();
      const contractReader = new ethers.Contract(
        address,
        contractUSDTABI,
        signer
      );
      const token = {
        name: await contractReader.name(),
        symbol: await contractReader.symbol(),
        address: await contractReader.address,
        totalSupply: toEther(await contractReader.totalSupply()),
        balance: toEther(await contractReader.balanceOf(userAddress)),
        contractTokenBalance: toEther(
          await contractReader.balanceOf(addressStaking)
        ),
      };

      return token;
    } catch (err) {
      console.log(err);
      notifyError("Error while fetching token data.");
    }
  };

  const tokenICO = async () => {
    try {
      const contractReader = await tokenICOContract();
      const userAddress = await contractReader.tokenAddress();
      const tokenPrice = await contractReader.tokenSalePrice();
      const totalToken = await contractReader.totalTokensForSale();

      const token = {
        address: userAddress,
        totalSupply: toNumb(totalToken),
        price: toNumb(tokenPrice),
      };

      return token;
    } catch (err) {
      console.log(err);
    }
  };

  const loadTokenICO = async () => {
    try {
      const contract = await tokenICOContract();
      const tokenAddress = await contract.tokenAddress();
      const tokenDetail = await contract.getTokenDetail();
      const contractOwner = await contract.owner();
      const soldTokens = await contract.soldTokens();

      const token = {
        tokenBalance: toNumb(tokenDetail.balance).toString(),
        name: tokenDetail.name,
        symbol: tokenDetail.symbol,
        supply: toNumb(tokenDetail.supply),
        tokenPrice: toNumb(tokenDetail.tokenPrice).toString(),
        tokenAddress: tokenDetail._tokenAddress,
        owner: contractOwner.toLowerCase(),
        soldTokens: soldTokens.toNumber(),
      };
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  const tokenICOContract = async () => {
    const { signer } = await getProviderAndSigner();
    const contractReader = new ethers.Contract(
      addressTokenICO,
      contractTokenICOABI,
      signer
    );

    return contractReader;
  };

  // staking
  const stakingData = async (address) => {
    try {
      const { signer } = await getProviderAndSigner();
      const contractReader = new ethers.Contract(
        addressStaking,
        contractStakingABI,
        signer
      );
      if (address) {
        const notifications = await contractReader.getNotification();
        const owner = await contractReader.owner();
        // promise
        const notificationArray = await Promise.all(
          notifications.map(
            async ({ poolId, amount, user, typeOf, timestamp }) => {
              return {
                poolId: poolId.toNumber(),
                amount: toEther(amount).toNumber(),
                user: user,
                typeOf: typeOf,
                timestamp: convertTime(timestamp),
              };
            }
          )
        );

        let poolArray = [];
        const poolLength = await contractReader.poolCount();
        // const poolToNumber = poolLength.toNumber();
        for (let i = 0; i < poolLength.toNumber(); i++) {
          const pool = await contractReader.pool(i);
          console.log(pool);
          const userInfo = await contractReader.user(i, wallet);
          console.log(userInfo);
          const pending = await contractReader.pendingReward(wallet, i);
          console.log(pending);
          // add pool
          const tokenPoolA = await tokenERC20(pool.depositToken, wallet);
          const tokenPoolB = await tokenERC20(pool.rewardToken, wallet);

          const pools = {
            depositTokenAddress: pool.depositToken,
            rewardTokenAddress: pool.rewardToken,
            depositToken: tokenPoolA,
            rewardToken: tokenPoolB,
            depositAmount: toEther(pool.depositAmount.toString()),
            apy: pool.apy.toString(),
            lockDays: pool.lockDays.toString(),
            // user
            amount: toEther(userInfo.amount.toString()),
            lastReward: toEther(userInfo.lastReward.toString()),
            lockUtil: convertTime(userInfo.lockUtil.toNumber()),
          };

          poolArray.push(pools);
        }
        const totalDepositAmount = poolArray.reduce((total, pool) => {
          return total + parseFloat(pool.depositAmount);
        }, 0);

        const rewardToken = await tokenERC20(addressUSDT, wallet);
        const depositToken = await tokenERC20(addressUSDT, wallet);
        const data = {
          contractOwner: owner,
          contractAddress: wallet,
          notification: notificationArray.reverse(),
          rewardToken: rewardToken,
          depositToken: depositToken,
          poolArray: poolArray,
          totalDepositAmount: totalDepositAmount,
          contractTokenBalance:
            depositToken.contractTokenBalance - totalDepositAmount,
        };
        return data;
      }
    } catch (err) {
      console.log(err);
      return parseErrorMsg(err);
    }
  };

  const deposit = async (poolId, amount) => {
    try {
      notifySuccess("calling contract...");

      const { signer } = await getProviderAndSigner();
      const ercContract = new ethers.Contract(
        addressUSDT,
        contractUSDTABI,
        signer
      );

      const stakingContract = new ethers.Contract(
        addressStaking,
        contractStakingABI,
        signer
      );

      // before deposit
      // should approve staking
      const approve = await ercContract.approve(addressStaking, amount);
      await approve.wait();

      const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
      // gas
      const gasEstimation = await stakingContract.estimateGas.deposit(
        Number(poolId),
        amountInWei
      );

      const stakingTx = await stakingContract.deposit(poolId, amountInWei, {
        gasLimit: gasEstimation,
      });
      const receipt = await stakingTx.wait();
      notifySuccess("Token take successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const withdraw = async (poolId, amount) => {
    try {
      notifySuccess("calling contract...");

      const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(
        addressStaking,
        contractStakingABI,
        signer
      );
      const gasEstimation = await contract.estimateGas.withdraw(
        Number(poolId),
        amountInWei
      );

      const data = await contract.withdraw(Number(poolId), amountInWei, {
        gasLimit: gasEstimation,
      });

      const receipt = await data.wait();
      notifySuccess("Transaction successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const claimReward = async (poolId) => {
    try {
      notifySuccess("calling contract...");
      const { signer } = await getProviderAndSigner();
      s;
      const stakingContract = new ethers.Contract(
        addressStaking,
        contractStakingABI,
        signer
      );

      const gasEstimation = await stakingContract.estimateGas.claimReward(
        Number(poolId)
      );

      const data = await stakingContract.claimReward(Number(poolId), {
        gasLimit: gasEstimation,
      });

      const receipt = await data.wait();
      notifySuccess("Reward claim successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const addPool = async (pool) => {
    try {
      notifySuccess("calling contract...");
      const { _depositToken, _rewardToken, _apy, _lockDays } = pool;
      if (!_depositToken || !_rewardToken || !_apy || !_lockDays) {
        notifyError("Provide all the detail");
        return;
      }
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(
        addressStaking,
        contractStakingABI,
        signer
      );
      const gasEstimation = await contract.estimateGas.addPool(
        _depositToken,
        _rewardToken,
        Number(_apy),
        Number(_lockDays)
      );
      const data = await contract.addPool(
        _depositToken,
        _rewardToken,
        Number(_apy),
        Number(_lockDays),
        {
          gasLimit: gasEstimation,
        }
      );
      const receipt = await data.wait();
      notifySuccess("Pool created successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const modifierPool = async (poolId, apy) => {
    try {
      notifySuccess("calling contract...");
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(
        addressStaking,
        contractStakingABI,
        signer
      );
      const gasEstimation = await contract.estimateGas.modifierPool(
        Number(poolId),
        Number(apy)
      );
      const data = await contract.modifierPool(Number(poolId), Number(apy), {
        gasLimit: gasEstimation,
      });
      const receipt = await data.wait();
      notifySuccess("Modifier pool successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const withdrawStakedTokens = async (tokenData) => {
    try {
      const { token, amount } = tokenData;
      if (!token || !amount) notifyError("Data is missing");
      notifySuccess("calling contract...");
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(
        addressStaking,
        contractStakingABI,
        signer
      );
      const transferAmount = ethers.utils.parseEther(amount);
      const gasEstimation = await contract.gasEstimation.withdrawStakedTokens(
        token,
        transferAmount
      );
      const data = await contract.withdrawStakedTokens(token, transferAmount, {
        gasLimit: gasEstimation,
      });
      const receipt = await data.wait();
      notifySuccess("withdraw staked successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const addTokenMetamask = async () => {
    try {
      const { signer } = await getProviderAndSigner();
      const contract = new ethers.Contract(
        addressUSDT,
        contractUSDTABI,
        signer
      );

      const tokenDecimals = await contract.decimals();
      const tokenAddress = await contract.address;
      const tokenSymbol = await contract.symbol();
      const tokenImage = PINATA_IPFS;

      const addToken = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (addToken) {
        notifySuccess("Token added");
      } else {
        notifyError("Failed to add token");
      }
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const buyToken = async (amount) => {
    try {
      notifySuccess("calling contract ...");
      const contract = await tokenICOContract();

      const tokenDetail = await contract.getTokenDetail();
      const avalableToken = ethers.utils.formatEther(
        tokenDetail.balance.toString()
      );
      if (avalableToken > 1) {
        const price =
          ethers.utils.formatEther(tokenDetail.tokenPrice.toString()) *
          Number(amount);
        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");
        const transaction = await contract.buyToken(Number(amount), {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        const receipt = await transaction.wait();
        notifySuccess("Transaction successfully");
        return receipt;
      } else {
        notifyError("Token balance is lower then expected");
      }
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const withdrawToken = async () => {
    try {
      notifySuccess("calling contract ...");
      const contract = await tokenICOContract();

      const tokenDetail = await contract.getTokenDetail();
      const avalableToken = ethers.utils.formatEther(
        tokenDetail.balance.toString()
      );
      if (avalableToken > 1) {
        const transaction = await contract.withdrawAllToken();

        const receipt = await transaction.wait();
        notifySuccess("Transaction successfully");
        return receipt;
      } else {
        notifyError("Token balance is lower then expected");
      }
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const updateToken = async (_tokenAddress) => {
    try {
      if (!_tokenAddress) return notifyError("Data is missing");
      const contract = await tokenICOContract();

      const gasEstimation = await contract.estimateGas.updateToken(
        _tokenAddress
      );
      const data = await contract.updateToken(_tokenAddress, {
        gasLimit: gasEstimation,
      });
      const receipt = await data.wait();
      notifySuccess("Transaction successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
    }
  };

  const updateTokenSalePrice = async (_tokenSalePrice) => {
    try {
      if (!price) return notifySuccess("Data is missing");
      const contract = await tokenICOContract();
      const payment = ethers.utils.parseUnits(
        _tokenSalePrice.toString(),
        "ether"
      );
      const gasEstimation = await contract.estimateGas.updateTokenSalePrice(
        _tokenSalePrice
      );
      const data = await contract.updateTokenSalePrice(_tokenSalePrice, {
        gasLimit: gasEstimation,
      });
      const receipt = await data.wait();
      notifySuccess("Transaction successfully");
      return receipt;
    } catch (err) {
      console.log(err);
      const errMsg = parseErrorMsg(err);
      notifyError(errMsg);
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
        loadTokenICO,
        deposit,
        withdraw,
        claimReward,
        addPool,
        modifierPool,
        withdrawStakedTokens,
        addTokenMetamask,
        buyToken,
        withdrawToken,
        updateToken,
        updateTokenSalePrice,
        stakingData,
        transaction,
      }}
    >
      {children}
      <Toaster />
    </WalletContext.Provider>
  );
};

export default WalletProvider;
