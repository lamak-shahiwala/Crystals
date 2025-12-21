"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useWallets } from "@privy-io/react-auth";
import { useClankerDeploy } from "@/hooks/useClankerDeployment";
import Navbar from "@/components/NavBar";
import { GoInfo } from "react-icons/go";

/* ----------------------------- Types ----------------------------- */

type SectionKey = "metadata" | "buy";

type FormErrors = {
  name?: string;
  symbol?: string;
  imageUrl?: string;
};

/* -------------------------- Tooltip --------------------------- */

const InfoTooltip = ({ text }: { text: string }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"top" | "bottom">("top");

  const handleMouseEnter = () => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipHeight = tooltipRef.current.offsetHeight;

    if (wrapperRect.top < tooltipHeight + 12) {
      setPosition("bottom");
    } else {
      setPosition("top");
    }
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      className="relative inline-flex group"
    >
      <GoInfo size={14} className="text-text-muted cursor-pointer" />

      <div
        ref={tooltipRef}
        className={`
          pointer-events-none absolute left-1/2 z-50 w-64 -translate-x-1/2
          rounded-lg border border-gray-200 bg-white px-3 py-2
          text-xs text-gray-700 shadow-lg
          opacity-0 transition-opacity duration-150
          group-hover:opacity-100
          ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"}
        `}
      >
        {text}

        <div
          className={`
            absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white
            border-gray-200
            ${
              position === "top"
                ? "top-full -mt-1 border-l border-b"
                : "bottom-full -mb-1 border-r border-t"
            }
          `}
        />
      </div>
    </div>
  );
};

/* -------------------------- Components --------------------------- */

const FieldLabel = ({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const SectionHeader = ({
  title,
  tooltip,
  isOpen,
  onToggle,
}: {
  title: string;
  tooltip?: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className="flex items-center justify-between py-4 border-b border-border cursor-pointer"
  >
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-text-muted">{title}</span>
      {tooltip && <InfoTooltip text={tooltip} />}
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
  const { deployToken, isDeploying, error: deployError } = useClankerDeploy();

  const isConnected = wallets.length > 0;

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  /* --------------------------- Validation --------------------------- */

  const validate = (values = form) => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Token name is required";
    if (!values.symbol.trim()) nextErrors.symbol = "Symbol is required";
    if (!values.imageUrl.trim()) nextErrors.imageUrl = "Image URL is required";
    setErrors(nextErrors);
    return nextErrors;
  };

  useEffect(() => {
    validate();
  }, [form]);

  const isFormValid =
    !errors.name && !errors.symbol && !errors.imageUrl && isConnected;

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-xl p-4 text-sm outline-none transition
     ${
       errors[field] && touched[field]
         ? "border border-red-400 bg-red-50"
         : "border border-gray-200 focus:border-emerald-500"
     }`;

  /* --------------------------- Helpers --------------------------- */

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateForm = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeploy = async () => {
    const errs = validate();
    setTouched({ name: true, symbol: true, imageUrl: true });
    if (Object.keys(errs).length > 0 || !isConnected) return;

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
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-text-muted">Network</span>
            <InfoTooltip text="Select the blockchain network where your token will be deployed." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Base", "Monad"].map((net) => (
              <button
                key={net}
                onClick={() => updateForm("network", net)}
                className={`py-4 rounded-xl border font-bold text-sm transition-all
                  ${
                    form.network === net
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
              >
                <div className="flex gap-2 items-center justify-center">
                  <img
                    src={`/images/${net.toLowerCase()}.png`}
                    className="h-5"
                  />
                  {net}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Required Fields ---------- */}
        <div className="space-y-4">
          <div>
            <FieldLabel label="Token Name" required />
            <input
              className={inputClass("name")}
              value={form.name}
              placeholder="Enter token name"
              onChange={(e) => updateForm("name", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            />
          </div>

          <div>
            <FieldLabel label="Symbol" required />
            <input
              className={inputClass("symbol")}
              value={form.symbol}
              placeholder="Enter token symbol"
              onChange={(e) => updateForm("symbol", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, symbol: true }))}
            />
          </div>

          <div>
            <FieldLabel label="Image URL" required />
            <input
              className={inputClass("imageUrl")}
              value={form.imageUrl}
              placeholder="Enter token image url"
              onChange={(e) => updateForm("imageUrl", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, imageUrl: true }))}
            />
          </div>
        </div>

        {/* ---------- Metadata & Buy ---------- */}
        <div className="pt-6">
          <SectionHeader
            title="Token Metadata (optional)"
            tooltip="Add additional information about your token"
            isOpen={openSections.metadata}
            onToggle={() => toggleSection("metadata")}
          />

          {openSections.metadata && (
            <div className="mt-4">
              <FieldLabel label="Description" />
              <textarea
                className="w-full border border-gray-200 rounded-xl p-4 text-sm min-h-[100px]"
                placeholder="Enter token description"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
              />
            </div>
          )}

          <SectionHeader
            title="Liquidity & Buy (optional)"
            tooltip="Configure initial buy amount and optional vault settings."
            isOpen={openSections.buy}
            onToggle={() => toggleSection("buy")}
          />

          {openSections.buy && (
            <div className="pt-4 space-y-4">
              <div>
                <FieldLabel label="Initial Buy (ETH / MON)" />
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm"
                  value={form.devBuyEth}
                  onChange={(e) => updateForm("devBuyEth", e.target.value)}
                />
              </div>

              <div>
                <FieldLabel label="Vault % (0–100)" />
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm"
                  value={form.vaultPercentage}
                  onChange={(e) =>
                    updateForm("vaultPercentage", e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* ---------- Terms & Conditions ---------- */}
        <div className="pt-8">
          <label className="flex items-start justify-center gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>
              I confirm that I have read and agree to the{" "}
              <span className="font-medium text-gray-900">
                Terms & Conditions
              </span>
            </span>
          </label>
        </div>

        {/* ---------- Deploy ---------- */}
        <div className="pt-8">
          <button
            onClick={handleDeploy}
            disabled={!isFormValid || isDeploying || !acceptedTerms}
            className={`w-full py-3 rounded-full font-bold transition
              ${
                !isFormValid || isDeploying || !acceptedTerms
                  ? "bg-gray-200 text-gray-400"
                  : "bg-primary text-white hover:bg-green-600"
              }`}
          >
            {isDeploying ? "Deploying..." : `Create token on ${form.network}`}
          </button>

          {deployError && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center">
              {deployError}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
