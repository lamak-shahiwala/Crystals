"use client";

import React, { useEffect } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const origConsoleError = console.error;

    console.error = (...args: any[]) => {
      let msg = "";
      try {
        const first = args[0];
        msg =
          typeof first === "string"
            ? first
            : first && typeof first.toString === "function"
            ? String(first)
            : "";
      } catch {
        // If we couldn't stringify the arg, fall through and forward (safer)
        try {
          origConsoleError.apply(console, args);
        } catch {
          // swallow
        }
        return;
      }

      // Suppress React list-key warning (as before)
      if (
        msg.includes('Each child in a list should have a unique "key" prop.')
      ) {
        return;
      }

      // SUPPRESS: Turbopack / source-map noisy messages
      if (
        msg.includes("Invalid source map") ||
        msg.includes("sourceMapURL could not be parsed") ||
        msg.includes("sourceMappingURL could not be parsed")
      ) {
        // Intentionally do NOT call origConsoleError to avoid re-triggering the parsing.
        // If you want a tiny dev marker, use console.debug (less likely to trigger stack parsing).
        try {
          // console.debug is optional — remove this line if you want complete silence.
          console.debug?.("[dev] suppressed invalid source map message");
        } catch {
          // swallow
        }
        return;
      }

      // For everything else, forward to the original console.error safely
      try {
        origConsoleError.apply(console, args);
      } catch (applyErr) {
        // If the original console.error itself throws, fallback to console.log
        try {
          console.log(
            "[dev] console.error forwarding failed:",
            applyErr,
            ...args
          );
        } catch {
          // last resort: swallow
        }
      }
    };

    return () => {
      console.error = origConsoleError;
    };
  }, []);

  return (
    <React.Fragment key="privy-root">
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
          appearance: {
            theme: "light",
            walletList: ["metamask", "coinbase_wallet"], // Correct way to list wallets
          },
          loginMethods: ["wallet"],
        }}
      >
        {children}
      </PrivyProvider>
    </React.Fragment>
  );
}
