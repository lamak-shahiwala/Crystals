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
    "transactions" | "members" | "holders"
  >("transactions");

  return (
    <div>
      <div className="h-full flex flex-col bg-bg text-text rounded-2xl p-6 border">
        <div className="mb-5">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-3xl font-title leading-tight">
                    {data.appName}
                  </h1>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-text-muted">
                      by{" "}
                      <span className="text-text-subtle">
                        {data.authorHandle}
                      </span>
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
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-subtle mt-1 mb-6">{data.description}</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 lg:mb-10">
          {data.stats
            .filter((stat) => stat.id !== "eth")
            .map((stat) => (
              <div key={stat.id} className="rounded-md p-3 bg-white/3">
                <div className="text-xs text-text-muted mb-1">{stat.label}</div>
                <div className="text-base font-semibold text-text">
                  {stat.value}
                </div>
              </div>
            ))}
        </div>

        {/* Tabs */}
        <div className="mb-3">
          <nav className="flex justify-between border-b border-bg-tertiary pb-3">
            {[
              { key: "transactions", label: "Transactions" },
              { key: "members", label: "Members" },
              { key: "holders", label: "Holders" },
            ].map((t) => {
              const k = t.key as "transactions" | "members" | "holders";
              const active = activeTab === k;
              return (
                <button
                  key={k}
                  onClick={() => setActiveTab(k)}
                  aria-pressed={active}
                  className={clsx(
                    "py-1 px-5 text-sm font-medium transition",
                    active
                      ? "text-bg bg-primary border border-primary rounded-full items-center"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab content — scrollable area */}
        <div className="flex-1 overflow-auto pr-2 text-sm text-text-muted">
          {activeTab === "transactions" && (
            <div>
              {/* placeholder list — replace with real transactions */}
              <div className="space-y-2">
                <div className="">
                  <ActivitiesList items={mockActivities} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-bg-secondary">
                  Members list will appear here.
                </div>
              </div>
            </div>
          )}

          {activeTab === "holders" && (
            <div>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-bg-secondary">
                  Holders list will appear here.
                </div>
              </div>
            </div>
          )}

          {/* spacer to ensure sticky button doesn't overlap last content */}
          <div className="h-20" />
        </div>
      </div>
      {/* Sticky trade bar: stays pinned to bottom of the right column while scrolling */}
      <div className="sticky bottom-0 pt-6 backdrop-blur-lg bg-bg">
        <CTAButton className="w-full font-body">Trade</CTAButton>
      </div>
    </div>
  );
}
