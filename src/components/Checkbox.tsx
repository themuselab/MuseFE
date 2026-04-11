"use client";

import { type InputHTMLAttributes, useId } from "react";

type CheckboxProps = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id">;

export function Checkbox({
  label,
  checked,
  className = "",
  ...rest
}: CheckboxProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={`inline-flex items-center gap-2 cursor-pointer select-none ${className}`}>
      <div className="relative p-2 group">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          className="peer sr-only"
          {...rest}
        />
        {/* Unselected */}
        <div className="w-5 h-5 rounded-sm bg-neutral-200 peer-checked:bg-pink-100 flex items-center justify-center transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={checked ? "opacity-100" : "opacity-0"}
          >
            <path
              d="M3.33 8.67L6.33 11.67L12.67 5.33"
              stroke="#F3498D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {label && (
        <span className="text-[14px] leading-[1.43] font-medium text-neutral-700">
          {label}
        </span>
      )}
    </label>
  );
}
