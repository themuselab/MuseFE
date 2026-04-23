"use client";

import { AGE_GROUPS } from "@/constants/app";

type AgeGroupSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AgeGroupSelector({ value, onChange }: AgeGroupSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {AGE_GROUPS.map((group) => {
        const selected = value === group.value;
        return (
          <button
            key={group.value}
            type="button"
            onClick={() => onChange(group.value)}
            className={[
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 transition-colors cursor-pointer select-none",
              "text-caption-m",
              selected
                ? "border-pink-400 text-pink-500 bg-pink-50"
                : "border-neutral-200 text-neutral-500 bg-neutral-50 hover:bg-neutral-100",
            ].join(" ")}
            aria-pressed={selected}
          >
            <span
              className={[
                "w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                selected ? "bg-transparent" : "border border-neutral-300",
              ].join(" ")}
            >
              {selected && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.92 7.58L5.5 10.17L11.08 4.58"
                    stroke="#F3498D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            {group.label}
          </button>
        );
      })}
    </div>
  );
}
