"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GNB } from "@/components/GNB";
import { LoginForm } from "./_components/LoginForm";
import { ImageGrid } from "./_components/ImageGrid";
import { useExchangeCode } from "@/hooks/useExchangeCode";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const exchangeMutation = useExchangeCode();
  const exchanged = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && !exchanged.current) {
      exchanged.current = true;
      exchangeMutation.mutate(code, {
        onSuccess: (res) => {
          if (res.success) {
            router.replace("/");
          }
        },
      });
    }
  }, [searchParams, exchangeMutation, router]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <GNB
        state="logout"
        tabs={[
          { label: "모델 카탈로그", value: "catalog" },
          { label: "생성하기", value: "create" },
          { label: "요금제", value: "pricing" },
        ]}
        onLoginClick={() => {}}
      />

      <main className="flex-1 flex items-start justify-center px-30">
        <div className="flex items-start gap-39.5">
          <div className="pt-37.5">
            <ImageGrid />
          </div>
          <div className="pt-36.25">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
