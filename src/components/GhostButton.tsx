"use client";

import { type ReactNode } from "react";

type GhostButtonSize = "sm" | "lg";

type GhostButtonProps = {
  label: string;
  size?: GhostButtonSize;
  leftIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

const sizeStyles: Record<GhostButtonSize, {
  font: string;
}> = {
  lg: {
    font: "text-[16px] font-semibold tracking-[0.032em] leading-none",
  },
  sm: {
    font: "text-[14px] font-semibold tracking-[0.028em] leading-none",
  },
};

export function GhostButton({
  label,
  size = "lg",
  leftIcon,
  onClick,
  className = "",
}: GhostButtonProps) {
  const styles = sizeStyles[size];

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1 p-1 cursor-pointer transition-colors",
        "rounded text-neutral-700",
        "hover:bg-neutral-50/60",
        "active:bg-transparent active:text-neutral-900",
        size === "lg" ? "active:rounded-lg" : "",
        styles.font,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {leftIcon && <span className="flex shrink-0 w-5 h-5">{leftIcon}</span>}
      <span>{label}</span>
    </button>
  );
}
