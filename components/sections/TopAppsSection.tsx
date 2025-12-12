// Section: Top Apps in Last 24 Hours

'use client';

import Card from '../Card';
import type { CardData, Stat } from '@/types/card';

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
      { id: 'txns', label: 'TXNS', value: '213' },
      { id: 'vol', label: 'VOL', value: '$12.4k' },
      { id: 'mktcap', label: 'MKT CAP', value: '$8.2M' },
      { id: 'members', label: 'MEMBERS', value: '1,142' },
      { id: 'eth', label: 'TOTAL ETH RAISED', value: '18 ETH' },
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
      { id: 'txns', label: 'TXNS', value: '187' },
      { id: 'vol', label: 'VOL', value: '$9.7k' },
      { id: 'mktcap', label: 'MKT CAP', value: '$5.4M' },
      { id: 'members', label: 'MEMBERS', value: '932' },
      { id: 'eth', label: 'TOTAL ETH RAISED', value: '11 ETH' },
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
      { id: 'txns', label: 'TXNS', value: '96' },
      { id: 'vol', label: 'VOL', value: '$4.1k' },
      { id: 'mktcap', label: 'MKT CAP', value: '$3.8M' },
      { id: 'members', label: 'MEMBERS', value: '678' },
      { id: 'eth', label: 'TOTAL ETH RAISED', value: '6 ETH' },
    ],
    totalEthRaised: '6 ETH',
  }
];

export default function TopAppsSection({
  title = 'Top apps in last 24h',
  apps = mockApps,
}: {
  title?: string;
  apps?: CardData[];
}) {
  return (
    <section className="w-full flex justify-center py-10">
      <div className="w-full max-w-6xl px-4">
        {/* Header row: title + small action */}
        <div className="flex items-baseline justify-between mb-6 gap-4">
          <h3 className="text-2xl md:text-3xl font-bold font-title text-gray-900">
            {title}
          </h3>
        </div>

        <ol>
          {apps.map((app) => (
            <li key={app.position ?? app.appName} className="list-none">
              {/* Card already renders its own rounded container and position badge */}
              <Card data={app} />
            </li>
          ))}
        </ol>
        <button className='w-full h-16 mt-5 border-2 rounded-full text-text-muted'>
            See all of today's top apps
        </button>
      </div>
    </section>
  );
}