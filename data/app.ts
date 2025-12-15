// data/apps.ts
import { Activity } from "@/types/activity";
import type { CardData } from "@/types/card";

export const mockApps: CardData[] = [
  {
    id: "crystal-market-0xcrystal",
    position: 1,
    appName: 'Crystal Market',
    authorHandle: '0xcrystal',
    authorAvatar: undefined,
    description:
      'Crystal Market is a prediction protocol that lets users speculate on future on-chain and off-chain events. Traders buy and sell Crystal AppCoins representing outcomes, driving accurate, real-time forecasting markets.',
    stats: [
      { id: 'mktap', label: 'MCAP', value: '558.0k' },
      { id: '24h', label: '24h', value: '18.1k' },
      { id: '24h△', label: '24h△', value: '+15.26%' },
    ],
    totalEthRaised: '18 ETH',
  },
  {
    id: "echo-swap-0xechoswap",
    position: 2,
    appName: 'EchoSwap',
    authorHandle: '0xechoswap',
    authorAvatar: undefined,
    description:
      'EchoSwap enables instant conversions between AppCoins with optimized routing and near-zero slippage. Built for speed and simplicity, it powers seamless liquidity across the AppCoin ecosystem.',
    stats: [
      { id: 'mktcap', label: 'MCAP', value: '312.8k' },
      { id: '24h', label: '24h', value: '11.2k' },
      { id: '24h△', label: '24h△', value: '-1.88%' },
    ],
    totalEthRaised: '11 ETH',
  },
  {
    id: "lens-mall-0xlensmall",
    position: 3,
    appName: 'LensMall',
    authorHandle: '0xlensmall',
    authorAvatar: undefined,
    description:
      'LensMall is a creator-focused marketplace enabling seamless trading of social tokens and AppCoins across the Lens ecosystem. It empowers creators with new monetization rails and community ownership.',
    stats: [
      { id: 'mktcap', label: 'MCAP', value: '158.5k' },
      { id: '24h', label: '24h', value: '7.8k' },
      { id: '24h△', label: '24h△', value: '+2.56%' },
    ],
    totalEthRaised: '6 ETH',
  }
];

export const mockActivities: Activity[] = [
  {
    id: "tx-1",
    user: "strivn",
    status: "buy",
    amountShort: "7.1m",
    price: "$0.49",
    timeAgo: "11h",
  },
  {
    id: "tx-2",
    user: "strivn",
    status: "sell",
    amountShort: "7.1m",
    price: "$0.50",
    timeAgo: "11h",
  },
  {
    id: "tx-3",
    user: "ratpick",
    status: "buy",
    amountShort: "14m",
    price: "$0.41",
    timeAgo: "11h",
  },
];