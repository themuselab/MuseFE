"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

type SignupCompleteModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SignupCompleteModal({ open, onClose }: SignupCompleteModalProps) {
  const router = useRouter();

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-neutral-900/60"
        onClick={onClose}
      />
      <div className="relative bg-neutral-50 w-140 rounded-[20px] pt-12 px-10 pb-10 flex flex-col gap-14">
        {/* Content */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Placeholder image */}
          <div className="w-37.5 h-37.5 bg-neutral-100 rounded-lg" />

          {/* Text */}
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-heading-m text-neutral-900 text-center">
              회원가입이 완료되었어요!
            </h3>
            <p className="text-heading-xs text-neutral-700 text-center">
              지금 바로 뮤즈를 이용해보세요.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 w-full">
          <Button
            hierarchy="secondary"
            size="large"
            className="flex-1"
            onClick={() => router.push("/")}
          >
            메인페이지로 이동
          </Button>
          <Button
            hierarchy="primary"
            size="large"
            className="flex-1"
            onClick={() => router.push("/login")}
          >
            로그인하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
}
