"use client";

import clsx from "clsx";

type Props = {
  status: "buy" | "sell";
  className?: string;
};

export default function ActivityStatusButton({ status, className }: Props) {
  const isBought = status === "buy";

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium",
        isBought
          ? "text-[#34C759] bg-[#34C759]/10 ring-1 ring-[#34C759]"
          : "text-[#FF3B30] bg-[#FF3B30]/10 ring-1 ring-[#FF3B30]",
        className
      )}
    >
      {isBought ? "Buy" : "Sell"}
    </span>
  );
}
