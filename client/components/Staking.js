import React, { useState } from "react";

const Staking = ({ poolDetail, withdrawStakedTokens }) => {
  const [tokenData, setTokenData] = useState({
    token: "",
    amount: "",
  });

  const withdrawToken = async (tokenData) => {
    console.log(tokenData);
    const receipt = await withdrawStakedTokens(tokenData);
    if (receipt) {
      console.log(receipt);
      window.location.reload();
    }
  };

  return (
    <div className="my-4 bg-black p-4 rounded-md">
      <div>
        <h3 className="font-mono text-2xl text-center py-2">Withdraw</h3>
        <p className="text-center py-2 font-mono">
          Withdraw staking token crypto currency
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-mono font-semibold pb-2">
              Token
            </label>
            <input
              className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
              type="text"
              placeholder="Type token address"
              onChange={(e) => {
                setTokenData({
                  ...tokenData,
                  token: e.targetamount.value,
                });
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-mono font-semibold pb-2">
              Amount
            </label>
            <input
              className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
              type="text"
              placeholder="Type amount"
              onChange={(e) => {
                setTokenData({
                  ...tokenData,
                  amount: e.targetamount.value,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => withdrawToken(tokenData)}
            className="px-4 py-2 border border-white rounded-md text-white font-mono"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Staking;
