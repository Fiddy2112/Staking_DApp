import { WalletContext } from "@/context/WalletProvider";
import { showAddress } from "@/utils/Features";
import Image from "next/image";
import React, { createContext, useContext } from "react";
import { FaFaucetDrip } from "react-icons/fa6";

const index = () => {
  const { wallet, faucetToken, addTokenMetamask, transaction } =
    useContext(WalletContext);

  return (
    <div className="mx-auto max-w-screen-xl h-full">
      <div className="flex gap-4 mt-7">
        <div className="w-1/2">
          <h3 className="text-3xl font-mono">We fund your crypto trades</h3>
          <div>
            <div>
              <div>
                <button
                  className="px-4 py-1 rounded-md font-mono text base mt-4 bg-white text-black"
                  onClick={addTokenMetamask}
                >
                  Add token to metamask
                </button>
              </div>
              <div>
                {transaction ? (
                  <a
                    target="_blank"
                    href={`https://sepolia.etherscan.io/tx/${transaction}`}
                  >
                    Transaction
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-end">
          <div className="w-[350px] bg-black p-4 rounded-md flex flex-col justify-center items-center">
            <h3 className="text-xl text-center font-mono uppercase flex items-center gap-2">
              Faucet Token <FaFaucetDrip /> [USDT]
            </h3>
            <Image
              src="/faucets.png"
              className="rounded-md py-4"
              width={250}
              height={200}
            />
            <div className="w-full bg-white flex items-center py-1 px-2 rounded-lg">
              <span className="w-full outline-none px-2 text-black">
                {wallet ? showAddress(wallet) : "Please connect wallet"}
              </span>
              <button
                onClick={faucetToken}
                disabled={wallet ? false : true}
                className={`outline-none w-auto h-8 p-2 rounded-md bg-black text-white flex flex-col items-center justify-center ${
                  wallet ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                Faucet
              </button>
            </div>
            <p className="font-mono text-sm my-2">
              Enter the account address or ENS name where you want to receive
              tokens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
