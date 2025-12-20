"use client";

import { useState, useEffect, ReactNode } from "react";
import { mockApps } from "@/data/card";
import Card from "../Card";
import type { CardData } from "@/types/card";
import { useRouter } from "next/navigation";

interface SectionProps {
  title?: ReactNode;
  apps?: CardData[];
}

export default function Section({
  title = "Top apps in last 24h",
  apps = mockApps,
}: SectionProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Update itemsPerPage based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < apps.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const safeIndex = Math.min(
    currentIndex,
    Math.max(0, apps.length - itemsPerPage)
  );
  const displayApps = apps.slice(safeIndex, safeIndex + itemsPerPage);

  const isAtStart = safeIndex === 0;
  const isAtEnd = safeIndex + itemsPerPage >= apps.length;

  return (
    <section className="w-full flex justify-center py-8 lg:py-12 bg-bg">
      <div className="w-full max-w-7xl px-4 lg:px-6">
        {/* Header Row */}
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

          {/* Arrow Navigation UI */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={isAtStart}
              className={`p-2 rounded-full border border-border transition-colors ${
                isAtStart
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-gray-50 active:scale-95 text-gray-900"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={isAtEnd}
              className={`p-2 rounded-full border border-border transition-colors ${
                isAtEnd
                  ? "opacity-30 cursor-not-allowed"
                  : "bg-gray-50 hover:bg-gray-100 active:scale-95 text-gray-900"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayApps.map((app) => (
            <Card key={app.id || app.appName} data={app} />
          ))}
        </div>
      </div>
    </section>
  );
}
