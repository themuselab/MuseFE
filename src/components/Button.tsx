"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonHierarchy = "primary" | "secondary" | "accent" | "destructive";
type ButtonSize = "large" | "medium";

type ButtonProps = {
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const hierarchyStyles: Record<ButtonHierarchy, {
  base: string;
  hover: string;
  pressed: string;
  disabled: string;
}> = {
  primary: {
    base: "bg-neutral-900 text-neutral-50 border border-transparent",
    hover: "hover:bg-[#f5f5f51f] hover:text-neutral-900 hover:border-[#f5f5f533] hover:backdrop-blur-[10.5px] hover:shadow-[0_1px_1.75px_rgba(32,29,31,0.13)]",
    pressed: "active:bg-[#201d1f21] active:text-neutral-900 active:border-[#f5f5f533] active:backdrop-blur-[10.5px]",
    disabled: "disabled:bg-neutral-300 disabled:text-neutral-400 disabled:shadow-none",
  },
  secondary: {
    base: "bg-neutral-50 text-neutral-900 border border-neutral-200",
    hover: "hover:bg-[#f5f5f51f] hover:border-[#38333633] hover:backdrop-blur-[10.5px] hover:shadow-[0_1px_1.75px_rgba(32,29,31,0.13)]",
    pressed: "active:bg-neutral-900/[0.13] active:border-[#38333633] active:backdrop-blur-[10.5px]",
    disabled: "disabled:bg-neutral-300 disabled:text-neutral-400 disabled:border-transparent disabled:shadow-none",
  },
  accent: {
    base: "bg-pink-400 text-neutral-50 border border-neutral-200",
    hover: "hover:bg-[#383336] hover:text-pink-400 hover:border-transparent hover:backdrop-blur-[10.5px] hover:shadow-[0_1px_1.75px_rgba(32,29,31,0.13)]",
    pressed: "active:bg-neutral-900 active:text-pink-400 active:border-transparent",
    disabled: "disabled:bg-neutral-300 disabled:text-neutral-400 disabled:border-transparent disabled:shadow-none",
  },
  destructive: {
    base: "bg-neutral-50 text-error-500 border border-error-500",
    hover: "hover:bg-[#fff1f0]",
    pressed: "active:bg-[#ffd5d1] active:text-[#751d15]",
    disabled: "disabled:bg-neutral-300 disabled:text-neutral-400 disabled:border-transparent disabled:shadow-none",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  large: "h-[60px] px-[30px] py-4 text-[20px] leading-[1.6] font-semibold gap-2.5",
  medium: "h-12 px-6 py-2 text-[16px] leading-[1.5] font-semibold tracking-[-0.02em] gap-2.5",
};

export function Button({
  hierarchy = "primary",
  size = "large",
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const styles = hierarchyStyles[hierarchy];

  return (
    <button
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-full cursor-pointer transition-colors",
        sizeStyles[size],
        styles.base,
        !disabled && styles.hover,
        !disabled && styles.pressed,
        styles.disabled,
        "disabled:cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {leftIcon && <span className="flex shrink-0">{leftIcon}</span>}
      <span className="text-center">{children}</span>
      {rightIcon && <span className="flex shrink-0">{rightIcon}</span>}
    </button>
  );
}
