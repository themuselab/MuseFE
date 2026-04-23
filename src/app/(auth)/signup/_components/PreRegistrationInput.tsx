"use client";

import {
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from "react";

type PreRegistrationInputProps = {
  label: string;
  required?: boolean;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function PreRegistrationInput({
  label,
  required = false,
  error,
  value,
  defaultValue,
  onFocus,
  onBlur,
  className = "",
  ...rest
}: PreRegistrationInputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = String(currentValue).length > 0;
  const isFloating = focused || hasValue;

  const borderColor = error
    ? "border-error-500"
    : focused
      ? "border-pink-400"
      : "border-neutral-200";

  const labelColor = error
    ? "text-error-500"
    : focused
      ? "text-pink-400"
      : "text-neutral-700";

  const LabelContent: ReactNode = (
    <>
      {label}
      {required && <span className="text-pink-400 ml-0.5">*</span>}
    </>
  );

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="relative">
        <label
          htmlFor={id}
          className={[
            "absolute left-3 transition-all pointer-events-none z-10",
            "text-[14px] font-medium leading-[1.143]",
            labelColor,
            isFloating
              ? "-top-[7px] bg-neutral-50 px-1"
              : "top-1/2 -translate-y-1/2 bg-transparent",
          ].join(" ")}
        >
          {LabelContent}
        </label>

        <div
          className={[
            "flex items-center rounded border transition-colors bg-neutral-50",
            borderColor,
            "px-3 py-3",
          ].join(" ")}
        >
          <input
            id={id}
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
              "text-[16px] leading-[1.5] font-medium text-neutral-900",
              "placeholder:text-neutral-500",
            ].join(" ")}
            {...rest}
          />
        </div>
      </div>

      {error && (
        <p className="mt-1 pl-3 text-[14px] leading-[1.143] font-normal text-error-500">
          {error}
        </p>
      )}
    </div>
  );
}
