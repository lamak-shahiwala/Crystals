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
              <GiCrystalGrowth className="h-9 w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 text-gray-900 p-2 border rounded-lg" />
              <span className="hidden md:block text-xl md:text-2xl lg:text-3xl font-title font-bold text-gray-900">
                Crystals
              </span>
            </div>

            {open && (
              <div className="absolute mt-3 left-2 w-48 rounded-xl border bg-bg shadow-lg p-2">
                <a
                  href="https://minidev.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-100 transition"
                >
                  <img src={"/images/minidev.png"} className="h-6 lg:h-8" />{" "}
                  <LuExternalLink />
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
