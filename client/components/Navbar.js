import { WalletContext } from "@/context/WalletProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const { connectWallet, wallet, disconnectWallet, owner, walletConnected } =
    useContext(WalletContext);

  const [admin, setAdmin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (wallet && walletConnected) {
      if (wallet === owner) {
        setAdmin(true);
      } else {
        setAdmin(false);
        router.push("/");
      }
    }
  }, [wallet, owner]);

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="h-[56px] flex items-center justify-between font-mono">
        <div>
          <Link className="text-3xl font-bold" href="/">
            Stak
          </Link>
        </div>
        <div>
          <ul className="flex items-center gap-4">
            <li className="py-1 px-4">
              <Link
                className="font-mono font-base text-gray-50/70 hover:text-white"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="py-1 px-4">
              <Link
                className="font-mono font-base text-gray-50/70 hover:text-white"
                href="/staking"
              >
                Staking
              </Link>
            </li>
            <li className="py-1 px-4">
              <Link
                className="font-mono font-base text-gray-50/70 hover:text-white"
                href="/crypto"
              >
                Crypto
              </Link>
            </li>
            <li className="py-1 px-4">
              <Link
                className="font-mono font-base text-gray-50/70 hover:text-white"
                href="/partners"
              >
                Partners
              </Link>
            </li>
            <li className="py-1 px-4">
              <Link
                className="font-mono font-base text-gray-50/70 hover:text-white"
                href="/faucet"
              >
                Faucet
              </Link>
            </li>

            <li className="py-1 px-4">
              <Link
                className={`font-mono font-base text-gray-50/70 hover:text-white ${
                  admin ? "block" : "hidden"
                }`}
                href="/settings"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {wallet ? (
            <button
              onClick={disconnectWallet}
              className="py-2 px-4 rounded-md border border-white hover:bg-white hover:text-black text-base font-mono"
            >
              Disconnect wallet
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="py-2 px-4 rounded-md border border-white hover:bg-white hover:text-black text-base font-mono"
            >
              Connect wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
