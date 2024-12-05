import { WalletContext } from "@/context/WalletProvider";
import { copyPaste } from "@/utils/Features";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

const Header = () => {
  const { wallet, loadTokenICO, stakingData } = useContext(WalletContext);
  const [tokenICo, setTokenICO] = useState(null);
  const [totalPercent, setTotalPercent] = useState(null);

  useEffect(() => {
    const LoadToken = async () => {
      const loadICO = await loadTokenICO();
      setTokenICO(loadICO);
    };

    LoadToken();
  }, []);

  useEffect(() => {
    if (tokenICo) {
      const totalSupply = new Intl.NumberFormat("en-US").format(
        tokenICo?.supply
      );
      const soldTokens = new Intl.NumberFormat("en-US").format(
        tokenICo?.soldTokens
      );
      if (isNaN(totalSupply) || isNaN(soldTokens)) {
        console.error("Invalid totalSupply or soldTokens value");
        return;
      }
      const tokenLeft = totalSupply - soldTokens;
      const percent = (tokenLeft / totalSupply) * 100;
      setTotalPercent(isNaN(percent) ? 0 : Math.floor(percent));
    }
  }, [tokenICo]);
  return (
    <div className="flex items-center my-7 ">
      <div className="w-1/2">
        <h3 className="text-4xl font-mono font-medium">
          <strong>Bring Staking</strong> to Your User Through Our Product
        </h3>
        <div className="mt-4">
          <div className="relative w-[200px] h-[200px] bg-white rounded-md">
            <div className="absolute w-[200px] h-[200px] flex flex-col justify-between z-10 bg-black border border-white rounded-md px-2 py-4 hover:rotate-12 duration-500">
              <div>
                <h3 className="text-2xl font-mono">Live on 10+</h3>
                <p className="text-base font-mono">proof of stake blockchain</p>
              </div>
              <div className="flex items-center justify-between">
                <div
                  onClick={() => copyPaste(wallet)}
                  className="p-2 bg-white text-black rounded-md cursor-pointer"
                >
                  <IoWallet className="text-xl" />
                </div>
                <div className="p-2 bg-white text-black rounded-md">
                  <MdArrowOutward className="text-xl" />
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-end">
        <div className="p-4 rounded-md text-center bg-black w-[350px]">
          <h3 className="font-mono text-xl">Token ICO</h3>
          <div className="font-mono text-base">{`${tokenICo?.tokenPrice} ${tokenICo?.symbol}`}</div>
          <div>
            ICO Left:{" "}
            {`${new Intl.NumberFormat("en-US").format(
              tokenICo?.tokenBalance
            )}  ${tokenICo?.symbol}`}
          </div>

          <div className="px-2 py-4">
            <span className="flex items-center gap-2 font-mono py-2">
              <FaCheck className="text-green-500 text-sm" /> 1.1% of the deposit
              amount
            </span>
            <span className="flex items-center gap-2 font-mono py-2">
              <FaCheck className="text-green-500 text-sm" />
              {new Intl.NumberFormat("en-US").format(tokenICo?.supply)} total
              supply
            </span>
            <div>
              <span>ICO sale: {tokenICo?.soldTokens} Token</span>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-blue-700 dark:text-white">
                    Token
                  </span>
                  <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {totalPercent !== null ? `${totalPercent}%` : "Loading..."}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: totalPercent !== null ? `${totalPercent}%` : "0%",
                    }}
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
