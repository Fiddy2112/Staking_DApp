import {
  AdminCard,
  ICOToken,
  Investing,
  Pool,
  Staking,
  StakingCard,
  Token,
  Transfer,
} from "@/components";
import ICOSale from "@/components/ICOSale";
import UpdateAPY from "@/components/UpdateAPY";
import { WalletContext } from "@/context/WalletProvider";
import React, { useContext, useEffect, useState } from "react";

const index = () => {
  const {
    stakingData,
    wallet,
    addPool,
    withdrawStakedTokens,
    loadTokenICO,
    updateToken,
    withdrawToken,
    updateTokenSalePrice,
    modifierPool,
  } = useContext(WalletContext);
  const [poolDetail, setPoolDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [modifyPoolId, setModifyPoolId] = useState();
  const [modal, setModal] = useState(false);
  const [buy, setBuy] = useState(false);

  const LoadData = async () => {
    if (wallet) {
      setLoading(true);
      const data = await stakingData(wallet);
      setPoolDetail(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadData();
  }, [wallet]);
  return (
    <div className="mx-auto max-w-screen-xl my-4">
      <div>
        <div>
          {!loading ? (
            <div className="">
              <div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="font-mono text-2xl text-center py-2">
                      Pool Detail
                    </h1>
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
                  </div>
                  <div>
                    <h3 className="font-mono text-2xl text-center py-2">
                      Total
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <AdminCard
                        name={`Total Stake`}
                        value={`${new Intl.NumberFormat("en-US").format(
                          poolDetail?.totalDepositAmount
                        )} ${poolDetail?.depositToken?.symbol}`}
                      />

                      <AdminCard
                        name={`Your Balance`}
                        value={`${new Intl.NumberFormat("en-US").format(
                          poolDetail?.depositToken?.balance
                            ?.toString()
                            .slice(0, 8)
                        )} ${poolDetail?.depositToken?.symbol}`}
                      />
                    </div>
                  </div>
                </div>
                <Token token={poolDetail?.depositToken} />
                <ICOToken
                  loadTokenICO={loadTokenICO}
                  withdrawToken={withdrawToken}
                  updateToken={updateToken}
                  updateTokenSalePrice={updateTokenSalePrice}
                  setBuy={setBuy}
                  buy={buy}
                />

                <ICOSale setBuy={setBuy} buy={buy} />
              </div>
              <Staking
                poolDetail={poolDetail}
                withdrawStakedTokens={withdrawStakedTokens}
              />

              <Pool
                poolDetail={poolDetail}
                addPool={addPool}
                setModifyPoolId={setModifyPoolId}
                setModal={setModal}
                modal={modal}
              />
              <UpdateAPY
                modifierPool={modifierPool}
                setModifyPoolId={setModifyPoolId}
                modifyPoolId={modifyPoolId}
                modal={modal}
                setModal={setModal}
                poolDetail={poolDetail}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center my-2 text-2xl font-mono">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
