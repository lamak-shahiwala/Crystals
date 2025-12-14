export type Activity = {
  id: string;
  user: string;
  status: "buy" | "sell";
  amountShort: string;   // e.g. "7.1m"
  price: string;         // e.g. "$0.49"
  timeAgo: string;       // e.g. "11h"
};