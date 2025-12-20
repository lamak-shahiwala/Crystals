"use client";

import React, { useState, useEffect } from "react";
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle2,
  Copy,
  ArrowRight,
} from "lucide-react";
import { useWallets } from "@privy-io/react-auth";
import { useClankerDeploy } from "@/hooks/useClankerDeployment";
import Navbar from "@/components/NavBar";
import CTAButton from "@/components/CTAButton";

/* ----------------------------- Types ----------------------------- */

type SectionKey = "metadata" | "buy";

/* -------------------------- Components --------------------------- */

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
    className="flex items-center justify-between py-4 border-b border-border cursor-pointer group"
  >
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
        {title}
      </span>
      <HelpCircle size={14} className="text-gray-400" />
    </div>
    {isOpen ? (
      <ChevronUp size={18} className="text-gray-400" />
    ) : (
      <ChevronDown size={18} className="text-gray-400" />
    )}
  </div>
);

/* --------------------------- Page --------------------------- */

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

  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      metadata: true,
      buy: false,
    }
  );

  const [form, setForm] = useState({
    network: "Base",
    name: "",
    symbol: "",
    description: "",
    imageUrl: "",
    devBuyEth: "",
    vaultPercentage: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  /* --------------------------- Helpers --------------------------- */

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateForm = (key: string, value: any) => {
    setLocalError(null);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeploy = async () => {
    if (!isConnected) return;

    if (!form.name || !form.symbol) {
      setLocalError("Token name and symbol are required.");
      return;
    }

    await deployToken({
      name: form.name,
      symbol: form.symbol,
      description: form.description,
      imageUrl: form.imageUrl,
      devBuyEth: form.devBuyEth ? parseFloat(form.devBuyEth) : undefined,
      network: form.network,
      vault: form.vaultPercentage
        ? {
            percentage: parseFloat(form.vaultPercentage),
            lockupDuration: 2_592_000,
            vestingDuration: 2_592_000,
          }
        : undefined,
    });
  };

  if (!mounted) return null;

  /* ------------------------ Success View ------------------------ */

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <main className="max-w-xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6">
            <CheckCircle2 size={32} />
          </div>

          <h1 className="text-2xl font-bold mb-2">
            Deployed on {form.network}
          </h1>
          <p className="text-gray-500 text-sm mb-8">Confirmed on-chain.</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left mb-8">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">
              Transaction Hash
            </label>
            <div className="flex items-center justify-between gap-3">
              <code className="text-xs text-emerald-600 break-all font-mono">
                {txHash}
              </code>
              <button
                onClick={() => handleCopy(txHash || "")}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {copied ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          <a
            href={`https://clanker.world/clanker/${deployedAddress}`}
            target="_blank"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
          >
            View Token <ArrowRight size={18} />
          </a>

          <button
            onClick={reset}
            className="mt-4 text-sm text-gray-500 hover:text-gray-900"
          >
            Deploy another
          </button>
        </main>
      </div>
    );
  }

  /* ------------------------- Create View ------------------------- */

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="max-w-xl mx-auto px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-title font-bold mb-4">Launch Token</h1>
          <p className="text-gray-500 text-sm">
            Deploy instantly to Base or Monad.
          </p>
        </header>

        {/* ---------- Network ---------- */}
        <div className="space-y-3 mb-6">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Select Network
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Base", "Monad"].map((net) => (
              <button
                key={net}
                onClick={() => updateForm("network", net)}
                className={`py-4 rounded-xl border font-body font-bold text-sm transition-all
                  ${
                    form.network === net
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
              >
                {net == "Base" ? (
                  <div className="flex gap-2 items-center justify-center">
                    <img src={"/images/base.png"} className="h-5" />
                    {net}
                  </div>
                ) : (
                  <div className="flex gap-2 items-center justify-center">
                    <img src={"/images/monad.png"} className="h-5" />
                    {net}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Required Fields ---------- */}
        <div className="space-y-4">
          <input
            className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none"
            placeholder="Token Name *"
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
          />
          <input
            className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none"
            placeholder="Symbol *"
            value={form.symbol}
            onChange={(e) => updateForm("symbol", e.target.value)}
          />
        </div>

        {/* ---------- Metadata ---------- */}
        <div className="pt-6">
          <SectionHeader
            title="Token Metadata (optional)"
            isOpen={openSections.metadata}
            onToggle={() => toggleSection("metadata")}
          />
          {openSections.metadata && (
            <div className="pt-4 space-y-4">
              <textarea
                className="w-full border border-gray-200 rounded-xl p-4 text-sm min-h-[100px]"
                placeholder="Token description..."
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
              />
              <input
                className="w-full border border-gray-200 rounded-xl p-4 text-sm"
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
            <div className="pt-4 space-y-4">
              <input
                type="number"
                className="w-full border border-gray-200 rounded-xl p-4 text-sm"
                placeholder="Initial Buy (ETH / MON)"
                value={form.devBuyEth}
                onChange={(e) => updateForm("devBuyEth", e.target.value)}
              />
              <input
                type="number"
                className="w-full border border-gray-200 rounded-xl p-4 text-sm"
                placeholder="Vault % (0–100)"
                value={form.vaultPercentage}
                onChange={(e) => updateForm("vaultPercentage", e.target.value)}
              />
            </div>
          )}
        </div>

        {/* ---------- Deploy ---------- */}
        <div className="pt-8">
          <button
            onClick={handleDeploy}
            disabled={!isConnected || !form.name || !form.symbol || isDeploying}
            className={`w-full inline-flex items-center justify-center px-8 py-3 rounded-full font-bold shadow-sm text-white
              ${
                isDeploying || !form.name || !form.symbol || !isConnected
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-green-600 text-white"
              }`}
          >
            {isDeploying ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Deploying...
              </>
            ) : (
              `Create token on ${form.network}`
            )}
          </button>

          {(localError || deployError) && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
              {localError || deployError}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
