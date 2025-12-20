import { ethers } from "ethers";
import { Actions, V4Planner } from "@uniswap/v4-sdk";
import { CommandType, RoutePlanner } from "@uniswap/universal-router-sdk";
import { Currency } from "@uniswap/sdk-core";
import { UNIVERSAL_ROUTER_ADDRESS, PERMIT2_ADDRESS, WETH_TOKEN } from "./constants";

/* -------------------------------------------------------------------------- */
/*                                    ABIs                                    */
/* -------------------------------------------------------------------------- */

const UNIVERSAL_ROUTER_ABI = [
  "function execute(bytes commands, bytes[] inputs, uint256 deadline) payable",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
];

const PERMIT2_ABI = [
  "function approve(address token, address spender, uint160 amount, uint48 expiration) external",
  "function allowance(address user, address token, address spender) view returns (uint160 amount, uint48 expiration, uint48 nonce)",
];

/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */

export type SwapResult =
  | { ok: true; txHash: string }
  | { ok: false; reason: string };

interface SwapParams {
  signer: ethers.Signer;
  sellTokenAddress: string;
  buyTokenAddress: string;
  amountIn: string; // User input string (e.g. "0.1")
  sellTokenDecimals: number;
  isEthIn: boolean; // True if user is selling native ETH
}

/* -------------------------------------------------------------------------- */
/*                                Execute Swap                                */
/* -------------------------------------------------------------------------- */

export async function executeV4Swap({
  signer,
  sellTokenAddress,
  buyTokenAddress,
  amountIn,
  sellTokenDecimals,
  isEthIn,
}: SwapParams): Promise<SwapResult> {
  try {
    const user = await signer.getAddress();
    const router = new ethers.Contract(UNIVERSAL_ROUTER_ADDRESS, UNIVERSAL_ROUTER_ABI, signer);
    
    // Parse amount
    const parsedAmountIn = ethers.utils.parseUnits(amountIn, sellTokenDecimals);
    const amountInStr = parsedAmountIn.toString();

    // ---------------------------------------------------------
    // 1. Handle Approvals (Only if selling ERC20)
    // ---------------------------------------------------------
    if (!isEthIn) {
      const tokenContract = new ethers.Contract(sellTokenAddress, ERC20_ABI, signer);
      const permit2 = new ethers.Contract(PERMIT2_ADDRESS, PERMIT2_ABI, signer);

      // A. Approve Token -> Permit2
      const allowance = await tokenContract.allowance(user, PERMIT2_ADDRESS);
      if (allowance.lt(parsedAmountIn)) {
        console.log("Approving Token to Permit2...");
        const tx = await tokenContract.approve(PERMIT2_ADDRESS, ethers.constants.MaxUint256);
        await tx.wait();
      }

      // B. Approve Permit2 -> Universal Router
      // Note: Permit2 uses packed allowance (amount, expiration, nonce)
      // For simplicity in v5, we check simply by calling approve if we suspect it's needed,
      // or check the allowance mapping.
      console.log("Approving Universal Router on Permit2...");
      const tx2 = await permit2.approve(
        sellTokenAddress,
        UNIVERSAL_ROUTER_ADDRESS,
        ethers.BigNumber.from(2).pow(160).sub(1), // Max Uint160
        Math.floor(Date.now() / 1000) + 3600 // 1 hour deadline
      );
      await tx2.wait();
    }

    // ---------------------------------------------------------
    // 2. Build V4 Plan
    // ---------------------------------------------------------
    const v4Planner = new V4Planner();
    const routePlanner = new RoutePlanner();

    // Define Pool Key (You must know the pool params: fee, tickSpacing, hooks)
    // Clanker pools usually have specific fee/tickSpacing.
    // Assuming standard 1% fee (10000) and 60 tick spacing for volatile pairs, 
    // OR 0.3% (3000) / 60. You need to fetch this from Clanker API if dynamic.
    const poolKey = {
      currency0: sellTokenAddress < buyTokenAddress ? sellTokenAddress : buyTokenAddress,
      currency1: sellTokenAddress < buyTokenAddress ? buyTokenAddress : sellTokenAddress,
      fee: 10000, // Example: 1%
      tickSpacing: 60, // Example
      hooks: "0x0000000000000000000000000000000000000000",
    };

    const swapConfig = {
      poolKey,
      zeroForOne: sellTokenAddress < buyTokenAddress, // true if selling currency0
      amountIn: amountInStr,
      amountOutMinimum: "0", // TODO: Calculate slippage
      hookData: "0x",
    };

    // Add Actions
    // A. Swap
    v4Planner.addAction(Actions.SWAP_EXACT_IN_SINGLE, [swapConfig]);

    // B. Settle (Pay Input)
    // If ETH in, we don't settle ETH here, the router takes it from msg.value
    // If ERC20 in, we settle
    if (isEthIn) {
       // For ETH in, the router wraps it automatically if we set the action correctly?
       // Actually V4 usually expects WETH for the pool.
       // Action: SETTLE_ALL takes funds from the user to the pool.
       v4Planner.addAction(Actions.SETTLE_ALL, [sellTokenAddress, amountInStr]);
    } else {
       v4Planner.addAction(Actions.SETTLE_ALL, [sellTokenAddress, amountInStr]);
    }

    // C. Take (Receive Output)
    v4Planner.addAction(Actions.TAKE_ALL, [buyTokenAddress, "0"]);

    // Finalize V4 Actions
    const encodedActions = v4Planner.finalize();

    // Add to Universal Router Command
    routePlanner.addCommand(CommandType.V4_SWAP, [v4Planner.actions, v4Planner.params]);

    // ---------------------------------------------------------
    // 3. Execute
    // ---------------------------------------------------------
    const deadline = Math.floor(Date.now() / 1000) + 600; // 10 mins
    
    // If sending ETH, include value
    const txOptions = isEthIn ? { value: parsedAmountIn } : {};

    console.log("Executing Swap...");
    const tx = await router.execute(
      routePlanner.commands,
      [encodedActions],
      deadline,
      txOptions
    );

    return { ok: true, txHash: tx.hash };

  } catch (err: any) {
    console.error("Swap Error:", err);
    return { 
      ok: false, 
      reason: err?.reason || err?.message || "Swap failed" 
    };
  }
}



// // ------------------------------------ NEW FILE V3 -------------------------

// import { ethers } from "ethers";

// /* -------------------------------------------------------------------------- */
// /*                                   Constants                                */
// /* -------------------------------------------------------------------------- */

// const UNIVERSAL_ROUTER =
//   "0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B";

// const QUOTER_V2 =
//   "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";

// const WETH = ethers.utils.getAddress(
//   "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
// );

// const USDC = ethers.utils.getAddress(
//   "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
// );

// const FEE = 500; // 0.05%
// const SLIPPAGE_BPS = 100; // 1%

// /* -------------------------------------------------------------------------- */
// /*                                   ABIs                                     */
// /* -------------------------------------------------------------------------- */

// const UNIVERSAL_ROUTER_ABI = [
//   "function execute(bytes commands, bytes[] inputs, uint256 deadline) payable",
// ];

// const QUOTER_ABI = [
//   "function quoteExactInput(bytes path, uint256 amountIn) external returns (uint256 amountOut)",
// ];

// const ERC20_ABI = [
//   "function allowance(address owner, address spender) view returns (uint256)",
//   "function approve(address spender, uint256 amount) returns (bool)",
//   "function balanceOf(address owner) view returns (uint256)",
// ];

// /* -------------------------------------------------------------------------- */
// /*                                   Types                                    */
// /* -------------------------------------------------------------------------- */

// export type SwapResult =
//   | { ok: true; txHash: string }
//   | { ok: false; reason: string };

// /* -------------------------------------------------------------------------- */
// /*                               Helper: Quote                                */
// /* -------------------------------------------------------------------------- */

// async function quoteV3(
//   provider: ethers.providers.Provider,
//   path: string,
//   amountIn: ethers.BigNumber
// ): Promise<ethers.BigNumber> {
//   const quoter = new ethers.Contract(QUOTER_V2, QUOTER_ABI, provider);

//   return await quoter.callStatic.quoteExactInput(path, amountIn);
// }

// /* -------------------------------------------------------------------------- */
// /*                               Execute Swap                                 */
// /* -------------------------------------------------------------------------- */

// export async function executeSwap(
//   signer: ethers.Signer,
//   sellToken: "ETH" | "USDC",
//   buyToken: "ETH" | "USDC",
//   amountIn: string
// ): Promise<SwapResult> {
//   try {
//     const provider = signer.provider!;
//     const user = await signer.getAddress();

//     const network = await provider.getNetwork();
//     if (network.chainId !== 1) {
//       return { ok: false, reason: "Please switch to Ethereum mainnet" };
//     }

//     const router = new ethers.Contract(
//       UNIVERSAL_ROUTER,
//       UNIVERSAL_ROUTER_ABI,
//       signer
//     );

//     /* ====================================================================== */
//     /*                           ETH → USDC                                    */
//     /* ====================================================================== */

//     if (sellToken === "ETH" && buyToken === "USDC") {
//       const ethAmount = ethers.utils.parseEther(amountIn);

//       const balance = await provider.getBalance(user);
//       const gasBuffer = ethers.utils.parseEther("0.0003");

//       if (balance.lt(ethAmount.add(gasBuffer))) {
//         return { ok: false, reason: "Insufficient ETH balance" };
//       }

//       const PATH = ethers.utils.solidityPack(
//         ["address", "uint24", "address"],
//         [WETH, FEE, USDC]
//       );

//       const quotedOut = await quoteV3(provider, PATH, ethAmount);

//       const minOut = quotedOut
//         .mul(10_000 - SLIPPAGE_BPS)
//         .div(10_000);

//       const INPUTS = [
//         ethers.utils.defaultAbiCoder.encode(
//           ["address", "uint256", "uint256", "bytes", "bool"],
//           [user, ethAmount, minOut, PATH, true]
//         ),
//       ];

//       const tx = await router.execute(
//         "0x08",
//         INPUTS,
//         Math.floor(Date.now() / 1000) + 300,
//         { value: ethAmount }
//       );

//       return { ok: true, txHash: tx.hash };
//     }

//     /* ====================================================================== */
//     /*                           USDC → ETH                                    */
//     /* ====================================================================== */

//     if (sellToken === "USDC" && buyToken === "ETH") {
//       const usdcAmount = ethers.utils.parseUnits(amountIn, 6);
//       const usdc = new ethers.Contract(USDC, ERC20_ABI, signer);

//       const usdcBalance = await usdc.balanceOf(user);
//       if (usdcBalance.lt(usdcAmount)) {
//         return { ok: false, reason: "Insufficient USDC balance" };
//       }

//       const allowance = await usdc.allowance(user, UNIVERSAL_ROUTER);
//       if (allowance.lt(usdcAmount)) {
//         const approveTx = await usdc.approve(
//           UNIVERSAL_ROUTER,
//           ethers.constants.MaxUint256
//         );
//         await approveTx.wait();
//       }

//       const PATH = ethers.utils.solidityPack(
//         ["address", "uint24", "address"],
//         [USDC, FEE, WETH]
//       );

//       const quotedOut = await quoteV3(provider, PATH, usdcAmount);

//       const minOut = quotedOut
//         .mul(10_000 - SLIPPAGE_BPS)
//         .div(10_000);

//       const INPUTS = [
//         ethers.utils.defaultAbiCoder.encode(
//           ["address", "uint256", "uint256", "bytes", "bool"],
//           [user, usdcAmount, minOut, PATH, true]
//         ),
//       ];

//       const tx = await router.execute(
//         "0x08",
//         INPUTS,
//         Math.floor(Date.now() / 1000) + 300
//       );

//       return { ok: true, txHash: tx.hash };
//     }

//     return { ok: false, reason: "Unsupported token pair" };
//   } catch (err: any) {
//     return {
//       ok: false,
//       reason: err?.message ?? "Swap failed",
//     };
//   }
// }