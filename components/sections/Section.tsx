"use client";

import { ReactNode, useRef } from "react";
import clsx from "clsx";
import { mockApps } from "@/data/card";
import Card from "../Card";
import type { CardData } from "@/types/card";

interface SectionProps {
  title?: ReactNode;
  apps?: CardData[];
}

export default function Section({
  title = "Top apps in last 24h",
  apps = mockApps,
}: SectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-card]");
    if (!card) return;

    const scrollAmount = card.offsetWidth + 16; // gap-4 = 16px
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full flex justify-center py-8 lg:py-12 bg-bg">
      <div className="w-full max-w-7xl px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {typeof title === "string" ? (
              <h3 className="text-2xl md:text-3xl font-bold font-title text-gray-900">
                {title}
              </h3>
            ) : (
              title
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => scrollByCard("prev")}
              className="p-2 rounded-full border border-border transition hover:bg-gray-50 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>

            <button
              onClick={() => scrollByCard("next")}
              className="p-2 rounded-full border border-border transition hover:bg-gray-50 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth"
        >
          {apps.map((app) => (
            <div
              key={app.id || app.appName}
              data-card
              className="
  snap-start
  flex-shrink-0
  w-[85%]
  sm:w-[70%]
  lg:w-[calc(25%-12px)]
"
            >
              <Card data={app} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
