"use client";

import { type ReactNode } from "react";

type ChipVariant = "square" | "pill";

type ChipButtonProps = {
  label: string;
  variant?: ChipVariant;
  selected?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function ChipButton({
  label,
  variant = "pill",
  selected = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  className = "",
}: ChipButtonProps) {
  const isSquare = variant === "square";

  const baseStyles = isSquare
    ? "rounded-[6px] px-3 py-1.5 gap-1 text-[16px] font-medium leading-[1.75]"
    : "rounded-full px-5 py-3 gap-1.5 border text-[16px] font-semibold tracking-[0.032em] leading-none";

  const stateStyles = (() => {
    if (disabled && !isSquare) {
      return "bg-neutral-300 text-neutral-400 border-neutral-200 cursor-not-allowed";
    }
    if (selected) {
      return isSquare
        ? "bg-neutral-900 text-neutral-50"
        : "bg-neutral-900 text-neutral-50 border-neutral-200";
    }
    return isSquare
      ? "bg-neutral-100 text-neutral-700"
      : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-800 hover:text-neutral-50 active:bg-neutral-900 active:text-neutral-50";
  })();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center cursor-pointer transition-colors",
        baseStyles,
        stateStyles,
        className,
      ].join(" ")}
    >
      {leftIcon && <span className="flex shrink-0 w-5 h-5">{leftIcon}</span>}
      <span>{label}</span>
      {rightIcon && <span className="flex shrink-0 w-5 h-5">{rightIcon}</span>}
    </button>
  );
}
