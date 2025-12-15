"use client";

import clsx from "clsx";
import React from "react";
import { useRouter } from "next/navigation";
import CTAButton from "./CTAButton";
import type { CardData } from "../types/card";

type Props = {
  data: CardData;
  className?: string;
};

export default React.memo(function Card({ data, className = "" }: Props) {
  const router = useRouter();

  const {
    id = "0",
    position = 0,
    appName = "Untitled App",
    authorHandle = "unknown",
    authorAvatar,
    description = "",
    stats = [],
  } = data ?? {};

  const navigate = () => {
    router.push(`/coin/${id}`);
  };

  return (
    <article
      className={`w-full max-w-6xl mx-auto pt-2 pb-2 ${className}`}
      aria-label={`${appName} card`}
    >
      {/* APPLYING THE CONCEPT:
        Desktop: Padding is 32px (p-8). If we want an inner visual radius of 16px, 
                 Outer = 32 + 16 = 48px (rounded-[3rem]).
        Mobile:  Padding is 24px (p-6). If we want an inner visual radius of 16px, 
                 Outer = 24 + 16 = 40px (rounded-[2.5rem]).
      */}
      <div
        onClick={navigate}
        className="relative bg-white rounded-[2.5rem] lg:rounded-[3rem] shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        {/* Position Badge */}
        <div
          className="absolute left-0 top-8 z-10 flex items-center"
          aria-hidden
        >
          {(position === 1 || position === 2 || position === 3) && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-r-full bg-white/80 border border-border backdrop-blur shadow">
              {position === 1 && (
                <img
                  src="/images/gold.png"
                  alt="Gold position"
                  className="w-6 lg:w-7 h-6 lg:h-7 object-contain"
                />
              )}
              {position === 2 && (
                <img
                  src="/images/silver.png"
                  alt="Silver position"
                  className="w-6 lg:w-7 h-6 lg:h-7 object-contain"
                />
              )}
              {position === 3 && (
                <img
                  src="/images/bronze.png"
                  alt="Bronze position"
                  className="w-6 lg:w-7 h-6 lg:h-7 object-contain"
                />
              )}
            </div>
          )}

          {position > 3 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-r-full bg-white/80 border border-border backdrop-blur shadow font-bold text-lg text-gray-900">
              #{position}
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block p-8 pl-20">
          <div className="flex items-start gap-6 mb-6">
            {/* Logo - Already follows the rule: Outer (48px) = Inner (32px) + Gap (16px) */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
                  <div className="w-10 h-6 border-[3px] border-white rounded-t-full" />
                </div>
              </div>
            </div>

            {/* Header + Description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-4xl font-bold font-title text-gray-900 truncate">
                  {appName}
                </h2>
                <div className="flex items-center gap-2 text-gray-700">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar}
                      alt={`${authorHandle} avatar`}
                      className="w-6 h-6 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-gray-200 inline-block" />
                  )}
                  <span className="text-base">{authorHandle}</span>
                </div>
              </div>

              <p className="text-gray-600 text-base">{description}</p>
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="flex items-end justify-between pl-[7.5rem]">
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.id} className="min-w-[90px]">
                  <div className="text-xs text-gray-500 uppercase mb-1">
                    {stat.label}
                  </div>
                  <div
                    className={clsx(
                      "text-2xl font-bold",
                      stat.id === "24h△"
                        ? Number(stat.value) >= 0
                          ? "text-primary"
                          : "text-negative"
                        : "text-gray-900"
                    )}
                  >
                    {stat.id === "24h△" ? `${stat.value}%` : stat.value}
                  </div>
                </div>
              ))}
            </div>

            <CTAButton className="w-52" aria-label={`Trade ${appName}`}>
              Trade
            </CTAButton>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden p-6 pt-12">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <div className="w-14 h-14 bg-purple-700 rounded-full flex items-center justify-center">
                  <div className="w-8 h-5 border-[3px] border-white rounded-t-full" />
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold font-title text-gray-900 mb-1 truncate">
                {appName}
              </h2>
              <div className="flex items-center gap-2 text-gray-700">
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={`${authorHandle} avatar`}
                    className="w-5 h-5 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-gray-200 inline-block" />
                )}
                <span className="text-sm">{authorHandle}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6">{description}</p>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.id} className="min-w-[80px]">
                <div className="text-xs text-gray-500 uppercase mb-1">
                  {stat.label}
                </div>
                <div
                  className={clsx(
                    "text-xl font-bold",
                    stat.id === "24h△"
                      ? Number(stat.value) >= 0
                        ? "text-primary"
                        : "text-negative"
                      : "text-gray-900"
                  )}
                >
                  {stat.id === "24h△" ? `${stat.value}%` : stat.value}
                </div>
              </div>
            ))}
          </div>

          <CTAButton className="w-full">Trade</CTAButton>
        </div>
      </div>
    </article>
  );
});
