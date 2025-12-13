"use client";

import React from "react";
import Link from "next/link";
import CTAButton from "./CTAButton";
import type { CardData } from "../types/card";

type Props = {
  data: CardData;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default React.memo(function Card({
  data,
  onClick,
  className = "",
}: Props) {
  const {
    id = "0",
    position = 0,
    appName = "Untitled App",
    authorHandle = "unknown",
    authorAvatar,
    description = "",
    stats = [],
  } = data ?? {};

  return (
    <article
      className={`w-full max-w-6xl mx-auto pt-2 pb-2 ${className}`}
      aria-label={`${appName} card`}
    >
      {/* Entire inner card is clickable */}
      <Link href={`/coin/${id}`} className="block group">
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer group-hover:shadow-xl transition">
          {/* Position Badge */}
          <div
            className="absolute left-0 top-8 bg-position text-bg font-bold text-lg px-4 py-2 rounded-r-lg z-10"
            aria-hidden
          >
            #{position}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block p-8 pl-20">
            <div className="flex items-start gap-6 mb-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
                    <div className="w-12 h-8 border-4 border-white rounded-t-full" />
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

            {/* Stats Row and Button */}
            <div className="flex items-end justify-between pl-[7.5rem]">
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="min-w-[90px]">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button — separate click */}
              <CTAButton onClick={() => {}} aria-label={`Trade ${appName}`}>
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
                    <div className="w-10 h-6 border-4 border-white rounded-t-full" />
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
                  <div className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <CTAButton
              onClick={() => {}}
              aria-label={`Trade`}
              className="w-full"
            >
              Trade
            </CTAButton>
          </div>
        </div>
      </Link>
    </article>
  );
});
