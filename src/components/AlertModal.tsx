"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";

type AlertModalSize = "sm" | "lg";

type AlertModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: AlertModalSize;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
};

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="#201d1f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sizeConfig: Record<AlertModalSize, {
  width: string;
  cornerRadius: string;
  padding: string;
  gap: string;
  buttonGap: string;
  buttonSize: "medium" | "large";
  titleFont: string;
  descFont: string;
}> = {
  sm: {
    width: "w-[343px]",
    cornerRadius: "rounded-lg",
    padding: "pt-8 px-6 pb-6",
    gap: "gap-8",
    buttonGap: "gap-2",
    buttonSize: "medium",
    titleFont: "text-[18px] font-semibold leading-[1.556] tracking-[-0.36px]",
    descFont: "text-[14px] font-medium leading-[1.43] tracking-[-0.28px] text-[#94a3b8]",
  },
  lg: {
    width: "w-[560px]",
    cornerRadius: "rounded-xl",
    padding: "pt-12 px-10 pb-10",
    gap: "gap-14",
    buttonGap: "gap-4",
    buttonSize: "large",
    titleFont: "text-[24px] font-semibold leading-[1.333] tracking-[-0.48px]",
    descFont: "text-[18px] font-medium leading-[1.556] tracking-[-0.36px] text-[#94a3b8]",
  },
};

export function AlertModal({
  open,
  onClose,
  title,
  description,
  size = "sm",
  primaryLabel = "확인",
  secondaryLabel,
  onPrimary,
  onSecondary,
}: AlertModalProps) {
  const config = sizeConfig[size];

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
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={[
          "relative bg-neutral-50",
          config.width,
          config.cornerRadius,
          config.padding,
          "shadow-[0_0_43.75px_rgba(30,41,59,0.08)]",
        ].join(" ")}
      >
        <div className={["flex flex-col", config.gap].join(" ")}>
          {/* 헤더 + 텍스트 */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-end h-8">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <h2 className={`text-neutral-900 text-center ${config.titleFont}`}>
                {title}
              </h2>
              {description && (
                <p className={`text-center ${config.descFont}`}>
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* 버튼 */}
          <div className={["flex flex-col", config.buttonGap].join(" ")}>
            {secondaryLabel && (
              <Button
                hierarchy="secondary"
                size={config.buttonSize}
                className="w-full"
                onClick={onSecondary ?? onClose}
              >
                {secondaryLabel}
              </Button>
            )}
            <Button
              hierarchy="primary"
              size={config.buttonSize}
              className="w-full"
              onClick={onPrimary ?? onClose}
            >
              {primaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
