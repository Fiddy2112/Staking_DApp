import { WalletContext } from "@/context/WalletProvider";
import React, { useContext, useEffect, useRef, useState } from "react";

const ICOSale = ({ buy, setBuy }) => {
  const { wallet, loadTokenICO, buyToken } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const [tokenDetail, setTokenDetail] = useState();
  const [quentity, setQuentity] = useState(0);

  const buyTokenRef = useRef();

  console.log(buyTokenRef);

  useEffect(() => {
    const loadToken = async () => {
      const token = await loadTokenICO();
      setTokenDetail(token);
      console.log(token);
    };

    loadToken();
  }, [wallet]);

  const buyTokenICO = async (quentity) => {
    setLoading(true);
    const receipt = await buyToken(quentity);
    if (receipt) {
      console.log(receipt);
      window.location.reload();
      setBuy(false);
    }
    setLoading(false);
  };
  return (
    <div
      ref={buyTokenRef}
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        !buy ? "hidden" : "block"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-400/10`}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full top-1/2 left-1/2"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        {/* <!-- Modal content --> */}
        <div className="relative bg-[#0a0a0a] rounded-lg shadow">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-white">
              {tokenDetail?.symbol} ICO Token
            </h3>
            <button
              onClick={() => setBuy(false)}
              type="button"
              className="text-white bg-transparent hover:bg-white hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5 space-y-4">
            <div className="grid grid-rows-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-mono font-semibold pb-2">
                  ICO Supply:{" "}
                  {`${new Intl.NumberFormat("en-US").format(
                    tokenDetail?.supply
                  )} ${tokenDetail?.symbol}`}
                </label>
                <input
                  className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                  type="text"
                  placeholder={`${
                    tokenDetail?.symbol
                  }: ${tokenDetail?.tokenBalance.toString().slice(0, 12)}`}
                  onChange={(e) => setQuentity(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-mono font-semibold pb-2">
                  Amount
                </label>
                <input
                  className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                  type="text"
                  placeholder={`${
                    Number(tokenDetail?.tokenPrice) * quentity
                  } ETH`}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center gap-4 p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              onClick={() => buyTokenICO(quentity)}
              data-modal-hide="default-modal"
              type="button"
              className="font-mono px-4 py-2 rounded-md border border-white text-white bg-black hover:text-black hover:bg-white font-base "
            >
              Buy {tokenDetail?.symbol}
            </button>
            <button
              onClick={() => setBuy(false)}
              data-modal-hide="default-modal"
              type="button"
              className="font-mono px-4 py-2 rounded-md border border-red-700 text-red-700 bg-black hover:text-white hover:bg-red-700/90 font-base "
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICOSale;
