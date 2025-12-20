// data/apps.ts
import type { CardData } from "@/types/card";

export const mockApps: CardData[] = [
  {
    id: "crystal-market-0xcrystal",
    position: 1,
    appName: 'Crystal Market',
    tokenSymbol: 'CM',
    authorHandle: '0xcrystal',
    authorAvatar: undefined,
    description:
      'Crystal Market is a prediction protocol that lets users speculate on future on-chain and off-chain events. Traders buy and sell Crystal AppCoins representing outcomes, driving accurate, real-time forecasting markets.',
    stats: [
      { id: 'mktap', label: 'MCAP', value: '558.0k' },
      { id: '24h', label: '24h', value: '18.1k' },
      { id: '24h△', label: '24h△', value: '+15.26' },
    ],
    totalEthRaised: '18 ETH',
  },
  {
    id: "echo-swap-0xechoswap",
    position: 2,
    appName: 'EchoSwap',
    tokenSymbol: 'ES',
    authorHandle: '0xechoswap',
    authorAvatar: undefined,
    description:
      'EchoSwap enables instant conversions between AppCoins with optimized routing and near-zero slippage. Built for speed and simplicity, it powers seamless liquidity across the AppCoin ecosystem.',
    stats: [
      { id: 'mktcap', label: 'MCAP', value: '312.8k' },
      { id: '24h', label: '24h', value: '11.2k' },
      { id: '24h△', label: '24h△', value: '-1.88' },
    ],
    totalEthRaised: '11 ETH',
  },
  {
    id: "lens-mall-0xlensmall",
    position: 3,
    appName: 'LensMall',
    tokenSymbol: 'LM',
    authorHandle: '0xlensmall',
    authorAvatar: undefined,
    description:
      'LensMall is a creator-focused marketplace enabling seamless trading of social tokens and AppCoins across the Lens ecosystem. It empowers creators with new monetization rails and community ownership.',
    stats: [
      { id: 'mktcap', label: 'MCAP', value: '158.5k' },
      { id: '24h', label: '24h', value: '7.8k' },
      { id: '24h△', label: '24h△', value: '+2.56' },
    ],
    totalEthRaised: '6 ETH',
  },
  {
  id: "oracle-bay-0xoracle",
  position: 4,
  appName: "Oracle Bay",
  tokenSymbol: 'OB',
  authorHandle: "0xoracle",
  authorAvatar: undefined,
  description:
    "Oracle Bay provides decentralized data feeds for AppCoin protocols, aggregating on-chain signals and real-world inputs into reliable, manipulation-resistant price oracles.",
  stats: [
    { id: "mktcap", label: "MCAP", value: "121.4k" },
    { id: "24h", label: "24h", value: "4.9k" },
    { id: "24h△", label: "24h△", value: "+6.42" },
  ],
  totalEthRaised: "4 ETH",
},
{
  id: "vault-flow-0xvaultflow",
  position: 5,
  appName: "VaultFlow",
  tokenSymbol: 'VF',
  authorHandle: "0xvaultflow",
  authorAvatar: undefined,
  description:
    "VaultFlow is a yield automation platform that routes AppCoins through optimized strategies, compounding returns while abstracting away complex DeFi mechanics for users.",
  stats: [
    { id: "mktcap", label: "MCAP", value: "97.6k" },
    { id: "24h", label: "24h", value: "3.1k" },
    { id: "24h△", label: "24h△", value: "+1.03" },
  ],
  totalEthRaised: "3 ETH",
},
{
  id: "signal-hub-0xsignal",
  position: 6,
  appName: "Signal Hub",
  tokenSymbol: 'SH',
  authorHandle: "0xsignal",
  authorAvatar: undefined,
  description:
    "Signal Hub is an analytics dashboard for AppCoins, surfacing real-time metrics, wallet flows, and sentiment indicators to help traders make informed decisions.",
  stats: [
    { id: "mktcap", label: "MCAP", value: "82.9k" },
    { id: "24h", label: "24h", value: "2.6k" },
    { id: "24h△", label: "24h△", value: "-0.74" },
  ],
  totalEthRaised: "2 ETH",
},
{
  id: "mint-square-0xmint",
  position: 7,
  appName: "MintSquare",
  tokenSymbol: 'MS',
  authorHandle: "0xmint",
  authorAvatar: undefined,
  description:
    "MintSquare is a lightweight launchpad for AppCoins, allowing builders to mint, distribute, and bootstrap liquidity for new applications in minutes.",
  stats: [
    { id: "mktcap", label: "MCAP", value: "61.3k" },
    { id: "24h", label: "24h", value: "1.9k" },
    { id: "24h△", label: "24h△", value: "+9.88" },
  ],
  totalEthRaised: "1.5 ETH",
},
{
  id: "atlas-pay-0xatlas",
  position: 8,
  appName: "Atlas Pay",
  tokenSymbol: 'AP',
  authorHandle: "0xatlas",
  authorAvatar: undefined,
  description:
    "Atlas Pay enables fast, low-fee AppCoin payments for apps and creators, offering SDKs that make on-chain payments feel instant and intuitive.",
  stats: [
    { id: "mktcap", label: "MCAP", value: "44.7k" },
    { id: "24h", label: "24h", value: "1.2k" },
    { id: "24h△", label: "24h△", value: "+0.41" },
  ],
  totalEthRaised: "1 ETH",
}

];

