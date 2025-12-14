"use client";

import { CardData } from "@/types/card";
import { useState } from "react";
import CTAButton from "./CTAButton";
import clsx from "clsx";
import { IoGlobeOutline } from "react-icons/io5";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import ActivitiesList from "./ActivitiesList";
import { mockActivities } from "@/data/app";

export default function CoinDetailsPage({ data }: { data: CardData }) {
  const [activeTab, setActiveTab] = useState<
    "activity" | "holders" | "details" | "tokenomics"
  >("activity");

  return (
    <div>
      <div className="rounded-[2.5rem] border overflow-hidden">
        <div className="h-full flex flex-col bg-bg text-text rounded-2xl p-6">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-3xl font-title leading-tight">
              {data.appName}
            </h1>

            <div className="flex items-center gap-2 mt-1 ml-1">
              <span className="text-sm text-text-muted">
                by {data.authorHandle}
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
            {data.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4 lg:mb-10">
            {data.stats
              .filter((stat) => stat.id !== "eth")
              .map((stat) => (
                <div key={stat.id} className="rounded-md p-3 bg-white/3">
                  <div className="text-xs text-text-muted mb-1">
                    {stat.label}
                  </div>
                  <div className="text-base font-semibold text-text">
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
            {activeTab === "activity" && (
              <ActivitiesList items={mockActivities} />
            )}

            {activeTab === "holders" && (
              <div className="p-3 rounded-md bg-bg-secondary">
                Holders list will appear here.
              </div>
            )}

            {activeTab === "details" && (
              <div className="p-3 rounded-md bg-bg-secondary">
                Details list will appear here.
              </div>
            )}

            {activeTab === "tokenomics" && (
              <div className="p-3 rounded-md bg-bg-secondary">
                Tokenomics list will appear here.
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
