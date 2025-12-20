"use client";

import { useState, useCallback } from "react";
import { useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";

// Constants for Network Configuration
const NETWORKS = {
  Base: {
    chainId: 8453,
    factory: "0x7e6eafb92832d64020a1038e2f81977755b7654a",
  },
  Monad: {
    chainId: 10143, // Monad Testnet/Devnet
    factory: "0x..." // Replace with the Monad Clanker Factory address once deployed
  }
};

const CLANKER_ABI = [
  "function deployToken(string name, string symbol, string imageUrl, string description, uint256 devBuyEth, tuple(uint256 percentage, uint256 lockupDuration, uint256 vestingDuration) vault) external payable returns (address)"
];

interface DeployConfig {
  name: string;
  symbol: string;
  network: string; // "Base" | "Monad"
  description?: string;
  imageUrl?: string;
  devBuyEth?: number;
  vault?: {
    percentage: number;
    lockupDuration: number;
    vestingDuration: number;
  };
}

export function useClankerDeploy() {
  const { wallets } = useWallets();
  const [isDeploying, setIsDeploying] = useState(false);
  const [step, setStep] = useState<"idle" | "deploying" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const reset = () => {
    setStep("idle");
    setError(null);
    setDeployedAddress(null);
    setTxHash(null);
  };

  const deployToken = useCallback(async (config: DeployConfig) => {
    const activeWallet = wallets[0];
    if (!activeWallet) {
      setError("No wallet connected");
      return;
    }

    setIsDeploying(true);
    setStep("deploying");
    setError(null);

    try {
      // 1. Determine Network
      const networkData = config.network === "Monad" ? NETWORKS.Monad : NETWORKS.Base;
      
      // 2. Switch Chain
      await activeWallet.switchChain(networkData.chainId);

      // 3. Robust Provider Setup (Fixes Wallet Timeouts)
      const ethereumProvider = await activeWallet.getEthereumProvider();
      
      // Re-request accounts to ensure heartbeat is active
      await ethereumProvider.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.providers.Web3Provider(ethereumProvider, "any");
      const signer = provider.getSigner();

      const contract = new ethers.Contract(networkData.factory, CLANKER_ABI, signer);

      // 4. Data Preparation
      const vaultData = config.vault ? {
        percentage: ethers.utils.parseUnits(config.vault.percentage.toString(), 0),
        lockupDuration: config.vault.lockupDuration,
        vestingDuration: config.vault.vestingDuration
      } : { percentage: 0, lockupDuration: 0, vestingDuration: 0 };

      const valueInWei = config.devBuyEth 
        ? ethers.utils.parseEther(config.devBuyEth.toString()) 
        : ethers.BigNumber.from(0);

      // 5. Execution with manual gas limit to prevent RPC hanging
      const tx = await contract.deployToken(
        config.name,
        config.symbol,
        config.imageUrl || "",
        config.description || "",
        valueInWei,
        vaultData,
        { 
          value: valueInWei,
          // Manually setting gas limit helps avoid "Wallet Timeout" during estimation
          gasLimit: 1200000 
        }
      );

      setTxHash(tx.hash);
      const receipt = await tx.wait();
      
      // Attempt to find the created token address from logs
      // Note: In production, you'd parse the specific 'TokenCreated' event
      setDeployedAddress(receipt.events?.[0]?.address || receipt.to);
      setStep("success");
      
    } catch (err: any) {
      console.error("Deployment failed:", err);
      
      // Precise Error Handling
      if (err?.code === 4001 || err?.message?.includes("rejected")) {
        setError("Transaction rejected in wallet.");
      } else if (err?.message?.includes("insufficient funds")) {
        setError("Insufficient ETH for gas and/or initial buy.");
      } else if (err?.message?.includes("timeout")) {
        setError("Wallet connection timed out. Please unlock your wallet and try again.");
      } else {
        setError("Deployment failed. Please check your balance or try again.");
      }
      
      setStep("error");
    } finally {
      setIsDeploying(false);
    }
  }, [wallets]);

  return { deployToken, isDeploying, step, error, deployedAddress, txHash, reset };
}