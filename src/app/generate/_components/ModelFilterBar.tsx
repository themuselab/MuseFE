"use client";

import { FilterButton } from "@/components/FilterButton";

type ModelFilterBarProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onFilterOpen: () => void;
};

const FILTER_LABELS = ["성별", "연령대", "인상"] as const;

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 19A8 8 0 1011 3a8 8 0 000 16zM21 21l-4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ModelFilterBar({
  keyword,
  onKeywordChange,
  onFilterOpen,
}: ModelFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 w-full">
      <div className="flex items-center gap-2">
        <FilterButton onClick={onFilterOpen} />
        {FILTER_LABELS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={onFilterOpen}
            className="inline-flex items-center justify-center px-2 py-1.5 rounded-sm border border-neutral-200 bg-neutral-50 text-body-l text-neutral-500 cursor-pointer hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-114">
        <input
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="키워드 검색"
          className="w-full p-3 pr-11 rounded-sm border border-neutral-200 bg-neutral-50 text-body-l text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-pink-400 transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
          <SearchIcon />
        </span>
      </div>
    </div>
  );
}
