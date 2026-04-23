"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthGNB } from "@/components/AuthGNB";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AccountForm } from "./_components/AccountForm";

export default function AccountPage() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <AuthGNB />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <AuthGNB />
      <main className="flex-1 flex flex-col gap-8 px-6 md:px-30 py-8 md:py-12 max-w-[1440px] w-full mx-auto">
        <h1 className="text-heading-l text-neutral-900">계정 설정</h1>
        <AccountForm user={user} />
      </main>
    </div>
  );
}
