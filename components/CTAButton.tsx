"use client";

import React from "react";
import { useModal } from "@/app/providers/ModalProvider";

type CTAButtonProps = {
  children: React.ReactNode;
  className?: string;
  tokenAddress: string;
  tokenSymbol?: string;
};

export default function CTAButton({
  children,
  className = "",
  tokenAddress,
  tokenSymbol = "TOKEN",
}: CTAButtonProps) {
  const { openSwap } = useModal();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!tokenAddress) {
      console.warn("Swap Error: No token address provided to CTA");
      return;
    }

    openSwap({
      address: tokenAddress,
      symbol: tokenSymbol,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center px-8 py-3 rounded-full font-bold shadow-sm bg-primary text-white transition-transform hover:scale-105 active:scale-95 hover:bg-green-600 ${className}`}
    >
      {children}
    </button>
  );
}
