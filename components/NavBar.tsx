import CreateButton from "./CreateButton";
import ConnectWalletButton from "./ConnectWallet";
import { GiCrystalGrowth } from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b top-0 z-40">
      <div className="w-full mx-auto px-2 sm:px-2 lg:px-4">
        <div className="flex items-center justify-between h-[12vh]">
          {/* Logo / Icon */}
          <Link href={"/"}>
            <div className="flex cursor-pointer gap-2 px-2 items-center">
              <GiCrystalGrowth className="h-12 w-12 text-gray-900 px-2 py-2 border rounded-lg flex items-center justify-center" />
              <span className="hidden md:block text-xl md:text-2xl lg:text-3xl font-title font-bold text-gray-900">
                Crystals
              </span>
            </div>
          </Link>

          {/* Right-side Buttons */}
          <div className="flex items-center gap-3">
            <CreateButton />
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
