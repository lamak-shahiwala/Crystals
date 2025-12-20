import { ethers } from "ethers";
import { WETH_TOKEN } from "./constants";

// Uniswap V3 Quoter V2 Address (Verified on Base)
const QUOTER_V3_ADDRESS = "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a"; 

const QUOTER_ABI = [
  "function quoteExactInputSingle(tuple(address tokenIn, address tokenOut, uint256 amountIn, uint24 fee, uint160 sqrtPriceLimitX96)) external returns (uint256 amountOut, uint160 sqrtPriceX96After, uint32 initializedTicksCrossed, uint256 gasEstimate)",
];

interface QuoteParams {
  provider: ethers.providers.Provider;
  sellTokenAddress: string;
  buyTokenAddress: string;
  amountIn: string; // User input (e.g. "1.5")
  sellTokenDecimals: number;
  buyTokenDecimals: number;
}

export async function getQuote({
  provider,
  sellTokenAddress,
  buyTokenAddress,
  amountIn,
  sellTokenDecimals,
  buyTokenDecimals,
}: QuoteParams): Promise<string | null> {
  try {
    if (!amountIn || isNaN(Number(amountIn)) || Number(amountIn) <= 0) return null;

    const quoter = new ethers.Contract(QUOTER_V3_ADDRESS, QUOTER_ABI, provider);

    // Parse Input
    const parsedAmount = ethers.utils.parseUnits(amountIn, sellTokenDecimals);

    // Params for V3 Quote
    // Note: Fee is typically 1% (10000) for Clanker tokens or 0.3% (3000) for standard tokens.
    // If quote fails, you might need to try multiple fees.
    const params = {
      tokenIn: sellTokenAddress,
      tokenOut: buyTokenAddress,
      amountIn: parsedAmount,
      fee: 10000, // Try 10000 (1%) first
      sqrtPriceLimitX96: 0,
    };

    // Call Quoter (Static Call)
    const result = await quoter.callStatic.quoteExactInputSingle(params);
    const amountOut = result.amountOut || result[0];

    return ethers.utils.formatUnits(amountOut, buyTokenDecimals);

  } catch (error: any) {
    // If 1% fee fails, try 0.3% (fallback)
    if (error?.code === "CALL_EXCEPTION") {
        console.warn("Quote failed with 1% fee, retrying with 0.3%...");
        // You could implement a retry logic here with fee=3000
    }
    console.error("Quote Error:", error.message || error);
    return null;
  }
}