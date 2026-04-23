"use client";

import {
  type InputHTMLAttributes,
  type ReactNode,
  useState,
  useId,
} from "react";

type TextFieldState = "default" | "error" | "success" | "disabled";

type TextFieldProps = {
  label: string;
  helperText?: string;
  state?: TextFieldState;
  rightIcon?: ReactNode;
  reserveHelperSpace?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

const borderColorMap: Record<TextFieldState, string> = {
  default: "border-neutral-400",
  error: "border-error-500",
  success: "border-success-500",
  disabled: "border-neutral-400",
};

const helperTextColorMap: Record<TextFieldState, string> = {
  default: "text-neutral-500",
  error: "text-[#751d15]",
  success: "text-[#155135]",
  disabled: "text-neutral-500",
};

export function TextField({
  label,
  helperText,
  state = "default",
  rightIcon,
  reserveHelperSpace = false,
  className = "",
  disabled,
  value,
  defaultValue,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = String(currentValue).length > 0;
  const isFloating = focused || hasValue;
  const isDisabled = state === "disabled" || disabled;

  const borderColor = focused && state === "default"
    ? "border-pink-400"
    : borderColorMap[state];

  const labelColor = focused && state === "default"
    ? "text-pink-400"
    : "text-neutral-700";

  const inputBg = isDisabled
    ? "bg-neutral-300"
    : focused
      ? "bg-neutral-50"
      : "bg-neutral-50 hover:bg-neutral-100";

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="relative">
        <label
          htmlFor={id}
          className={[
            "absolute left-3 transition-all pointer-events-none z-10",
            "font-medium text-[14px] leading-[1.14]",
            labelColor,
            isFloating
              ? "-top-1.75 bg-neutral-50 px-0.5"
              : "top-1/2 -translate-y-1/2 bg-transparent",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </label>

        <div
          className={[
            "flex items-center rounded-xl border transition-colors",
            borderColor,
            inputBg,
            "px-3 py-3 gap-2",
          ].join(" ")}
        >
          <input
            id={id}
            disabled={isDisabled}
            value={currentValue}
            onChange={(e) => {
              if (!isControlled) setInternalValue(e.target.value);
              rest.onChange?.(e);
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            className={[
              "flex-1 bg-transparent outline-none",
              "text-[16px] leading-[1.75] font-medium text-neutral-900",
              "placeholder:text-neutral-500",
              "disabled:text-neutral-400 disabled:cursor-not-allowed",
            ].join(" ")}
            {...rest}
          />
          {rightIcon && (
            <span className="flex shrink-0 text-neutral-500">{rightIcon}</span>
          )}
        </div>
      </div>

      {(helperText || reserveHelperSpace) && (
        <p
          className={[
            "mt-1 pl-3 text-[14px] leading-none font-normal",
            helperText
              ? (focused && state === "default"
                ? "text-pink-400"
                : helperTextColorMap[state])
              : "invisible",
          ].join(" ")}
        >
          {helperText || "\u00A0"}
        </p>
      )}
    </div>
  );
}
