"use client";

import { useState, useRef, useEffect } from "react";

type DropdownSize = "large" | "small";

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  size?: DropdownSize;
  placeholder?: string;
  className?: string;
};

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#92878C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dropdown({
  items,
  value,
  onChange,
  size = "large",
  placeholder = "선택",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const isLarge = size === "large";

  return (
    <div ref={ref} className={`relative ${isLarge ? "w-[520px]" : "w-fit min-w-[110px]"} ${className}`}>
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "w-full flex items-center justify-between bg-neutral-50 border border-neutral-200 cursor-pointer transition-colors",
          isLarge
            ? "rounded-[12px] px-4 py-2.5"
            : "rounded-lg px-4 py-2.5 justify-center",
          "text-[14px] font-medium leading-[1.14]",
          selectedItem ? "text-neutral-700" : "text-neutral-500",
        ].join(" ")}
      >
        <span className={isLarge ? "" : "text-center flex-1"}>
          {selectedItem?.label ?? placeholder}
        </span>
        <ChevronDownIcon open={open} />
      </button>

      {/* 드롭다운 리스트 */}
      {open && (
        <div
          className={[
            "absolute top-full left-0 w-full z-50 border border-neutral-200 bg-neutral-50 overflow-hidden",
            isLarge ? "rounded-[12px] mt-1" : "rounded-lg mt-1",
          ].join(" ")}
        >
          {items.map((item) => {
            const isSelected = item.value === value;

            return (
              <div
                key={item.value}
                className="p-1 bg-neutral-50"
              >
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(item.value);
                    setOpen(false);
                  }}
                  className={[
                    "w-full cursor-pointer transition-colors rounded-lg",
                    "text-[14px] font-medium leading-[1.14]",
                    isLarge
                      ? "px-3 py-1.5 text-left"
                      : "h-8 px-3 flex items-center justify-center text-center",
                    isSelected
                      ? "bg-neutral-900 text-neutral-50"
                      : "bg-transparent text-neutral-700 hover:bg-neutral-800 hover:text-neutral-50",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
