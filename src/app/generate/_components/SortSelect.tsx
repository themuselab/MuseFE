"use client";

import { useEffect, useRef, useState } from "react";

type SortItem = {
  label: string;
  value: string;
};

type SortSelectProps = {
  items: SortItem[];
  value: string;
  onChange: (value: string) => void;
};

function ArrowDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 7.5L9 11.5L13 7.5"
        stroke="#92878C"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SortSelect({ items, value, onChange }: SortSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const selected = items.find((i) => i.value === value);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-0.5 cursor-pointer text-caption-m text-neutral-500"
      >
        <span>{selected?.label ?? "정렬"}</span>
        <ArrowDownIcon open={open} />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute top-full right-0 mt-1 z-30 min-w-20 rounded-sm border border-neutral-200 bg-neutral-50 overflow-hidden shadow-card-hover"
        >
          {items.map((item) => {
            const isSelected = item.value === value;
            return (
              <li key={item.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={`w-full h-10 px-4 flex items-center justify-center text-caption-m cursor-pointer transition-colors ${
                    isSelected
                      ? "text-neutral-900 font-semibold"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
