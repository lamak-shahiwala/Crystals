"use client";

import { Holder } from "@/types/holders";

interface HoldersRowProps {
  holder: Holder;
  rank: number;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function HoldersRow({ holder, rank }: HoldersRowProps) {
  return (
    <li className="flex items-center justify-between rounded-xl bg-bg px-4 py-3">
      {/* Rank */}
      <>
        <span className="w-6 font-medium">{rank}</span>

        {/* Holder Info*/}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Avatar name={holder.name} />
          <div className="block text-sm font-medium truncate">
            {holder.name}
          </div>
        </div>
      </>
      {/* Percentage */}
      <span className="rounded-md bg-bg px-3 py-1 text-sm font-semibold">
        {holder.percentage}%
      </span>
    </li>
  );
}

interface HoldersListProps {
  holders: Holder[];
}

export default function HoldersList({ holders }: HoldersListProps) {
  const sortedHolders = [...holders].sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <ol className="space-y-1">
      {sortedHolders.map((holder, index) => (
        <HoldersRow key={holder.id} holder={holder} rank={index + 1} />
      ))}
    </ol>
  );
}
