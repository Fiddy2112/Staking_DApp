import { showAddress } from "@/utils/Features";
import React, { useState } from "react";

const Pool = ({ poolDetail, addPool, setModifyPoolId }) => {
  const [pool, setPool] = useState({
    _depositToken: "",
    _rewardToken: "",
    _apy: "",
    _lockDays: "",
  });
  const poolArray = poolDetail?.poolArray ?? [];
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
                placeholder={`${showAddress(poolDetail?.depositToken.address)}`}
                onChange={(e) =>
                  setPool({ ...pool, _depositToken: e.target.value })
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
                placeholder={`${showAddress(poolDetail?.rewardToken.address)}`}
                onChange={(e) =>
                  setPool({ ...pool, _rewardToken: e.target.value })
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
                placeholder={`10%`}
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
                placeholder={`1 day`}
                onChange={(e) =>
                  setPool({ ...pool, _lockDays: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={createPool}
              className="px-4 py-1 rounded-md text-white bg-black font-mono text-base border border-white"
            >
              Add Pool
            </button>
          </div>
        </div>
        <div>
          <h3 className="font-mono text-2xl text-center py-2">Pool List</h3>
          <div className="grid grid-cols-4">
            {poolArray.map((item, i) => (
              <div key={i} className="p-4 rounded-md border border-white">
                <div>
                  <div>Deposit Address</div>
                  <div>{item?.depositTokenAddress}</div>
                </div>
                <div>
                  <div>Deposit Token</div>
                  <div>{item?.depositToken}</div>
                </div>
                <div>
                  <div>Reward Address</div>
                  <div>{item?.rewardTokenAddress}</div>
                </div>
                <div>
                  <div>Reward Token</div>
                  <div>{item?.rewardToken}</div>
                </div>
                <div>
                  <div>Deposit Amount</div>
                  <div>{item?.depositAmount}</div>
                </div>
                <div>
                  <div>Apy</div>
                  <div>{item?.apy}</div>
                </div>
                <div>
                  <div>Lockdays</div>
                  <div>{item?.lockDays}</div>
                </div>
                <div>
                  <div>Amount</div>
                  <div>{item?.amount}</div>
                </div>
                <div>
                  <div>Last Reward</div>
                  <div>{item?.lastReward}</div>
                </div>
                <div>
                  <div>Lock utils</div>
                  <div>{item?.lockUtil}</div>
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
