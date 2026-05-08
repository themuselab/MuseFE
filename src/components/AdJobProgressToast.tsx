"use client";

import { useEffect, useState } from "react";
import { ThreeDots } from "@/components/ThreeDots";
import { AD_JOB_TOAST } from "@/constants/app";

type AdJobProgressToastProps = {
  itemName: string;
  variant?: "default" | "error";
  onClick?: () => void;
};

const DOT_INTERVAL_MS = 400;

export function AdJobProgressToast({
  itemName,
  variant = "default",
  onClick,
}: AdJobProgressToastProps) {
  const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (variant === "error") return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (((prev + 1) % 3) as 0 | 1 | 2));
    }, DOT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [variant]);

  const isError = variant === "error";
  const text = isError
    ? AD_JOB_TOAST.errorText(itemName)
    : AD_JOB_TOAST.progressText(itemName);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="이미지 제작 진행 화면으로 돌아가기"
      className="inline-flex items-center gap-3 px-3 py-2 rounded-lg bg-neutral-900/20 shadow-md cursor-pointer transition-colors hover:bg-neutral-900/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
    >
      {isError ? null : <ThreeDots activeIndex={activeIndex} />}
      <span className="text-body-l text-neutral-900 text-center">{text}</span>
    </button>
  );
}
