import { WalletContext } from "@/context/WalletProvider";
import { showAddress } from "@/utils/Features";
import Image from "next/image";
import React, { createContext, useContext } from "react";
import { FaFaucetDrip } from "react-icons/fa6";

const index = () => {
  const { wallet, faucetToken, toastType } = useContext(WalletContext);

  console.log(wallet);
  return (
    <div className="mx-auto max-w-screen-xl h-full">
      <div className="flex gap-4 mt-7">
        <div className="w-1/2">
          <h3 className="text-3xl font-mono">We fund your crypto trades</h3>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <p className="my-2 font-mono text-base text-red-600">
              {" "}
              {toastType ? toastType : ""}
            </p>
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
              <input
                className="w-full outline-none px-2 text-black"
                type="input"
                placeholder={`${wallet ? showAddress(wallet) : "Type address"}`}
              />
              <button
                onClick={faucetToken}
                className="outline-none w-auto h-8 p-2 rounded-md bg-black text-white flex flex-col items-center justify-center"
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
