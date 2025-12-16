"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Web3Provider } from "@ethersproject/providers";
import { executeSwap } from "@/app/lib/uniswap/executeSwap";
import { FiArrowDown, FiChevronDown } from "react-icons/fi";
import { getQuote } from "@/app/lib/uniswap/getQuote";
import { ethers } from "ethers";

interface Props {
  open: boolean;
  onClose: () => void;
}

type TokenSymbol = "ETH" | "USDC";

const TOKENS: TokenSymbol[] = ["ETH", "USDC"];

const getOtherToken = (token: TokenSymbol): TokenSymbol =>
  token === "ETH" ? "USDC" : "ETH";

/* -------------------------------------------------------------------------- */
/* Token Select Modal                               */
/* -------------------------------------------------------------------------- */

function TokenSelectModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (t: TokenSymbol) => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-72 rounded-[2.5rem] bg-bg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-3 text-lg font-semibold px-1">Select a token</h3>

        <div className="space-y-2">
          {TOKENS.map((token) => (
            <button
              key={token}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className="w-full flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3 hover:bg-gray-200"
            >
              <span className="font-medium">{token}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Swap Modal                                  */
/* -------------------------------------------------------------------------- */

export function SwapModal({ open, onClose }: Props) {
  const { authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const modalRef = useRef<HTMLDivElement>(null);

  const [sellToken, setSellToken] = useState<TokenSymbol>("ETH");
  const [buyToken, setBuyToken] = useState<TokenSymbol>("USDC");

  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [selecting, setSelecting] = useState<"sell" | "buy" | null>(null);

  const [quoting, setQuoting] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  const switchTokens = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount("");
    setBuyAmount("");
  };

  const handleTokenSelect = (side: "sell" | "buy", token: TokenSymbol) => {
    if (side === "sell") {
      setSellToken(token);
      if (token === buyToken) {
        setBuyToken(getOtherToken(token));
      }
    } else {
      setBuyToken(token);
      if (token === sellToken) {
        setSellToken(getOtherToken(token));
      }
    }

    setSellAmount("");
    setBuyAmount("");
  };

  const handleSwap = async () => {
    if (!authenticated || wallets.length === 0) return;

    setError(null);
    setLoading(true);

    try {
      const eip1193Provider = await wallets[0].getEthereumProvider();
      const provider = new Web3Provider(eip1193Provider);
      const signer = provider.getSigner();

      const result = await executeSwap(signer, sellToken, buyToken, sellAmount);

      if (!result.ok) {
        setError(result.reason);
        return;
      }

      onClose();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!wallets.length || !sellAmount) {
      setBuyAmount("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setQuoting(true);

        const eip1193Provider = await wallets[0].getEthereumProvider();
        const provider = new Web3Provider(eip1193Provider);

        const quote = await getQuote(provider, sellToken, buyToken, sellAmount);

        setBuyAmount(quote ?? "");
      } finally {
        setQuoting(false);
      }
    }, 400); // debounce (ms)

    return () => clearTimeout(timeout);
  }, [sellAmount, sellToken, buyToken, wallets]);

  if (!open) return null;

  return (
    <>
      {/* Token Selector */}
      <TokenSelectModal
        open={selecting !== null}
        onClose={() => setSelecting(null)}
        onSelect={(token) => selecting && handleTokenSelect(selecting, token)}
      />

      {/* Swap Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-[2.5rem] lg:rounded-[3rem] bg-bg p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-semibold">Swap</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Sell */}
          <div className="mt-4 rounded-2xl bg-gray-100 p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Sell</p>
              <button
                onClick={() => setSelecting("sell")}
                className="flex items-center gap-1 rounded-full bg-bg px-3 py-1 text-sm shadow-sm"
              >
                {sellToken}
                <FiChevronDown />
              </button>
            </div>

            <input
              value={sellAmount}
              onChange={(e) => {
                setSellAmount(e.target.value);
              }}
              placeholder="0"
              className="mt-2 w-full bg-transparent text-2xl outline-none"
            />
          </div>

          {/* Switch */}
          <div className="flex justify-center -my-3 z-10 relative">
            <button
              onClick={switchTokens}
              className="rounded-full bg-bg p-2 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <FiArrowDown size={18} />
            </button>
          </div>

          {/* Buy */}
          <div className="rounded-2xl bg-gray-100 p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Buy</p>
              <button
                onClick={() => setSelecting("buy")}
                className="flex items-center gap-1 rounded-full bg-bg px-3 py-1 text-sm shadow-sm"
              >
                {buyToken}
                <FiChevronDown />
              </button>
            </div>

            <input
              value={quoting ? "" : buyAmount}
              disabled
              placeholder="0"
              className="mt-2 w-full bg-transparent text-2xl outline-none"
            />
            {quoting && (
              <p className="mt-1 text-xs text-gray-400">Fetching best price…</p>
            )}
          </div>

          {error && <p className="mt-2 text-sm text-red-500 px-1">{error}</p>}

          {/* Action */}
          {!authenticated ? (
            <button
              onClick={login}
              className="mt-5 w-full rounded-2xl bg-primary py-3 text-bg font-medium hover:opacity-90 transition-opacity"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={handleSwap}
              disabled={!sellAmount || loading}
              className="mt-5 w-full rounded-2xl bg-primary py-3 text-bg font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {loading ? "Trading…" : "Trade"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
