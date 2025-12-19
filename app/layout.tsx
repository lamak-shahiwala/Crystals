import type { Metadata } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers/providers";
import { ModalProvider } from "./providers/ModalProvider";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The AppCoin Launchpad",
  description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Tokens.fun" />
      </head>
      <body
        className={`${funnelDisplay.variable} ${funnelSans.variable} font-body antialiased`}
      >
        <Providers>
          <ModalProvider>{children}</ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
