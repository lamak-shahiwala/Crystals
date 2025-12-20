"use client";

import { useState } from "react";
import CTAButton from "./CTAButton";
import clsx from "clsx";
import { IoGlobeOutline } from "react-icons/io5";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import ActivitiesList from "./ActivitiesList";
import HoldersList from "./HoldersList";
import DetailsList from "./DetailsList";
import TokenomicsList from "./TokenomicsList";
import { CompositeTokenData } from "@/app/lib/api";

export default function CoinDetailsPage({
  data,
}: {
  data: CompositeTokenData;
}) {
  const [activeTab, setActiveTab] = useState<
    "activity" | "holders" | "details" | "tokenomics"
  >("activity");

  // Destructure for easier access while keeping your UI logic intact
  const { cardData, tokenomics, details, holders, activities } = data;

  return (
    <div>
      <div className="rounded-[2.5rem] border overflow-hidden">
        <div className="h-full flex flex-col bg-bg text-text rounded-2xl p-6 scrollbar-hide">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-3xl font-title leading-tight">
              {cardData.appName}
            </h1>

            <div className="flex items-center gap-2 mt-1 ml-1">
              <span className="text-sm text-text-muted">
                by {cardData.authorHandle}
              </span>

              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-bg-tertiary hover:bg-bg-secondary">
                <IoGlobeOutline />
              </button>

              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-bg-tertiary hover:bg-bg-secondary">
                <FaDiscord />
              </button>

              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-bg-tertiary hover:bg-bg-secondary">
                <FaXTwitter />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-text-subtle mt-1 mb-6">
            {cardData.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4 lg:mb-10">
            {cardData.stats
              .filter((stat) => stat.id !== "eth")
              .map((stat) => (
                <div key={stat.id} className="rounded-md p-3 bg-white/3">
                  <div className="text-xs text-text-muted mb-1">
                    {stat.label}
                  </div>
                  <div
                    className={clsx(
                      "text-base font-semibold",
                      stat.id === "24h△"
                        ? parseFloat(stat.value) >= 0
                          ? "text-primary"
                          : "text-negative"
                        : "text-text"
                    )}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
          </div>

          {/* Tabs (scrollable on mobile) */}
          <div className="mb-3">
            <nav className="flex gap-2 overflow-x-auto whitespace-nowrap border-b border-bg-tertiary pb-3 scrollbar-hide">
              {[
                { key: "activity", label: "Activity" },
                { key: "holders", label: "Holders" },
                { key: "details", label: "Details" },
                { key: "tokenomics", label: "Tokenomics" },
              ].map((t) => {
                const k = t.key as
                  | "activity"
                  | "holders"
                  | "details"
                  | "tokenomics";

                const active = activeTab === k;

                return (
                  <button
                    key={k}
                    onClick={() => setActiveTab(k)}
                    aria-pressed={active}
                    className={clsx(
                      "flex-shrink-0 py-1 px-5 text-sm font-medium transition rounded-full",
                      active
                        ? "text-bg bg-primary border border-primary"
                        : "text-text-muted hover:text-text"
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto pr-2 text-sm text-text-muted">
            {activeTab === "activity" && <ActivitiesList items={activities} />}

            {activeTab === "holders" && <HoldersList holders={holders} />}

            {activeTab === "details" && (
              <div className="">
                <DetailsList details={details} />
              </div>
            )}

            {activeTab === "tokenomics" && (
              <div className="">
                <TokenomicsList tokenomics={tokenomics} />
              </div>
            )}

            <div className="h-20" />
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 pt-6 backdrop-blur-lg bg-bg">
        <CTAButton className="w-full font-body">Trade</CTAButton>
      </div>
    </div>
  );
}
