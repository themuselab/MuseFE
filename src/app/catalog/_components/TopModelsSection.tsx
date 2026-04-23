"use client";

import Link from "next/link";
import { TopModelCard } from "./TopModelCard";
import { ArrowIcon } from "@/components/ArrowIcon";
import { TOP_MODELS } from "../_data";

type TopModelsSectionProps = {
  categoryLabel: string;
};

export function TopModelsSection({ categoryLabel }: TopModelsSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-caption-m text-neutral-500">
            muse에서 가장 인기 있는
          </span>
          <h2 className="text-heading-m md:text-heading-l text-neutral-900">
            {categoryLabel}의 모델 Top 5 🔥
          </h2>
        </div>
        <Link
          href="/catalog/all"
          className="text-caption-m text-neutral-700 shrink-0"
        >
          전체 보기
        </Link>
      </header>

      <div className="relative">
        <div className="hidden md:grid md:grid-cols-5 md:gap-5">
          {TOP_MODELS.map((model) => (
            <TopModelCard key={model.id} model={model} />
          ))}
        </div>
        <div className="flex md:hidden gap-3 overflow-x-auto snap-x pb-2 -mx-6 px-6">
          {TOP_MODELS.map((model) => (
            <div key={model.id} className="snap-start w-36 shrink-0">
              <TopModelCard model={model} />
            </div>
          ))}
        </div>
        <div className="md:hidden absolute top-1/3 right-0 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-neutral-50/90 border border-neutral-200 flex items-center justify-center shadow-sm">
            <ArrowIcon direction="right" size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
