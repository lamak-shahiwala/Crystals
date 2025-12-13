"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export default function ConnectWalletButton() {
  const { login, logout, user, ready } = usePrivy();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!ready) return null;

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className="px-4 py-2 border h-[6.75vh] md:h-[8vh] rounded-full
                   flex items-center justify-center text-center
                   hover:border-gray-400 hover:cursor-pointer"
      >
        {/* Desktop */}
        <div className="hidden md:block">
          {!user ? (
            <button onClick={login}>Connect Wallet</button>
          ) : (
            <button onClick={handleLogoutClick}>Logout</button>
          )}
        </div>

        {/* Mobile */}
        <div className="block md:hidden">
          {!user ? (
            <button onClick={login}>Connect</button>
          ) : (
            <button onClick={handleLogoutClick}>Logout</button>
          )}
        </div>
      </div>

      {/* CONFIRMATION POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

            <div className="flex justify-between">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#28a84d] w-1/2 mr-2"
              >
                Yes
              </button>

              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-1/2 ml-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
