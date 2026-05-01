"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";
import { ChipButton } from "@/components/ChipButton";
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  IMPRESSION_OPTIONS,
} from "../_data";
import type {
  AgeFilter,
  FilterState,
  GenderFilter,
  ImpressionFilter,
} from "../_types";

type FilterModalProps = {
  open: boolean;
  filters: FilterState;
  matchCount: number;
  onClose: () => void;
  onGenderChange: (gender: GenderFilter) => void;
  onAgeChange: (age: AgeFilter) => void;
  onImpressionChange: (impression: ImpressionFilter) => void;
  onReset: () => void;
  onApply: () => void;
};

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function isGender(value: string): value is GenderFilter {
  return value === "all" || value === "female" || value === "male";
}

function isAge(value: string): value is AgeFilter {
  return (
    value === "all" ||
    value === "20s" ||
    value === "30s" ||
    value === "40s" ||
    value === "50s" ||
    value === "60s_plus"
  );
}

function isImpression(value: string): value is ImpressionFilter {
  return (
    value === "all" ||
    value === "trust" ||
    value === "friendly" ||
    value === "intimate" ||
    value === "sophisticated" ||
    value === "lively" ||
    value === "comfortable"
  );
}

export function FilterModal({
  open,
  filters,
  matchCount,
  onClose,
  onGenderChange,
  onAgeChange,
  onImpressionChange,
  onReset,
  onApply,
}: FilterModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-150 max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-50 shadow-xl flex flex-col gap-12 p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h2 className="text-heading-m text-neutral-900">필터</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-neutral-700 cursor-pointer hover:text-neutral-900"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h3 className="text-caption-m text-neutral-500">인상</h3>
            <div className="flex flex-wrap gap-2">
              {IMPRESSION_OPTIONS.map((option) => (
                <ChipButton
                  key={option.value}
                  label={option.label}
                  variant="square"
                  selected={filters.impression === option.value}
                  onClick={() => {
                    if (isImpression(option.value)) onImpressionChange(option.value);
                  }}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-caption-m text-neutral-500">성별</h3>
            <div className="flex flex-wrap gap-2">
              {GENDER_OPTIONS.map((option) => (
                <ChipButton
                  key={option.value}
                  label={option.label}
                  variant="square"
                  selected={filters.gender === option.value}
                  onClick={() => {
                    if (isGender(option.value)) onGenderChange(option.value);
                  }}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h3 className="text-caption-m text-neutral-500">연령대</h3>
            <div className="flex flex-wrap gap-2">
              {AGE_OPTIONS.map((option) => (
                <ChipButton
                  key={option.value}
                  label={option.label}
                  variant="square"
                  selected={filters.age === option.value}
                  onClick={() => {
                    if (isAge(option.value)) onAgeChange(option.value);
                  }}
                />
              ))}
            </div>
          </section>
        </div>

        <footer className="flex gap-3 justify-center">
          <Button hierarchy="secondary" size="medium" onClick={onReset}>
            초기화
          </Button>
          <Button hierarchy="primary" size="medium" onClick={onApply}>
            {matchCount}명의 모델보기
          </Button>
        </footer>
      </div>
    </div>
  );
}
