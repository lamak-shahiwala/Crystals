import Navbar from "@/components/NavBar";
import { getRawTokens, mapToLeaderboard } from "../lib/api";
import LeaderboardClient from "./LeaderboardClient";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import Footer from "@/components/Footer";

export default async function LeaderboardPage() {
  const [volRaw, mcapRaw, recentRaw] = await Promise.all([
    getRawTokens("tx-h24"),
    getRawTokens("market-cap"),
    getRawTokens("deployed-at"),
  ]);

  const initialData = {
    "tx-h24": volRaw.map(mapToLeaderboard),
    "market-cap": mcapRaw.map(mapToLeaderboard),
    "deployed-at": recentRaw.map(mapToLeaderboard),
  };

  return (
    <div className="min-h-screen bg-bg antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <button className="group flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-bg-secondary hover:border-text-subtle transition-all">
              <IoArrowBack className="text-lg transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </button>
          </Link>

          {/* Empty div to keep the title centered or for future actions */}
          <div className="w-[88px] hidden sm:block" />
        </div>

        {/* The Leaderboard Container */}
        <div className="relative border border-border rounded-[2.5rem] lg:rounded-[3rem] bg-bg shadow-sm overflow-hidden">
          <div className="p-4 sm:p-8">
            <LeaderboardClient initialData={initialData} />
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-10" />
        <Footer />
      </main>
    </div>
  );
}
