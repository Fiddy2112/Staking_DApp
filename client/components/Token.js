import { copyPaste } from "@/utils/Features";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

const Token = ({ token }) => {
  const [value, setValue] = useState(
    "https://sepolia.etherscan.io/address/0x3cc26036Ba29439C62001456eDAEcE8bC3a22db8"
  );
  return (
    <div className="p-4 rounded-md bg-black mt-4">
      <h3 className="font-mono text-2xl text-center py-2">Explorer Token</h3>
      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-center items-center gap-4 w-1/2 my-2">
          <input
            className="w-full text-white outline-none bg-black rounded-md border border-white p-2"
            type="text"
            defaultValue={value}
          />

          <button
            onClick={() => copyPaste(value)}
            className="p-3 rounded-md border border-white"
          >
            <FaCopy />
          </button>
        </div>
        <p className="my-2 font-mono text-sm">
          Staking token starts Crypto Stak return on your investment
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center justify-between border border-white p-2 rounded-md">
          <div className="font-mono text-base">name</div>
          <div className="font-mono text-sm">{token?.name}</div>
        </div>
        <div className="flex items-center justify-between border border-white p-2 rounded-md">
          <div className="font-mono text-base">Token</div>
          <div className="font-mono text-sm">{token?.symbol}</div>
        </div>
        <div className="flex items-center justify-between border border-white p-2 rounded-md">
          <div className="font-mono text-base">Total Supply</div>
          <div className="font-mono text-sm">
            {new Intl.NumberFormat("en-US").format(token?.totalSupply)}
          </div>
        </div>
        <div className="flex items-center justify-between border border-white p-2 rounded-md">
          <div className="font-mono text-base">Total Stake</div>
          <div className="font-mono text-sm">
            {new Intl.NumberFormat("en-US").format(
              token?.contractTokenBalance
            ) || 0}{" "}
            {token?.symbol}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
