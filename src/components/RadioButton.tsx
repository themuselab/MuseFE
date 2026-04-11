"use client";

import { type InputHTMLAttributes, useId } from "react";

type RadioButtonProps = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id">;

export function RadioButton({
  label,
  checked,
  className = "",
  ...rest
}: RadioButtonProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={`inline-flex items-center gap-2 cursor-pointer select-none ${className}`}>
      <input
        id={id}
        type="radio"
        checked={checked}
        className="peer sr-only"
        {...rest}
      />
      <div
        className={[
          "w-6 h-6 rounded-full flex items-center justify-center p-0.5 transition-colors",
          checked
            ? "bg-pink-100"
            : "bg-transparent border border-neutral-200",
        ].join(" ")}
      >
        {checked && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.33 8.67L6.33 11.67L12.67 5.33"
              stroke="#F3498D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && (
        <span className="text-[14px] leading-[1.43] font-medium text-neutral-700">
          {label}
        </span>
      )}
    </label>
  );
}
