import { copyPaste, showAddress } from "@/utils/Features";
import React, { useState } from "react";

const Withdraw = ({ poolDetail, claimReward, withdraw }) => {
  const poolArrays = poolDetail?.poolArray ?? [];
  const [amount, setAmount] = useState({});

  const handleChangeValue = (poolId, value) => {
    setAmount((prev) => ({
      ...prev,
      [poolId]: value,
    }));
  };

  const claimToken = async (poolId) => {
    const receipt = await claimReward(poolId);
    if (receipt) {
      window.location.reload();
    }
  };

  const withdrawToken = async (poolId, amount) => {
    const receipt = await withdraw(poolId, amount);
    if (receipt) {
      window.location.reload();
    }
  };
  return (
    <div>
      <div>
        <h3 className="text-2xl font-mono text-center my-4">Staking Reward</h3>
        <div className="grid grid-cols-3 gap-4">
          {poolArrays.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-black text-white text-center"
            >
              <div>
                <p className="flex items-center justify-evenly font-mono text-base">
                  <span>Your Stake:</span>
                  {item.amount} {item.rewardToken.symbol}
                </p>
                <div className="flex items-center justify-evenly font-mono text-base">
                  <span>Lock days:</span>
                  {item?.lockDays} days
                </div>
                <div className="flex items-center justify-evenly font-mono text-base">
                  <span>Reward:</span>
                  {item.rewardToken.contractTokenBalance}{" "}
                  {item.rewardToken.symbol}
                </div>
                <span className="bg-[#dbdbdb] mx-auto w-1/2 h-[1px] my-2 block"></span>
                <ul className="m-0">
                  <li
                    onClick={() => copyPaste(item.depositToken.address)}
                    className="flex items-center justify-evenly font-mono text-base"
                  >
                    <span>{item.depositToken.symbol} &nbsp; &nbsp;</span>
                    {showAddress(item.depositToken.address)}
                  </li>
                  <li className="flex items-center justify-evenly font-mono text-base">
                    <span>{item.rewardToken.symbol} &nbsp; &nbsp;</span>
                    {showAddress(item.rewardToken.address)}
                  </li>
                  <li className="flex items-center justify-evenly font-mono text-base">
                    <span>Current APY &nbsp; &nbsp;</span>
                    {item.apy}%
                  </li>
                  <li className="flex items-center justify-evenly font-mono text-base">
                    <span>Last Reward &nbsp; </span>
                    {item.lastReward}&nbsp;
                    {item.rewardToken.symbol}
                  </li>
                </ul>
                <div>
                  <input
                    type="text"
                    className="my-4 p-2 bg-transparent border border-white text-white text-base font-mono rounded-md"
                    placeholder="Amount"
                    name="amount"
                    value={amount[i] || ""}
                    onChange={(e) => handleChangeValue(i, e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4 justify-center items">
                  <button
                    className={`${
                      i == 0
                        ? "border-[#e74c3c] text-[#e74c3c] "
                        : i == 1
                        ? "border-[#2ecc71] text-[#2ecc71] "
                        : i == 2
                        ? "border-[#1abc9c] text-[#1abc9c] "
                        : ""
                    } px-4 py-1 rounded-md border mt-4 font-mono`}
                    onClick={() => claimToken(i)}
                  >
                    Claim
                  </button>
                  <button
                    className={`${
                      i == 0
                        ? "border-[#d35400] text-[#d35400] "
                        : i == 1
                        ? "border-[#8e44ad] text-[#8e44ad] "
                        : i == 2
                        ? "border-[#f39c12] text-[#f39c12] "
                        : ""
                    } px-4 py-1 rounded-md border mt-4 font-mono`}
                    onClick={() => withdrawToken(i, amount[i])}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
