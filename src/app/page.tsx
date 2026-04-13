"use client";

import { AuthGNB } from "@/components/AuthGNB";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <AuthGNB />
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-[32px] font-bold text-neutral-900">Muse</h1>
      </main>
    </div>
  );
}
