import { showAddress } from "@/utils/Features";
import React, { useState } from "react";

const Investing = ({ poolDetail, deposit }) => {
  const poolArrays = poolDetail?.poolArray ?? [];
  const [amount, setAmount] = useState({});

  const handleAmountChange = (poolId, value) => {
    setAmount((prev) => ({
      ...prev,
      [poolId]: value,
    }));
  };

  const despositToken = async (poolId, amount) => {
    const receipt = await deposit(poolId, amount);
    if (receipt) {
      window.location.reload();
    }
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {poolArrays?.map((item, i) => (
          <div className="my-4 bg-black p-4 rounded-md" key={i}>
            <h3 className="text-center text-xl font-mono font-semibold">
              {i == 0
                ? "Maximum"
                : i == 1
                ? "Standard"
                : i == 2
                ? "Lite"
                : "Advanced"}
            </h3>
            <div className="text-center font-mono text-base">
              <p>{item?.lockDays}Days</p>
              <div>
                <div>
                  Deposited: {item?.amount} {item?.depositToken.symbol}
                </div>
                <div>
                  Reward: {showAddress(item?.rewardTokenAddress)}
                  {item?.depositToken.symbol}
                </div>
              </div>
            </div>
            <span className="mx-auto w-1/2 h-[1px] bg-white block my-4"></span>
            <div className="text-center flex flex-col gap-4 justify-center items-center">
              <div>
                {item?.depositToken.symbol} :{" "}
                {showAddress(item?.depositToken.address)}
              </div>

              <div>
                {item?.rewardToken.symbol} :{" "}
                {showAddress(item?.rewardToken.address)}
              </div>

              <div>Current APY : {item?.apy}%</div>
            </div>
            <div className="flex justify-center items-center mt-4">
              <input
                className="w-1/2 outline-none bg-transparent border border-white rounded-md font-mono p-2"
                type="text"
                placeholder={`${item.depositAmount} ${item?.depositToken.symbol}`}
                disabled
              />
            </div>
            <div className="flex flex-col items-center mx-auto gap-2 justify-center w-1/2 mt-4">
              <label>Total Deposit Amount</label>
              <div className="flex items-center border border-white rounded-md font-mono p-2">
                <input
                  className="w-full outline-none bg-transparent"
                  type="text"
                  placeholder="Amount"
                  value={amount[i] || ""}
                  onChange={(e) => handleAmountChange(i, e.target.value)}
                />
                <div>
                  <button
                    onClick={() => despositToken(i, amount[i])}
                    className="outline-none font-mono text-sm p-1 rounded-md bg-white text-black"
                  >
                    Invest
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Investing;
