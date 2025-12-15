import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import CoinDetailsPage from "@/components/CoinDetailsPage";
import GeckoTerminal from "@/components/GeckoTerminal";
import Navbar from "@/components/NavBar";
import { mockApps } from "@/data/card";
import { notFound } from "next/navigation";

type ParamsPromise = Promise<{ id: string }>;
type Props = { params: ParamsPromise };

export default async function CoinPage({ params }: Props) {
  const { id } = await params;

  const data = mockApps.find((app) => String(app.id) === String(id));
  if (!data) notFound();

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <div className="px-5 pt-3">
        <Link href="/">
          <button className="font-normal text-text bg-bg border rounded-full w-[7rem] h-[6vh] inline-flex items-center justify-center pr-1 hover:border-gray-400">
            <IoArrowBack className="mr-1" /> Back
          </button>
        </Link>
      </div>

      {/* 2-column layout */}
      <main className="grid grid-cols-1 md:grid-cols-[1fr_480px] gap-6 w-full p-5 pt-4 md:h-[78vh]">
        {/* LEFT: GeckoTerminal */}
        <section className="">
          <GeckoTerminal />
        </section>

        {/* RIGHT: Coin Details */}
        <aside className="h-[80vh] lg:h-full overflow-hidden flex flex-col">
          <div className="h-full overflow-y-auto pr-1">
            <CoinDetailsPage data={data} />
          </div>
        </aside>
      </main>
    </div>
  );
}
