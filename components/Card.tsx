"use client";

import clsx from "clsx";
import React from "react";
import { useRouter } from "next/navigation";
import CTAButton from "./CTAButton";
import type { CardData } from "@/types/card";

type Props = {
  data: CardData;
  className?: string;
};

export default React.memo(function Card({ data, className = "" }: Props) {
  const router = useRouter();

  const {
    id = "0x000...000",
    appName = "Untitled App",
    authorHandle = "unknown",
    tokenSymbol = "TOKEN",
    authorAvatar = "",
    stats = [],
    tokenImage = "",
  } = data ?? {};

  const navigate = () => {
    router.push(`/coin/${id}`);
  };

  return (
    <article
      className={clsx(
        "group w-full overflow-hidden rounded-[2.5rem] bg-bg border border-border transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col",
        className
      )}
      onClick={navigate}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        {tokenImage ? (
          <img
            src={tokenImage}
            alt={appName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 overflow-hidden rounded-full border border-white/40 bg-gray-300 shadow-sm">
              {authorAvatar && (
                <img
                  src={authorAvatar}
                  alt={authorHandle}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <span className="text-xs font-bold text-white truncate">
              @{authorHandle}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-gray-900 truncate mb-4">
          {appName}
          <span className="text-gray-400 font-medium text-sm ml-1 uppercase">
            {tokenSymbol}
          </span>
        </h2>

        <div className="mb-6 grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col min-w-0">
              <div className="text-[10px] font-bold uppercase text-gray-400 truncate">
                {stat.label}
              </div>
              <div
                className={clsx(
                  "text-sm font-bold truncate",
                  stat.id === "24h△" || stat.label.includes("%")
                    ? Number(stat.value) >= 0
                      ? "text-emerald-500"
                      : "text-red-500"
                    : "text-gray-900"
                )}
              >
                {stat.value || "--"}
              </div>
            </div>
          ))}
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <CTAButton
            className="w-full"
            tokenAddress={id}
            tokenSymbol={tokenSymbol}
          >
            Trade
          </CTAButton>
        </div>
      </div>
    </article>
  );
});
