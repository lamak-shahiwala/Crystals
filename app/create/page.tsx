"use client";

import React, { useState, useEffect } from "react";
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  Copy,
  ArrowRight,
} from "lucide-react";
import { useWallets } from "@privy-io/react-auth";
import { useClankerDeploy } from "@/hooks/useClankerDeployment";
import Navbar from "@/components/NavBar";

// --- Components ---

const SectionHeader = ({
  title,
  isOpen,
  onToggle,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className="flex items-center justify-between py-4 border-b border-white/10 cursor-pointer group"
  >
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
        {title}
      </span>
      <HelpCircle size={14} className="text-gray-500" />
    </div>
    {isOpen ? (
      <ChevronUp size={18} className="text-gray-400" />
    ) : (
      <ChevronDown size={18} className="text-gray-400" />
    )}
  </div>
);

export default function CreatePage() {
  const { wallets } = useWallets();
  const {
    deployToken,
    isDeploying,
    step,
    error: deployError,
    deployedAddress,
    txHash,
    reset,
  } = useClankerDeploy();

  const isConnected = wallets.length > 0;
  const [mounted, setMounted] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    metadata: true,
    buy: false,
  });

  const [form, setForm] = useState({
    network: "Base", // Default selection
    name: "",
    symbol: "",
    description: "",
    imageUrl: "",
    devBuyEth: "",
    vaultPercentage: "",
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateForm = (key: string, val: any) => {
    setLocalError(null);
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeploy = async () => {
    if (!isConnected) return;
    setLocalError(null);

    if (!form.name || !form.symbol) {
      setLocalError("Token name and symbol are required.");
      return;
    }

    const vPercentage = form.vaultPercentage
      ? parseFloat(form.vaultPercentage)
      : 0;
    const buyEth = form.devBuyEth ? parseFloat(form.devBuyEth) : 0;

    await deployToken({
      name: form.name,
      symbol: form.symbol,
      description: form.description,
      imageUrl: form.imageUrl,
      devBuyEth: buyEth > 0 ? buyEth : undefined,
      network: form.network, // Pass the network choice to your hook
      vault:
        vPercentage > 0
          ? {
              percentage: vPercentage,
              lockupDuration: 2592000,
              vestingDuration: 2592000,
            }
          : undefined,
    });
  };

  if (!mounted) return null;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="max-w-xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Deployed on {form.network}
          </h1>
          <p className="text-gray-400 text-sm mb-8">Confirmed on-chain.</p>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">
                Transaction Hash
              </label>
              <div className="flex items-center justify-between gap-3">
                <code className="text-xs text-emerald-400 break-all font-mono">
                  {txHash || "0x..."}
                </code>
                <button
                  onClick={() => handleCopy(txHash || "")}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400"
                >
                  {copied ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={
                form.network === "Base"
                  ? `https://clanker.world/clanker/${deployedAddress}`
                  : "#"
              }
              target="_blank"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              View Token <ArrowRight size={18} />
            </a>
            <button
              onClick={reset}
              className="text-gray-500 hover:text-white text-sm py-2"
            >
              Deploy another
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />
      <main className="max-w-xl mx-auto px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Launch Token</h1>
          <p className="text-gray-400 text-sm">
            Deploy instantly to Base or Monad.
          </p>
        </header>

        <div className="space-y-6">
          {/* --- Network Selector --- */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
              Select Network
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Base", "Monad"].map((net) => (
                <button
                  key={net}
                  onClick={() => updateForm("network", net)}
                  className={`py-4 rounded-xl border font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    form.network === net
                      ? "bg-white/10 border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      : "bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      net === "Base" ? "bg-blue-500" : "bg-purple-500"
                    }`}
                  />
                  {net}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                Token Name *
              </label>
              <input
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-emerald-500/50 outline-none transition-all"
                placeholder="e.g. Clanker Coin"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                Symbol *
              </label>
              <input
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-emerald-500/50 outline-none transition-all"
                placeholder="e.g. CLANK"
                value={form.symbol}
                onChange={(e) => updateForm("symbol", e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <SectionHeader
              title="Token Metadata (optional)"
              isOpen={openSections.metadata}
              onToggle={() => toggleSection("metadata")}
            />
            {openSections.metadata && (
              <div className="py-5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <textarea
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm min-h-[100px] outline-none focus:border-emerald-500/50"
                  placeholder="Token description..."
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                />
                <input
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-500/50"
                  placeholder="Image URL"
                  value={form.imageUrl}
                  onChange={(e) => updateForm("imageUrl", e.target.value)}
                />
              </div>
            )}

            <SectionHeader
              title="Liquidity & Buy (optional)"
              isOpen={openSections.buy}
              onToggle={() => toggleSection("buy")}
            />
            {openSections.buy && (
              <div className="py-5 space-y-4 animate-in fade-in slide-in-from-top-2">
                <input
                  type="number"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-500/50"
                  placeholder="Initial Buy (ETH/MON)"
                  value={form.devBuyEth}
                  onChange={(e) => updateForm("devBuyEth", e.target.value)}
                />
                <input
                  type="number"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-emerald-500/50"
                  placeholder="Vault % (0-100)"
                  value={form.vaultPercentage}
                  onChange={(e) =>
                    updateForm("vaultPercentage", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleDeploy}
              disabled={
                isDeploying || !form.name || !form.symbol || !isConnected
              }
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                ${
                  isDeploying || !form.name || !form.symbol || !isConnected
                    ? "bg-[#111] text-gray-700 cursor-not-allowed border border-white/5"
                    : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/10 active:scale-[0.98]"
                }`}
            >
              {isDeploying ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Deploying to {form.network}...
                </>
              ) : (
                `Deploy on ${form.network}`
              )}
            </button>
            {(localError || deployError) && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500 text-xs text-center font-medium">
                {localError || deployError}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
