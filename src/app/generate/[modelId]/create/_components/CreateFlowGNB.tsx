"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { CreateStepper } from "./CreateStepper";

type CreateFlowGNBProps = {
  currentStep: 1 | 2 | 3;
  completedSteps?: ReadonlyArray<1 | 2 | 3>;
  onBack?: () => void;
  rightSlot?: ReactNode;
};

function ChevronLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CreateFlowGNB({
  currentStep,
  completedSteps,
  onBack,
  rightSlot,
}: CreateFlowGNBProps) {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.back());

  return (
    <header className="sticky top-0 z-30 h-20 lg:h-22 bg-neutral-50 border-b border-neutral-100">
      <div className="h-full max-w-[1440px] mx-auto px-6 lg:px-30 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBack}
          aria-label="뒤로 가기"
          className="cursor-pointer text-neutral-900 flex items-center justify-center"
        >
          <ChevronLeftIcon />
        </button>

        <div className="overflow-x-auto">
          <CreateStepper currentStep={currentStep} completedSteps={completedSteps} />
        </div>

        <div className="flex items-center gap-3 shrink-0">{rightSlot}</div>
      </div>
    </header>
  );
}
