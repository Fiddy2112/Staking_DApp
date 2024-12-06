import { copyPaste, notifyError, showAddress } from "@/utils/Features";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

const Pool = ({ poolDetail, addPool, setModifyPoolId, setModal, modal }) => {
  const [pool, setPool] = useState({
    _depositToken: "",
    _rewardToken: "",
    _apy: "",
    _lockDays: "",
  });

  const poolArrays = poolDetail?.poolArray ?? [];
  const createPool = async (pool) => {
    console.log(pool);
    const receipt = await addPool(pool);
    if (receipt) {
      console.log(receipt);
      window.location.reload();
    }
  };
  return (
    <div className="p-4 rounded-md bg-black mt-4">
      <div>
        <div>
          <h3 className="font-mono text-2xl text-center py-2">Add Pool</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-mono font-semibold pb-2">
                Deposit token
              </label>
              <input
                className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                type="text"
                placeholder="Type address"
                onChange={(e) =>
                  setPool({ ...pool, _depositToken: e.target.value.trim() })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-mono font-semibold pb-2">
                Reward token
              </label>
              <input
                className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                type="text"
                placeholder="Type address"
                onChange={(e) =>
                  setPool({ ...pool, _rewardToken: e.target.value.trim() })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-mono font-semibold pb-2">
                Apy
              </label>
              <input
                className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                type="text"
                placeholder="Type Apy"
                onChange={(e) => setPool({ ...pool, _apy: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-mono font-semibold pb-2">
                Lock days
              </label>
              <input
                className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                type="text"
                placeholder="Type days"
                onChange={(e) =>
                  setPool({ ...pool, _lockDays: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => createPool(pool)}
              className="px-4 py-2 rounded-md text-white bg-black font-mono text-base border border-white"
            >
              Add Pool
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-mono text-2xl text-center py-2">Pool List</h3>
          <div className="">
            {poolArrays.map((item, i) => (
              <div key={i} className="p-4 rounded-md border border-white my-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Deposit Address</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-mono text-[#c0392b]">
                        {showAddress(item?.depositTokenAddress)}
                      </div>
                      <div
                        onClick={() => copyPaste(item?.depositTokenAddress)}
                        className="text-basse p-2 border border-white text-white rounded-md cursor-pointer"
                      >
                        <FaCopy />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Reward Address</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-mono text-[#27ae60]">
                        {showAddress(item?.rewardTokenAddress)}
                      </div>
                      <div
                        onClick={() => copyPaste(item?.rewardTokenAddress)}
                        className="text-basse p-2 border border-white text-white rounded-md cursor-pointer"
                      >
                        <FaCopy />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Deposit Amount</div>
                    <div className="text-sm font-mono py-2">
                      {item?.depositAmount} {item?.depositToken?.symbol}
                    </div>
                  </div>
                  <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Apy</div>
                    <div className="text-sm font-mono py-2">{item?.apy}%</div>
                  </div>
                  <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Lockdays</div>
                    <div className="text-sm font-mono py-2">
                      {item?.lockDays} days
                    </div>
                  </div>
                  <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Amount</div>
                    <div className="text-sm font-mono py-2">
                      {item?.amount} {item?.depositToken?.symbol}
                    </div>
                  </div>
                  {/* <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Last Reward</div>
                    <div className="text-sm font-mono">{item?.lastReward}</div>
                  </div> */}
                  {/* <div className="p-2 border border-white rounded-md">
                    <div className="text-base font-mono">Lock utils</div>
                    <div className="text-sm font-mono">{item?.lockUtil}</div>
                  </div> */}
                </div>
                <div className="">
                  <button
                    className="outline-none px-4 py-1 border border-white font-mono rounded-md text-base mt-4"
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                    onClick={() => {
                      setModifyPoolId(i);
                      setModal(!modal);
                    }}
                  >
                    Update APY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
