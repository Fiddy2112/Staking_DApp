import React from "react";
import { FaEthereum } from "react-icons/fa";

const StakingCard = () => {
  return (
    <div className="bg-black rounded-lg p-4">
      <div className="flex items-center justify-between my-4">
        <div className="w-1/2">
          <h3 className="text-2xl font-mono ">Staking</h3>
          <span className="text-sm font-mono">
            Delegate your tokens to a sequencer validator.
          </span>
        </div>
        <div className="">
          <div className="py-2 px-4 bg-[#142E23] text-[#00FF95] font-mono rounded-lg">
            Up to 10% APY
          </div>
        </div>
      </div>
      <div className="py-6 px-4 bg-[#272727] rounded-lg relative">
        <span className="text-sm text-[#A1A1A1]">
          Available tokens to stake
        </span>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-mono font-bold">40.03430</div>
          <div className="py-1 px-2 rounded-lg flex items-center gap-1 bg-[#3D3D3D] text-white">
            <div>
              <FaEthereum />
            </div>
            <div className="font-bold text-sm font-mono">ETH</div>
          </div>
        </div>
        <div className="absolute -bottom-[18%] -right-[2%] w-0 h-0 border-t-[30px] border-t-transparent border-b-[30px] border-b-transparent border-r-[30px] border-r-black rotate-[225deg] rounded-md"></div>
      </div>
    </div>
  );
};

export default StakingCard;
