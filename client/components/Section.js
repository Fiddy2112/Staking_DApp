import Image from "next/image";
import React from "react";
import StakingCard from "./StakingCard";
import Header from "./Header";

const Section = () => {
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
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StakingCard apy={"50%"} amount={"20.0"} token={"ETH"} />
        <StakingCard apy={"100%"} amount={"100.0"} token={"ETH"} />
        <StakingCard apy={"200%"} amount={"200.0"} token={"ETH"} />
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
                <Image className="" src="/tron.png" width={50} height={50} />
                Tron
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              Stela
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image className="" src="/okx.png" width={50} height={50} />
                Okx
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image className="" src="/eth.png" width={50} height={50} />
                Eth
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image className="" src="/bitc.png" width={50} height={50} />
                Bitcoin
              </div>
            </div>
            <div className="p-4 rounded-md bg-white text-black text-center font-semibold uppercase text-xl w-[165px] h-[85px] flex items-center  justify-center hover:scale-105">
              <div className="flex items-center gap-2">
                <Image className="" src="/usdt.png" width={50} height={50} />
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
