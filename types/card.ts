export type Stat = {
  id: string;
  label: string;
  value: string;
  subLabel?: string; 
};

export type CardData = {
  id: string;
  position: number;
  appName: string;
  tokenSymbol: string; 
  authorHandle: string;
  authorAvatar?: string;
  tokenImage?: string;
  description: string;
  stats: Stat[];
  totalEthRaised?: string;
};

export const defaultCardData: CardData = {
  id: "degen-id-01",
  position: 0,
  appName: 'degen',
  tokenSymbol: 'DEGEN', // Added: The ticker symbol
  authorHandle: '0xmaster22',
  authorAvatar: undefined,
  description:
    'Degen, an ERC-20 token launched in January 2024, has reshaped the Farcaster ecosystem by enabling Casters to reward others with DEGEN for posting quality content.',
  stats: [
    { id: 'mktcap', label: 'MCAP', value: '558.0k' },
    { id: '24h', label: '24h', value: '18.1k' },
    { id: '24h△', label: '24h△', value: '+15.26%' },
  ],
  totalEthRaised: '7 ETH'
};