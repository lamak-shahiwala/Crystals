import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/NavBar";
import Section from "@/components/sections/Section";
import { getRawTokens, mapToComposite, mapToLeaderboard } from "./lib/api";
import LeaderboardClient from "./leaderboard/LeaderboardClient";

export default async function Home() {
  // Fetch raw data on the server
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

  // Map raw tokens to CardData using your Composite Mapper
  const volApps = volRaw.map((t, i) => mapToComposite(t, i).cardData);
  const mcapApps = mcapRaw.map((t, i) => mapToComposite(t, i).cardData);
  //const recentApps = recentRaw.map((t, i) => mapToComposite(t, i).cardData);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Header />
        <Section
          title={
            <img
              src="/images/section_title.png"
              className="h-16 lg:h-20 -ml-3 lg:-ml-5"
              alt="Made with Minidev"
            />
          }
          apps={mcapApps}
        />
        <Section title="Top apps in last 24h" apps={volApps} />

        <div className="w-full max-w-7xl px-4 lg:px-6 mb-20 mx-auto">
          <div className="relative border border-border rounded-[2.5rem] lg:rounded-[3rem] bg-bg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-8">
              <LeaderboardClient initialData={initialData} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
