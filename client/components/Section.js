import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import StakingCard from "./StakingCard";
import { WalletContext } from "@/context/WalletProvider";
import Withdraw from "./Withdraw";
import Investing from "./Investing";

const Section = () => {
  const { stakingData, wallet, deposit, claimReward, withdraw } =
    useContext(WalletContext);
  const [poolDetail, setPoolDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const LoadData = async () => {
      if (wallet) {
        setLoading(true);
        const data = await stakingData(wallet);
        setPoolDetail(data);
        setLoading(false);
      }
    };

    LoadData();
  }, [wallet]);
  return (
    <div className="mx-auto max-w-screen-xl mt-4">
      <div>
        {/* section top */}
        <div className="flex justify-center flex-col text-center items-center">
          <h3 className="font-mono font-medium text-4xl max-w-[700px] leading-relaxed">
            Revolutionize Your Transactions With Secure Blockchain Solutions
          </h3>
          <p className="text-base font-mono  max-w-[850px] mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <button className="px-6 py-2 text-base font-medium bg-white text-black mt-4 rounded-md">
            Get Started
          </button>
        </div>
      </div>
      <div className="">
        <Header />
      </div>
      {/* staking card */}
      {!loading ? (
        <div className="grid grid-cols-3 gap-4">
          {poolDetail?.poolArray.map((pool, i) => (
            <StakingCard
              key={i}
              apy={`${pool?.apy}%`}
              amount={pool?.amount}
              token={pool?.depositToken?.symbol}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <StakingCard apy={`10%`} amount={"0"} token={"USDT"} />
          <StakingCard apy={`30%`} amount={"0"} token={"USDT"} />
          <StakingCard apy={`60%`} amount={"0"} token={"USDT"} />
        </div>
      )}
      {/* investing */}
      <Investing poolDetail={poolDetail} deposit={deposit} />
      {/* withdraw */}
      <div>
        <Withdraw
          poolDetail={poolDetail}
          withdraw={withdraw}
          claimReward={claimReward}
        />
      </div>

      {/* our partners */}
      <div className="flex justify-center flex-col text-center items-center mt-8">
        <span className="bg-gray-700/40 border border-gray-600 text-white font-mono text-sm p-2 rounded-md">
          Our Partners
        </span>
        <div className="text-2xl font-mono my-4">
          Leading the Way in Crypto Trust with Stak
        </div>
        <div className="">
          <div className="grid grid-cols-6 gap-4">
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image
                  className=""
                  src="/tron.png"
                  width={50}
                  height={50}
                  alt="img_partners"
                />
                Tron
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              Stela
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image
                  className=""
                  src="/okx.png"
                  width={50}
                  height={50}
                  alt="img_partners"
                />
                Okx
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image
                  className=""
                  src="/eth.png"
                  width={50}
                  height={50}
                  alt="img_partners"
                />
                Eth
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image
                  className=""
                  src="/bitc.png"
                  width={50}
                  height={50}
                  alt="img_partners"
                />
                Bitcoin
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image
                  className=""
                  src="/usdt.png"
                  width={50}
                  height={50}
                  alt="img_partners"
                />
                Usdt
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
