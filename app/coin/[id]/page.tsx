import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import CoinDetailsPage from "@/components/CoinDetailsPage";
import GeckoTerminal from "@/components/GeckoTerminal";
import Navbar from "@/components/NavBar";
import { notFound } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { getTokenByAddress } from "@/app/lib/api";

type ParamsPromise = Promise<{ id: string }>;
type Props = { params: ParamsPromise };

export default async function CoinPage({ params }: Props) {
  const { id } = await params;

  // 1. Fetch real data using the address
  const tokenData = await getTokenByAddress(id);

  // 2. Handle invalid address or not found
  if (!tokenData) notFound();

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <div className="flex justify-between px-5 pt-3">
        <Link href="/">
          <button
            className="font-normal text-text bg-bg border rounded-full w-[7rem] h-[6vh]
              inline-flex items-center justify-center gap-1 pr-1 leading-none hover:border-gray-400"
          >
            <IoArrowBack /> Back
          </button>
        </Link>

        {/* 3. Link "Admin" button to BaseScan */}

        <button
          className="font-normal text-text bg-bg border rounded-full w-[7rem] h-[6vh]
              inline-flex items-center justify-center gap-1 leading-none mr-2 hover:border-gray-400"
        >
          Admin <FiArrowUpRight />
        </button>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-[1fr_480px] gap-6 w-full p-5 pt-4 md:h-[78vh]">
        {/* LEFT: GeckoTerminal - Pass the address so the chart works */}
        <section className="">
          <GeckoTerminal />
        </section>

        {/* RIGHT: Coin Details - Pass the full data object */}
        <aside className="h-[80vh] lg:h-full overflow-hidden flex flex-col">
          <div className="h-full overflow-y-auto pr-1 scrollbar-hide">
            <CoinDetailsPage data={tokenData} />
          </div>
        </aside>
      </main>
    </div>
  );
}
