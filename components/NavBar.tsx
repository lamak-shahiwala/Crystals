"use client";

import CreateButton from "./CreateButton";
import ConnectWalletButton from "./ConnectWallet";
import { GiCrystalGrowth } from "react-icons/gi";
import { useDropdown } from "@/hooks/useDropdown";
import { LuExternalLink } from "react-icons/lu";

export default function Navbar() {
  const { ref, open, toggle } = useDropdown<HTMLDivElement>();

  return (
    <nav className="border-b top-0 z-40 relative">
      <div className="w-full mx-auto px-2 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between h-16 lg:h-[12vh]">
          {/* Logo with Dropdown */}
          <div ref={ref} className="relative">
            <div
              onClick={toggle}
              className="flex cursor-pointer gap-2 px-2 items-center"
            >
              <img src={"/images/token_logo.png"} className="h-7 md:h-8" />
              {/* <GiCrystalGrowth className="h-9 w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 text-gray-900 p-2 border rounded-lg" />
              <span className="hidden md:block text-xl md:text-2xl lg:text-3xl font-title font-bold text-gray-900">
                Crystals
              </span> */}
            </div>

            {open && (
              <div
                className="
                  absolute mt-3 left-2 z-50 flex flex-col
                  w-48 md:w-56 
                  p-3 md:p-4 
                  rounded-[2rem] lg:rounded-[2.5rem] 
                  border border-border bg-bg shadow-xl
                "
              >
                <a
                  href="https://minidev.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex justify-between items-center 
                    px-4 py-3 
                    rounded-[1.2rem] lg:rounded-[1.5rem] 
                    text-gray-800 hover:bg-gray-100 transition-colors
                  "
                >
                  <img
                    src={"/images/minidev.png"}
                    className="h-6 lg:h-8"
                    alt="minidev"
                  />
                  <LuExternalLink className="text-gray-400" />
                </a>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <CreateButton />
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
