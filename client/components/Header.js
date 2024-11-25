import React from "react";
import { FaCheck } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex items-center my-7">
      <div className="w-1/2">
        <h3 className="text-4xl font-mono font-medium">
          <strong>Staking</strong> best return on your investment
        </h3>
        <div className="mt-4">
          <button className="outline-0 px-4 py-2 rounded-md bg-white font-semibold text-base text-[#000] font-mono mr-1">
            Buy token
          </button>
          <button className="outline-0 px-4 py-2 rounded-md bg-white font-semibold text-base text-[#000] font-mono ml-1">
            Add token
          </button>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-end">
        <div className="p-4 rounded-md text-center bg-black w-[350px]">
          <h3 className="font-mono text-xl">Token ICO</h3>
          <div className="font-mono text-base">0.001 ETH</div>
          <div>ICO Left: 20.0 Token</div>

          <div className="px-2 py-4">
            <span className="flex items-center gap-2 font-mono">
              <FaCheck className="text-green-500 text-sm" /> 1.1% of the deposit
              amount
            </span>
            <span className="flex items-center gap-2 font-mono">
              <FaCheck className="text-green-500 text-sm" />
              10000000000.0 total supply
            </span>
            <div>
              <span>ICO sale: 10 Token</span>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-blue-700 dark:text-white">
                    Token
                  </span>
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    45%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
