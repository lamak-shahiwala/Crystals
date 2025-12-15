import { Details } from "@/types/details";

interface DetailsRowProps {
  label: string;
  value: string;
  isAddress?: boolean;
  isLink?: boolean;
}

function DetailsRow({ label, value, isAddress, isLink }: DetailsRowProps) {
  return (
    <div className="flex items-center justify-between py-1">
      {/* Label */}
      <span className="text-sm text-text-muted">{label}</span>
      <div className="flex items-center">
        {/* Copy icon for addresses */}
        {isAddress && (
          <button
            className="rounded-md border border-white/10 px-2 py-1 text-xs text-text-muted hover:text-text"
            title="Copy"
          >
            ⧉
          </button>
        )}
        {/* Value */}
        <div className="flex items-center gap-2">
          {isLink ? (
            <a
              href="#"
              className="text-sm font-semibold text-text hover:underline"
            >
              {value}
            </a>
          ) : (
            <span className="text-sm font-semibold text-text">{value}</span>
          )}
        </div>
      </div>
    </div>
  );
}

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
        isAddress
      />
      <DetailsRow label="Creator" value={details.creator} isAddress />
      <DetailsRow
        label="Admin Address"
        value={details.adminAddress}
        isAddress
      />
      <DetailsRow label="Created" value={details.created} />
      <DetailsRow label="Cast Hash" value={details.castHash} isLink />
    </div>
  );
}
