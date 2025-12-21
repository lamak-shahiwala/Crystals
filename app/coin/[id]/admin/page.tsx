import Link from "next/link";
import { IoArrowBack, IoCopyOutline } from "react-icons/io5";
import { FiGlobe } from "react-icons/fi";
import Navbar from "@/components/NavBar";
import { notFound } from "next/navigation";
import { getTokenByAddress } from "@/app/lib/api";
import { LuRefreshCw, LuSend, LuWallet } from "react-icons/lu";
import Footer from "@/components/Footer";
import AdminCard from "@/components/AdminCard";
import { SiFarcaster } from "react-icons/si";
import { BsPatchCheckFill, BsTwitterX } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

type ParamsPromise = Promise<{ id: string }>;
type Props = { params: ParamsPromise };

export default async function AdminPage({ params }: Props) {
  const { id } = await params;

  // 1. Fetch real data
  const tokenData = await getTokenByAddress(id);

  // 2. Handle not found
  if (!tokenData) notFound();

  // 3. Extract necessary fields
  const { appName, tokenSymbol, tokenImage, authorHandle } = tokenData.cardData;
  const shortId = `${id.substring(0, 8)}...${id.substring(id.length - 4)}`;

  return (
    <div className="min-h-screen w-full font-body bg-bg text-slate-800 pb-10">
      <Navbar />

      <div className="px-5 pt-6 pb-2 flex items-center justify-between gap-5">
        <Link href={`/coin/${id}`}>
          <button
            className="font-normal font-body bg-white border border-gray-300 rounded-full 
        inline-flex items-center gap-2 lg:ml-1 hover:bg-gray-50 transition-colors text-sm
        max-w-[200px] py-2 px-4"
          >
            <IoArrowBack className="shrink-0" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              Back to {appName}
            </span>
          </button>
        </Link>

        <button
          className="font-normal font-body bg-white border border-gray-300 rounded-full 
      inline-flex items-center justify-center gap-2 mr-1 hover:bg-gray-50 transition-colors text-sm
      h-12 px-4"
        >
          <span className="block lg:hidden">Refresh</span>
          <span className="hidden lg:block">Refresh Data</span>
          <LuRefreshCw />
        </button>
      </div>

      <main className="flex flex-col md:grid md:grid-cols-3 gap-6 p-5 w-full max-w-[1600px] mx-auto items-stretch">
        {/* --- COLUMN 1 --- */}
        <div className="flex flex-col w-full h-full">
          {/* Card 1: Token Info Header */}
          <AdminCard>
            {/* User Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-200 overflow-hidden">
                  {/* Placeholder User Avatar */}
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${authorHandle}`}
                    alt="avatar"
                  />
                </div>
                <div className="text-sm font-medium text-gray-700">
                  @{authorHandle}{" "}
                  <span className="text-gray-400">• 106d ago</span>
                </div>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                Admin
              </span>
            </div>

            {/* Token Branding */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl overflow-hidden shrink-0">
                {tokenImage ? (
                  <img
                    src={tokenImage}
                    alt={appName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{tokenSymbol ? tokenSymbol[0] : "?"}</span>
                )}
              </div>
              <div>
                <h1 className="font-title font-bold text-3xl text-gray-900">
                  {appName}
                </h1>
                <span className="text-gray-500 font-medium text-lg">
                  ${tokenSymbol}
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mt-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
                <FiGlobe size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
                <BsTwitterX size={20} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
                <SiFarcaster size={20} />
              </button>
            </div>
          </AdminCard>

          {/* Card 2: Contract / Base Info (New Thin Card) */}
          <AdminCard className="!p-4 !rounded-[1.5rem]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 font-bold">
                  <img src={"/images/base.png"} className="h-4 mr-1" />
                  <span className="text-slate-800">Base</span>
                </div>

                {/* Address Pill */}
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-mono text-gray-700">
                  <span>{shortId}</span>
                  <IoCopyOutline className="cursor-pointer hover:text-black" />
                </div>

                {/* V4 Badge */}
                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600 border border-gray-200">
                  V4
                </span>
              </div>

              {/* Verified Checks */}
              <div className="flex gap-1 text-teal-500">
                <BsPatchCheckFill size={18} />
                <BsPatchCheckFill size={18} className="text-yellow-600" />
              </div>
            </div>
          </AdminCard>

          {/* Card 3: Update Metadata */}
          <AdminCard title="Update Metadata">
            <p className="text-sm text-gray-500">
              Update the metadata for the token
            </p>
            <div className="py-4 text-center">
              <span className="text-red-400 text-sm font-medium">
                You do not have access to update the metadata.
              </span>
            </div>
          </AdminCard>

          {/* Card 4: Claim Rewards (Centered Layout) */}
          <AdminCard fillSpace={true} className="!mb-0 relative">
            <div className="flex-1 flex flex-col justify-center items-center gap-6">
              <h2 className="font-title font-bold text-2xl text-gray-900">
                Claim Rewards
              </h2>

              <div className="w-full">
                <label className="text-sm text-gray-500 mb-2 block">
                  Reward recipient
                </label>
                <div className="flex gap-2 w-full">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value="0x7c04...7090"
                      readOnly
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-mono text-sm outline-none"
                    />
                    {/* Dropdown arrow simulation */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <IoIosArrowDown />
                    </div>
                  </div>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">
                    <IoCopyOutline />
                  </button>
                </div>
                <button
                  disabled
                  className="w-full px-6 py-3 mt-6 bg-gray-100 text-gray-900 font-semibold rounded-full text-sm border border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  Check Claimable Fees
                </button>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* --- COLUMN 2 --- */}
        <div className="flex flex-col w-full h-full">
          {/* Card: Update Reward Recipient */}
          <AdminCard title="Update reward recipient">
            <p className="text-sm text-gray-500">
              Connect the token admin wallet to update the reward recipient for
              your position.
            </p>
            <div className="border border-gray-400 rounded-[2.5rem] p-6 bg-white shadow-sm">
              <h4 className="font-bold text-sm mb-3 text-black px-2">
                Your Reward Recipients
              </h4>
              <div className="border border-gray-400 rounded-[1.5rem] p-4 flex items-start gap-3 bg-gray-50">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-slate-800 focus:ring-slate-500"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-gray-900">
                    Reward Index 0
                  </span>
                  <span className="text-gray-500 text-xs font-mono">
                    100.00% • Current: 0x7c04...7090
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <label className="font-bold text-sm text-black block mb-1">
                Reward Recipient Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                disabled
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 font-body text-sm"
              />
            </div>
            <div className="mt-2">
              <button
                disabled
                className="text-gray-400 font-medium text-sm pl-1"
              >
                Update Recipients
              </button>
            </div>
            <p className="text-amber-500 text-xs font-medium mt-1">
              Please select at least one reward recipient to update.
            </p>
          </AdminCard>

          {/* Card: Update Reward Admin */}
          <AdminCard
            title="Update reward admin"
            fillSpace={true}
            className="!mb-0"
          >
            <p className="text-sm text-gray-500 mb-2">
              Connect the token admin wallet to update the reward admin for your
              position.
            </p>
            <div className="border border-gray-400 rounded-[2.5rem] p-6 bg-white shadow-sm">
              <h4 className="font-bold text-sm mb-3 text-black px-2">
                Your Reward Admins
              </h4>
              <div className="border border-gray-400 rounded-[1.5rem] p-4 flex items-start gap-3 bg-gray-50">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-slate-800 focus:ring-slate-500"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-gray-900">
                    Reward Index 0
                  </span>
                  <span className="text-gray-500 text-xs font-mono">
                    100.00% • Current: 0x7c04...7090
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <label className="font-bold text-sm text-black block mb-1">
                New Reward Admin Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                disabled
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 font-body text-sm"
              />
            </div>
            <div className="mt-2">
              <button
                disabled
                className="text-gray-400 font-medium text-sm pl-1"
              >
                Update Admins
              </button>
            </div>
            <p className="text-amber-500 text-xs font-medium mt-1">
              Please select at least one reward admin to update.
            </p>
          </AdminCard>
        </div>

        {/* --- COLUMN 3 --- */}
        <div className="flex flex-col w-full h-full">
          {/* Card: Update Token Image */}
          <AdminCard title="Update Token Image">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                New Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                disabled
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-body"
              />
            </div>
            <div>
              <button disabled className="text-gray-400 font-medium text-sm">
                Update Image
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Connected as 0x749565...7090. Only the token admin can update the
              image.
            </p>
          </AdminCard>

          {/* Card: Claim Vaulted Tokens */}
          <AdminCard title="Claim Vaulted Tokens">
            <div className="bg-gray-100 rounded-xl py-5 text-center text-sm text-gray-600">
              No vault tokens available to claim.
            </div>
            <button
              className="w-full bg-gray-100 text-gray-400 font-medium py-3 rounded-full mt-2 border border-gray-200"
              disabled
            >
              Claim Vault Rewards
            </button>
          </AdminCard>

          {/* Card: Verify Token */}
          <AdminCard title="">
            <h3 className="font-title text-md text-gray-900">Verify Token</h3>
            <div className="text-primary font-medium text-sm mb-1">
              Token is verified
            </div>
            <div className="text-xs text-gray-400 break-all">
              Admin: 0x749565...7090
            </div>
          </AdminCard>

          {/* Card: Bulk Distribute */}
          <AdminCard title="Bulk Distribute" fillSpace={true} className="!mb-0">
            <p className="text-sm text-gray-500">
              Send {tokenSymbol} to multiple recipients at once via{" "}
              <span className="text-green-400">Disperse.app</span>
            </p>
            <div className="flex items-center bg-gray-100 p-4 rounded-xl text-sm font-body truncate">
              <LuWallet className="mr-1" />
              Your Balance:{" "}
              <span className="ml-1 font-bold">121536769.79 {tokenSymbol}</span>
            </div>
            <button className="w-full bg-primary text-white font-medium py-3 rounded-full hover:bg-green-700 flex items-center justify-center gap-2 mt-2 transition-colors">
              <LuSend className="text-sm" /> Distribute Tokens
            </button>
          </AdminCard>
        </div>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </div>
  );
}
