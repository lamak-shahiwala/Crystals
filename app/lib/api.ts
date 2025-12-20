import { CardData } from "@/types/card";
import { Details } from "@/types/details";
import { Tokenomics } from "@/types/tokenomics";
import { Holder } from "@/types/holders";
import { Activity } from "@/types/activity";
import { Leaderboard } from "@/types/leaderboard";

export type TokenSortOption = 
  | "market-cap" 
  | "tx-h24" 
  | "price-percent-h24" 
  | "price-percent-h1" 
  | "deployed-at";

export type SortOption = 
  | "desc"
  | "asc";

export interface RawClankerToken {
  contract_address: string;
  name: string;
  symbol: string;
  img_url: string;
  description: string;
  deployed_at: string;
  msg_sender: string;
  factory_address: string;
  tx_hash: string;
  warnings: string[];
  related?: {
    market?: {
      market_cap?: number; marketCap?: number;
      volume_24h?: number; volume_h24?: number; volume24h?: number;
      price_percent_h1?: number; price_percent_h6?: number;
      price_percent_h24?: number; priceChangeH24?: number;
      holder_count?: number; holderCount?: number;
    };
    user?: { username: string | null; pfp_url: string | null; fid?: number; };
  };
}

export interface CompositeTokenData {
  cardData: CardData;
  tokenomics: Tokenomics;
  details: Details;
  holders: Holder[];
  activities: Activity[];
}

const formatMoney = (n: number | undefined): string => {
  if (n === undefined || n === null || isNaN(n)) return "$0";
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}m`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}k`;
  return `$${n.toFixed(2)}`;
};

// --- Mappers ---

export function mapToLeaderboard(t: RawClankerToken): Leaderboard {
  const market = t.related?.market;
  const user = t.related?.user;
  
  return {
    id: t.contract_address,
    name: t.name || "Unknown",
    symbol: t.symbol || "???",
    image: t.img_url || undefined, 
    creator: {
      handle: user?.username || "anon",
      avatar: user?.pfp_url || undefined, 
      address: t.msg_sender
    },
    priceChange: {
      h1: market?.price_percent_h1 ?? 0,
      h6: market?.price_percent_h6 ?? 0,
      h24: market?.priceChangeH24 ?? market?.price_percent_h24 ?? 0,
    },
    volume: market?.volume24h ?? market?.volume_h24 ?? market?.volume_24h ?? 0,
    marketCap: market?.marketCap ?? market?.market_cap ?? 0
  };
}

export function mapToComposite(t: RawClankerToken, index: number = 0): CompositeTokenData {
  const m = t.related?.market;
  const u = t.related?.user;
  const mcap = m?.marketCap ?? m?.market_cap ?? 0;
  const vol = m?.volume24h ?? m?.volume_h24 ?? m?.volume_24h ?? 0;
  const change = m?.priceChangeH24 ?? m?.price_percent_h24 ?? 0;

  return {
    cardData: {
      id: t.contract_address,
      position: index + 1,
      appName: t.name || "Unknown Token",
      tokenSymbol: t.symbol || "unknown",
      authorHandle: u?.username || t.symbol || "unknown",
      authorAvatar: u?.pfp_url || undefined,
      tokenImage: t.img_url || undefined,
      description: t.description || "No description provided.",
      stats: [
        { id: "mktcap", label: "MCAP", value: formatMoney(mcap) },
        { id: "24h", label: "24h Vol", value: formatMoney(vol) },
        { id: "24h△", label: "24h△", value: `${change > 0 ? "+" : ""}${change.toFixed(2)}%` },
      ],
    },
    tokenomics: {
      devBuy: "0%", vaulted: "100%", unlockDate: "Forever", fullyVested: "Yes",
      holders: m?.holderCount ?? m?.holder_count ?? 0,
      top10Holders: "Unknown",
      warnings: {
        status: t.warnings?.length > 0 ? "warning" : "ok",
        label: t.warnings?.length > 0 ? `${t.warnings.length} Warnings` : "No Issues",
      },
      startingMarketCap: formatMoney(mcap),
    },
    details: {
      interface: "Clanker.world", platform: "Farcaster",
      contractAddress: t.contract_address, creator: t.msg_sender,
      adminAddress: t.factory_address,
      created: t.deployed_at ? new Date(t.deployed_at).toLocaleDateString() : "Unknown",
      castHash: t.tx_hash,
    },
    holders: [], activities: [],
  };
}

export async function getRawTokens(sortBy: TokenSortOption, sort: SortOption = "desc" ): Promise<RawClankerToken[]> {
  try {
    const res = await fetch(
      `https://www.clanker.world/api/tokens?sortBy=${sortBy}&sort=${sort}&limit=20&includeUser=true&includeMarket=true`,
      { next: { revalidate: 60 } } 
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Clanker Fetch Error:", error);
    return [];
  }
}

export async function getTokenByAddress(address: string): Promise<CompositeTokenData | null> {
  if (!address) return null;
  try {
    // We search by the contract address
    const res = await fetch(
      `https://www.clanker.world/api/tokens?q=${address.toLowerCase()}&includeUser=true&includeMarket=true`,
      { next: { revalidate: 60 } }
    );
    
    if (!res.ok) return null;
    
    const json: { data: RawClankerToken[] } = await res.json();
    
    // Find the exact match in the returned array
    const token = json.data.find(
      (t) => t.contract_address.toLowerCase() === address.toLowerCase()
    );
    
    return token ? mapToComposite(token) : null;
  } catch (error) {
    console.error("Clanker Token Fetch Error:", error);
    return null;
  }
}

// ---------------------------------------------------


// import { CardData } from "@/types/card";
// import { Details } from "@/types/details";
// import { Tokenomics } from "@/types/tokenomics";
// import { Holder } from "@/types/holders";
// import { Activity } from "@/types/activity";

// // --- Types & Interfaces ---

// export interface OHLCV {
//   timestamp: number;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
//   volume: number;
// }

// export interface CompositeTokenData {
//   cardData: CardData;
//   tokenomics: Tokenomics;
//   details: Details;
//   holders: Holder[];
//   activities: Activity[];
//   history?: OHLCV[]; // Added for 24h chart data
// }

// export interface GeckoTrendingCoin {
//   item: {
//     id: string;
//     name: string;
//     symbol: string;
//     market_cap_rank: number;
//     large: string;
//     data: {
//       price: string;
//       price_change_percentage_24h: { usd: number };
//       market_cap: string;
//       sparkline: string;
//     };
//   };
// }

// // --- Configuration ---

// const GECKO_API_KEY = process.env.NEXT_PUBLIC_COIN_GECKO_API;
// const GECKO_BASE_URL = "https://api.coingecko.com/api/v3";
// const GECKO_TERMINAL_URL = "https://api.geckoterminal.com/api/v2";

// const getGeckoHeaders = () => {
//   const headers: Record<string, string> = { 'Accept': 'application/json' };
//   if (GECKO_API_KEY) headers['x-cg-demo-api-key'] = GECKO_API_KEY;
//   return headers;
// };

// // --- Utils ---

// const formatMoney = (n: any) => {
//   const num = typeof n === 'string' ? parseFloat(n) : n;
//   if (!num || isNaN(num)) return "—";
//   if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
//   if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
//   return `$${num.toFixed(2)}`;
// };

// const formatPercent = (n: any) => {
//   const num = typeof n === 'string' ? parseFloat(n) : n;
//   if (num === undefined || num === null || isNaN(num)) return "0.00%";
//   return `${num >= 0 ? "+" : ""}${num.toFixed(2)}%`;
// };

// // --- Data Fetching ---

// /**
//  * NEW: Fetches the last 24 hours of OHLCV data for a token on Base
//  * Uses 'minute' timeframe with '15' minute aggregate for a smooth 24h chart
//  */
// export async function getTokenHistory(address: string): Promise<OHLCV[]> {
//   try {
//     // We fetch from the 'day' timeframe for a 24h view, or 'minute' for granularity
//     const res = await fetch(
//       `${GECKO_TERMINAL_URL}/networks/base/tokens/${address.toLowerCase()}/ohlcv/minute?aggregate=15&limit=96`, 
//       { headers: getGeckoHeaders(), next: { revalidate: 300 } }
//     );

//     if (!res.ok) return [];
//     const json = await res.json();
//     const list = json.data?.attributes?.ohlcv_list || [];

//     // GeckoTerminal returns: [timestamp, open, high, low, close, volume]
//     return list.map((item: number[]) => ({
//       timestamp: item[0],
//       open: item[1],
//       high: item[2],
//       low: item[3],
//       close: item[4],
//       volume: item[5],
//     })).reverse(); // Reverse to get chronological order
//   } catch (error) {
//     console.error("History Fetch Error:", error);
//     return [];
//   }
// }

// /**
//  * Enhanced: Fetches single token details including 24h history
//  */
// export async function getTokenByAddress(address: string): Promise<CompositeTokenData | null> {
//   if (!address) return null;
  
//   try {
//     // 1. Fetch Metadata (Clanker) and Market Data (GeckoTerminal)
//     const [clankerRes, geckoRes, history] = await Promise.all([
//       fetch(`https://www.clanker.world/api/tokens?q=${address.toLowerCase()}&includeUser=true&includeMarket=true`),
//       fetch(`${GECKO_TERMINAL_URL}/networks/base/tokens/${address.toLowerCase()}`, { headers: getGeckoHeaders() }),
//       getTokenHistory(address)
//     ]);

//     const clankerJson = await clankerRes.json();
//     const token = clankerJson.data?.find((t: any) => t.contract_address.toLowerCase() === address.toLowerCase());
//     if (!token) return null;

//     const geckoJson = geckoRes.ok ? await geckoRes.json() : null;
//     const composite = mapToHybridComposite(token, 0, geckoJson?.data);
    
//     return { ...composite, history };
//   } catch (error) {
//     console.error("Hybrid Fetch Error:", error);
//     return null;
//   }
// }

// // --- Mappers ---

// function mapToHybridComposite(clankerToken: any, index: number = 0, geckoData: any = null): CompositeTokenData {
//   const market = clankerToken.related?.market || {};
//   const user = clankerToken.related?.user || {};
//   const attr = geckoData?.attributes || {};

//   return {
//     cardData: {
//       id: clankerToken.contract_address,
//       position: index + 1,
//       appName: clankerToken.name || "Unknown",
//       authorHandle: user.username || clankerToken.symbol || "anon",
//       authorAvatar: user.pfp_url || "",
//       tokenImage: clankerToken.img_url || "",
//       description: clankerToken.description || "Created via Clanker.world",
//       stats: [
//         { id: "mktcap", label: "MCAP", value: formatMoney(attr.fdv_usd || market.marketCap) },
//         { id: "24h_vol", label: "24h Vol", value: formatMoney(attr.volume_usd?.h24 || market.volume24h) },
//         { id: "24h_change", label: "24h △", value: formatPercent(attr.price_change_percentage?.h24 || market.priceChangeH24) },
//       ],
//     },
//     tokenomics: {
//       devBuy: "N/A",
//       vaulted: attr.reserve_in_usd ? `Liq: ${formatMoney(attr.reserve_in_usd)}` : "Locked",
//       unlockDate: "Permanent",
//       fullyVested: "Yes",
//       holders: market.holderCount ?? 0,
//       top10Holders: "Check Explorer",
//       warnings: {
//         status: (clankerToken.warnings?.length || 0) > 0 ? "warning" : "ok",
//         label: (clankerToken.warnings?.length || 0) > 0 ? `${clankerToken.warnings.length} Flags` : "Verified",
//       },
//       startingMarketCap: formatMoney(market.marketCap ?? 0),
//     },
//     details: {
//       interface: "Clanker",
//       platform: "Base",
//       contractAddress: clankerToken.contract_address,
//       creator: clankerToken.msg_sender,
//       adminAddress: clankerToken.factory_address,
//       created: clankerToken.deployed_at ? new Date(clankerToken.deployed_at).toLocaleDateString() : "Unknown",
//       castHash: clankerToken.tx_hash,
//     },
//     holders: [],
//     activities: [],
//   };
// }

// export async function getTrendingTokens(): Promise<CardData[]> {
//   const res = await fetch(`${GECKO_BASE_URL}/search/trending`, { headers: getGeckoHeaders() });
//   if (!res.ok) return [];
//   const json = await res.json();
//   return (json.coins as any[]).map((c, i) => ({
//     id: c.item.id,
//     position: i + 1,
//     appName: c.item.name,
//     authorHandle: c.item.symbol,
//     authorAvatar: "",
//     tokenImage: c.item.large,
//     description: `Trending #${i + 1}`,
//     stats: [
//       { id: "mktcap", label: "MCAP", value: c.item.data.market_cap },
//       { id: "24h_change", label: "24h △", value: formatPercent(c.item.data.price_change_percentage_24h.usd) },
//     ],
//   }));
// }

// export async function getTopTokens(): Promise<CardData[]> {
//   const res = await fetch("https://www.clanker.world/api/tokens?sortBy=market-cap&limit=20&includeUser=true&includeMarket=true");
//   const json = await res.json();
//   return (json.data || []).map((t: any, i: number) => mapToHybridComposite(t, i, null).cardData);
// }