"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { ChipButton } from "@/components/ChipButton";
import { useCatalogModels } from "@/hooks/useCatalogModels";
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
  SortOption,
} from "../_types";

type FilterModalProps = {
  open: boolean;
  appliedFilters: FilterState;
  initialFilters: FilterState;
  sort: SortOption;
  keyword: string;
  onClose: () => void;
  onCommit: (next: FilterState) => void;
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
    value === "sophisticated" ||
    value === "friendly" ||
    value === "comfortable" ||
    value === "professional" ||
    value === "lively"
  );
}

const PREVIEW_DEBOUNCE_MS = 250;

export function FilterModal({
  open,
  appliedFilters,
  initialFilters,
  sort,
  keyword,
  onClose,
  onCommit,
}: FilterModalProps) {
  // 모달 안에서만 임시 보관되는 draft. 모달 열릴 때 외부 적용된 filters로 초기화.
  const [draft, setDraft] = useState<FilterState>(appliedFilters);

  useEffect(() => {
    if (open) setDraft(appliedFilters);
  }, [open, appliedFilters]);

  // 미리보기 카운트용 debounce된 draft (BE 호출 빈도 제한)
  const [debouncedDraft, setDebouncedDraft] = useState<FilterState>(draft);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedDraft(draft), PREVIEW_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [draft]);

  const previewQuery = useCatalogModels(
    open
      ? {
          gender: debouncedDraft.gender,
          age: debouncedDraft.age,
          primaryLabel: debouncedDraft.impression,
          keyword,
          sort,
        }
      : undefined,
  );

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const previewCount = previewQuery.data?.total;
  const isPreviewLoading =
    previewQuery.isLoading ||
    previewQuery.isFetching ||
    debouncedDraft !== draft;

  const handleReset = () => setDraft(initialFilters);

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
                  selected={draft.impression === option.value}
                  onClick={() => {
                    if (isImpression(option.value)) {
                      setDraft((prev) => ({ ...prev, impression: option.value as ImpressionFilter }));
                    }
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
                  selected={draft.gender === option.value}
                  onClick={() => {
                    if (isGender(option.value)) {
                      setDraft((prev) => ({ ...prev, gender: option.value as GenderFilter }));
                    }
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
                  selected={draft.age === option.value}
                  onClick={() => {
                    if (isAge(option.value)) {
                      setDraft((prev) => ({ ...prev, age: option.value as AgeFilter }));
                    }
                  }}
                />
              ))}
            </div>
          </section>
        </div>

        <footer className="flex gap-3 justify-center">
          <Button hierarchy="secondary" size="medium" onClick={handleReset}>
            초기화
          </Button>
          <Button
            hierarchy="primary"
            size="medium"
            onClick={() => onCommit(draft)}
          >
            {isPreviewLoading || previewCount === undefined
              ? "모델 보기"
              : `${previewCount}명의 모델보기`}
          </Button>
        </footer>
      </div>
    </div>
  );
}
