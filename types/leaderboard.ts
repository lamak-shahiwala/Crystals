export interface Leaderboard {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  creator: {
    handle: string;
    avatar?: string;
    address: string;
  };
  priceChange: {
    h1: number;
    h6: number;
    h24: number;
  };
  volume: number;
  marketCap: number;
}