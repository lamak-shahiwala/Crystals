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
  authorHandle: string;
  authorAvatar?: string;
  description: string;
  stats: Stat[];
  totalEthRaised?: string;
};

export const defaultCardData: CardData = {
  id: "degen-id-01",
  position: 0,
  appName: 'degen',
  authorHandle: '0xmaster22',
  authorAvatar: undefined,
  description:
    'Degen, an ERC-20 token launched in January 2024, has reshaped the Farcaster ecosystem by enabling Casters to reward others with DEGEN for posting quality content.',
  stats: [
    { id: 'txns', label: 'TXNS', value: '103' },
    { id: 'vol', label: 'VOL', value: '$1k' },
    { id: 'mktcap', label: 'MKT CAP', value: '$125M' },
    { id: 'members', label: 'MEMBERS', value: '136' },
    { id: 'eth', label: 'TOTAL ETH RAISED', value: '7 ETH' }
  ],
  totalEthRaised: '7 ETH'
};
