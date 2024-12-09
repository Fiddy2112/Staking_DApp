import { notifyError } from "@/utils/Features";
import React, { useEffect, useState } from "react";

const UpdateAPY = ({
  modifierPool,
  modifyPoolId,
  modal,
  setModal,
  setModifyPoolId,
  poolDetail,
}) => {
  const [apy, setApy] = useState("");

  const currentPool = poolDetail?.poolArray?.[modifyPoolId] || {};

  useEffect(() => {
    if (currentPool?.apy) {
      setApy(currentPool.apy);
    }
  }, [currentPool]);

  const updateToken = async (modifyPoolId, apy) => {
    if (!modifierPool || !apy) {
      notifyError("Provide all the details");
      return;
    }
    try {
      const receipt = await modifierPool(modifyPoolId, apy);
      if (receipt) {
        console.log("Updated successfully");
        window.location.reload();
      } else {
        notifyError("Failed to update APY");
      }
    } catch (error) {
      console.error("Error updating APY:", error);
      notifyError("An error occurred while updating APY");
    }
  };
  return (
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        !modal ? "hidden" : "block"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-400/10`}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full top-1/2 left-1/2"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        {/* <!-- Modal content --> */}
        <div className="relative bg-[#0a0a0a] rounded-lg shadow">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-white">
              ModifierPool #{modifyPoolId}
            </h3>
            <button
              onClick={() => setModal(false)}
              type="button"
              className="text-white bg-transparent hover:bg-white hover:text-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5 space-y-4">
            <div className="grid grid-rows-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-mono font-semibold pb-2">
                  Pool Id
                </label>
                <input
                  className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                  type="text"
                  placeholder={`${modifyPoolId}`}
                  value={modifyPoolId}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-mono font-semibold pb-2">
                  Apy
                </label>
                <input
                  className="p-2 outline-none border border-white text-base font-mono text-white bg-black rounded-md"
                  type="text"
                  placeholder="Type APY"
                  value={apy || currentPool.apy}
                  onChange={(e) => setApy(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center gap-4 p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              onClick={() => updateToken(modifyPoolId, apy)}
              data-modal-hide="default-modal"
              type="button"
              className="font-mono px-4 py-2 rounded-md border border-white text-white bg-black hover:text-black hover:bg-white font-base "
            >
              Update token
            </button>
            <button
              onClick={() => setModal(false)}
              data-modal-hide="default-modal"
              type="button"
              className="font-mono px-4 py-2 rounded-md border border-red-700 text-red-700 bg-black hover:text-white hover:bg-red-700/90 font-base "
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAPY;
