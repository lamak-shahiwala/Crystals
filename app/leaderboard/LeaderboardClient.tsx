"use client";

import { useState } from "react";
import { Leaderboard } from "@/types/leaderboard";
import { TokenSortOption } from "@/app/lib/api";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const TABS: { id: TokenSortOption; label: string }[] = [
  { id: "tx-h24", label: "Top apps 24h" },
  { id: "market-cap", label: "Market Cap" },
  { id: "deployed-at", label: "Newest Tokens" },
];

const ITEMS_PER_PAGE = 7;

export default function LeaderboardClient({
  initialData,
}: {
  initialData: Record<string, Leaderboard[]>;
}) {
  const [activeTab, setActiveTab] = useState<TokenSortOption>("tx-h24");
  const [currentPage, setCurrentPage] = useState(1);

  const allTokens = initialData[activeTab] || [];
  const totalPages = Math.ceil(allTokens.length / ITEMS_PER_PAGE);

  // Calculate the slice for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTokens = allTokens.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const formatPercent = (val: number) => (
    <span className={val >= 0 ? "text-primary" : "text-negative"}>
      {val >= 0 ? "+" : ""}
      {val.toFixed(1)}%
    </span>
  );

  const handleTabChange = (id: TokenSortOption) => {
    setActiveTab(id);
    setCurrentPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("...");
      }
    }
    return [...new Set(pages)];
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Tabs */}
      <div className="overflow-x-auto scrollbar-hide mb-6 border-b border-border">
        <div className="flex flex-nowrap gap-6 min-w-max pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-text"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto scrollbar-hide rounded-xl">
        <div className="min-w-[900px]">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="text-xs uppercase border-b border-border text-text-subtle">
                <th className="py-4 w-[6%] text-center">#</th>
                <th className="py-4 w-[24%]">Token</th>
                <th className="py-4 w-[18%]">Creator</th>
                <th className="py-4 w-[10%] text-right">1h</th>
                <th className="py-4 w-[10%] text-right">6h</th>
                <th className="py-4 w-[10%] text-right">24h</th>
                <th className="py-4 w-[11%] text-right">Volume</th>
                <th className="py-4 w-[11%] text-right">MCap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedTokens.map((token, index) => {
                const position = startIndex + index + 1;
                return (
                  <tr
                    key={token.id}
                    className="hover:bg-bg-secondary/30 transition-colors group"
                  >
                    <td className="py-4 text-center">
                      <div className="flex justify-center items-center">
                        {position === 1 ? (
                          <img
                            src="/images/gold.png"
                            alt="1"
                            className="w-6 h-6 object-contain"
                          />
                        ) : position === 2 ? (
                          <img
                            src="/images/silver.png"
                            alt="2"
                            className="w-6 h-6 object-contain"
                          />
                        ) : position === 3 ? (
                          <img
                            src="/images/bronze.png"
                            alt="3"
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="font-mono text-sm text-text-muted">
                            {position}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 truncate">
                      <div className="flex items-center gap-3">
                        {token.image ? (
                          <img
                            src={token.image}
                            className="w-10 h-10 rounded-full bg-bg shrink-0 object-cover border border-border/50"
                            alt=""
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-bg-secondary shrink-0 flex items-center justify-center text-[10px]">
                            {token.symbol.slice(0, 2)}
                          </div>
                        )}
                        <div className="truncate">
                          <div className="font-bold text-sm truncate">
                            {token.name}
                          </div>
                          <div className="text-xs text-text-subtle uppercase truncate">
                            {token.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 truncate text-sm">
                      <div className="flex items-center gap-2 truncate">
                        {token.creator.avatar ? (
                          <img
                            src={token.creator.avatar}
                            className="w-5 h-5 rounded-full shrink-0 object-cover"
                            alt=""
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-bg-secondary shrink-0" />
                        )}
                        <span className="truncate text-text-muted group-hover:text-text transition-colors">
                          @{token.creator.handle}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-right font-mono text-sm">
                      {formatPercent(token.priceChange.h1)}
                    </td>
                    <td className="py-4 text-right font-mono text-sm">
                      {formatPercent(token.priceChange.h6)}
                    </td>
                    <td className="py-4 text-right font-mono text-sm">
                      {formatPercent(token.priceChange.h24)}
                    </td>
                    <td className="py-4 text-right font-mono text-sm">
                      ${(token.volume / 1000).toFixed(1)}k
                    </td>
                    <td className="py-4 text-right font-bold text-sm">
                      ${(token.marketCap / 1e6).toFixed(1)}M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full border border-border hover:bg-bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <IoChevronBack />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, idx) => (
            <button
              key={idx}
              onClick={() =>
                typeof pageNum === "number" && setCurrentPage(pageNum)
              }
              className={`min-w-[40px] h-10 rounded-full text-sm font-medium transition-colors ${
                currentPage === pageNum
                  ? "bg-text text-bg"
                  : pageNum === "..."
                  ? "cursor-default text-text-muted"
                  : "hover:bg-bg-secondary text-text-muted hover:text-text"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full border border-border hover:bg-bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
}
