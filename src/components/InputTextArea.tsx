"use client";

import {
  type ChangeEvent,
  type TextareaHTMLAttributes,
  useId,
  useState,
} from "react";

type InputTextAreaSize = "large" | "small";

type InputTextAreaProps = {
  label: string;
  required?: boolean;
  helperText?: string;
  size?: InputTextAreaSize;
  destructive?: boolean;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "defaultValue" | "onChange" | "id" | "size"
>;

export function InputTextArea({
  label,
  required = false,
  helperText,
  size = "large",
  destructive = false,
  maxLength,
  value,
  defaultValue,
  onChange,
  className = "",
  placeholder,
  ...rest
}: InputTextAreaProps) {
  const id = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internal;
  const hasValue = currentValue.length > 0;

  const borderColor = destructive
    ? "border-error-500"
    : hasValue
      ? "border-neutral-400"
      : "border-neutral-200";
  const helperColor = destructive ? "text-error-700" : "text-neutral-500";

  const labelClass = size === "large" ? "text-label-l" : "text-caption-m";
  const inputClass = size === "large" ? "text-input-l" : "text-input-s";
  const counterClass = size === "large" ? "text-input-s" : "text-caption-s";
  const helperClass = size === "large" ? "text-caption-m" : "text-caption-s";

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      <div className="px-1">
        <label htmlFor={id} className={`${labelClass} text-neutral-700`}>
          {label}
        </label>
        {required && (
          <span className="text-caption-m ml-0.5 text-pink-400">*</span>
        )}
      </div>

      <div
        className={`relative h-30 w-full shrink-0 rounded-sm border bg-neutral-50 ${borderColor}`}
      >
        <textarea
          id={id}
          rows={1}
          value={currentValue}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => {
            if (!isControlled) setInternal(e.target.value);
            onChange?.(e);
          }}
          className={`block h-full w-full resize-none border-0 bg-transparent p-2 pb-10 outline-none ${inputClass} text-neutral-900 placeholder:text-neutral-500`}
          {...rest}
        />
        {maxLength !== undefined && (
          <p
            className={`absolute right-1 bottom-0 ${counterClass} text-neutral-400`}
          >
            {currentValue.length}/{maxLength}
          </p>
        )}
      </div>

      {helperText && (
        <p className={`px-1 ${helperClass} ${helperColor}`}>{helperText}</p>
      )}
    </div>
  );
}
