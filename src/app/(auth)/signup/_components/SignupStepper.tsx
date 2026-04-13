"use client";

import type { SignupStep } from "../_types";

type SignupStepperProps = {
  currentStep: SignupStep;
  isGoogleFlow?: boolean;
};

const STEP_LABELS = ["유형 선택", "약관 동의", "기본 정보", "비즈니스 정보"];

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13L10 17L19 7"
        stroke="#FBFBFB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SignupStepper({ currentStep, isGoogleFlow }: SignupStepperProps) {
  const steps = isGoogleFlow ? [1, 2, 4] : [1, 2, 3, 4];

  return (
    <div className="flex items-center w-full">
      {steps.map((stepNum, idx) => {
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const label = STEP_LABELS[stepNum - 1];

        return (
          <div key={stepNum} className="flex items-center flex-1 last:flex-none">
            {/* Step circle */}
            {isCompleted ? (
              <div className="w-9 h-9 rounded-full bg-pink-400 flex items-center justify-center shrink-0">
                <CheckIcon />
              </div>
            ) : isCurrent ? (
              <div className="flex items-center gap-2 h-9 rounded-full border border-pink-400 bg-neutral-50 px-3 shrink-0">
                <span className="text-heading-s text-pink-400">
                  {stepNum}
                </span>
                <span className="text-heading-xs text-pink-400">
                  {label}
                </span>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0">
                <span className="text-heading-s text-neutral-400 text-center">
                  {stepNum}
                </span>
              </div>
            )}

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-px bg-neutral-200 mx-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}
