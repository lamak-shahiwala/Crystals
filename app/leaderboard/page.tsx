"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-full">
      <main className="h-screen w-full flex flex-col items-center justify-center">
        <span className="text-4xl">welcome to leaderboard</span>

        <span
          onClick={() => router.back()}
          className="underline hover:text-blue-800 cursor-pointer pt-4"
        >
          go back
        </span>
      </main>
    </div>
  );
}
