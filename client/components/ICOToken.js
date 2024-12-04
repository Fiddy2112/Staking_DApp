import { notifyError } from "@/utils/Features";
import React, { useEffect, useState } from "react";

const ICOToken = ({
  loadTokenICO,
  withdrawToken,
  updateToken,
  updateTokenSalePrice,
}) => {
  const [tokenDetail, setTokenDetail] = useState("");
  const [updateTokenAddr, setUpdateTokenAddr] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");

  useEffect(() => {
    const loadToken = async () => {
      const tokenICo = await loadTokenICO();
      setTokenDetail(tokenICo);
    };
    loadToken();
  }, []);

  const widthdrawToken = async () => {
    const receipt = await withdrawToken();
    if (receipt) {
      console.log(receipt);
      window.location.reload();
    }
  };

  const updateTokenAddress = async (_tokenAddress) => {
    if (!_tokenAddress) {
      notifyError("Please enter the token address");
      return;
    }
    const receipt = await updateToken(_tokenAddress);
    if (receipt) {
      console.log(receipt);
      window.location.reload();
    }
  };

  const updatePriceSale = async (_tokenSalePrice) => {
    if (!_tokenSalePrice) {
      notifyError("Please enter the token price");
      return;
    }
    const receipt = await updateTokenSalePrice(_tokenSalePrice);
    if (receipt) {
      console.log(receipt);
      window.location.reload();
    }
  };
  return (
    <div className="my-4 bg-black p-4 rounded-md">
      <div>
        <h3 className="font-mono text-2xl text-center py-2">
          Update token ICO price
        </h3>
        <div>
          <div className="my-4">
            <button
              className="px-4 py-2 border border-white rounded-md"
              onClick={widthdrawToken}
            >
              Withdraw
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex flex-col">
                <label className="text-sm font-mono font-semibold pb-2">
                  Update token
                </label>
                <input
                  className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                  type="text"
                  placeholder="Type token address"
                  onChange={(e) => setUpdateTokenAddr(e.target.value)}
                />
              </div>
              <button
                onClick={() => updateTokenAddress(updateTokenAddr)}
                className="mt-4 px-4 py-2 rounded-md border-white border"
              >
                Update token
              </button>
            </div>

            <div>
              <div className="flex flex-col">
                <label className="text-sm font-mono font-semibold pb-2">
                  Update Price Sale
                </label>
                <input
                  className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                  type="text"
                  placeholder="Type amount"
                  onChange={(e) => setUpdatePrice(e.target.value)}
                />
              </div>
              <button
                onClick={() => updatePriceSale(updatePrice)}
                className="mt-4 px-4 py-2 rounded-md border-white border"
              >
                Update price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICOToken;
