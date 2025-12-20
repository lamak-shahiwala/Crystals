import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { Details } from "@/types/details";
import { IoCheckmarkOutline } from "react-icons/io5";

/* -----------------------------------------------------
 * Helpers
 * --------------------------------------------------- */

function shortenHash(value: string, start = 6, end = 4) {
  if (!value) return "";
  return `${value.slice(0, start)}…${value.slice(-end)}`;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Copy failed:", error);
  }
}

/* -----------------------------------------------------
 * Row component
 * --------------------------------------------------- */

interface DetailsRowProps {
  label: string;
  value: string;
  copyable?: boolean;
}

function DetailsRow({ label, value, copyable }: DetailsRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between py-1">
      {/* Label */}
      <span className="text-sm text-text-muted">{label}</span>

      {/* Value */}
      {copyable ? (
        <button
          type="button"
          onClick={handleCopy}
          className="flex min-w-[120px] items-center gap-2 rounded-md border border-black/10 px-2 py-1
                     text-sm font-semibold text-text-muted transition
                     hover:text-text hover:border-black/20"
        >
          {copied ? (
            <IoCheckmarkOutline className="h-4 w-4 shrink-0 text-primary" />
          ) : (
            <FiCopy className="h-4 w-4 shrink-0" />
          )}
          <span>{shortenHash(value)}</span>
        </button>
      ) : (
        <span className="text-sm font-semibold text-text">{value}</span>
      )}
    </div>
  );
}

/* -----------------------------------------------------
 * List component
 * --------------------------------------------------- */

interface DetailsListProps {
  details: Details;
}

export default function DetailsList({ details }: DetailsListProps) {
  return (
    <div className="space-y-2">
      <DetailsRow label="Interface" value={details.interface} />
      <DetailsRow label="Platform" value={details.platform} />

      <DetailsRow
        label="Contract Address"
        value={details.contractAddress}
        copyable
      />

      <DetailsRow label="Creator" value={details.creator} copyable />
      <DetailsRow label="Admin Address" value={details.adminAddress} copyable />

      <DetailsRow label="Created" value={details.created} />

      <DetailsRow label="Cast Hash" value={details.castHash} copyable />
    </div>
  );
}
