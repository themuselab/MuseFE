"use client";

import { useEffect, useRef, useState } from "react";
import { SORT_OPTIONS } from "../_data";
import type { SortOption } from "../_types";
import { CreditTooltip } from "./CreditTooltip";
import { SortSelect } from "./SortSelect";

type ModelStatsBarProps = {
  total: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.667" stroke="#92878C" strokeWidth="1.5" />
      <path
        d="M8 11.333V7.667"
        stroke="#92878C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="5" r="0.5" fill="#92878C" />
    </svg>
  );
}

export function ModelStatsBar({ total, sort, onSortChange }: ModelStatsBarProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tooltipOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tooltipOpen]);

  return (
    <div className="flex items-center justify-between gap-2 pl-3 w-full">
      <div className="flex items-center gap-2" ref={wrapperRef}>
        <span className="text-caption-m text-neutral-500">총 {total}명</span>
        <div className="relative">
          <button
            type="button"
            aria-label="크레딧 안내"
            aria-expanded={tooltipOpen}
            onClick={() => setTooltipOpen((v) => !v)}
            className="flex items-center justify-center cursor-pointer"
          >
            <InfoIcon />
          </button>
          {tooltipOpen ? (
            <div className="absolute top-full left-0 mt-2 z-20">
              <CreditTooltip />
            </div>
          ) : null}
        </div>
      </div>
      <SortSelect
        items={SORT_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
        value={sort}
        onChange={(v) => {
          if (v === "recommend" || v === "latest") onSortChange(v);
        }}
      />
    </div>
  );
}
