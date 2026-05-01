import { ModelGridCard } from "./ModelGridCard";
import { TOP_5_MODELS } from "../_data";
import type { Model } from "../_types";

type TopRankingSectionProps = {
  categoryLabel?: string;
  onModelClick?: (model: Model) => void;
};

export function TopRankingSection({
  categoryLabel,
  onModelClick,
}: TopRankingSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          {categoryLabel ? (
            <span className="text-heading-xs text-neutral-700">
              {categoryLabel}
            </span>
          ) : null}
          <h2 className="text-heading-m text-neutral-900">
            OO 인상의 모델 실시간 랭킹 🔥
          </h2>
        </div>
        <button
          type="button"
          className="text-caption-m text-neutral-700 shrink-0 cursor-pointer hover:underline"
        >
          전체 보기
        </button>
      </header>

      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
        {TOP_5_MODELS.map((model) => (
          <ModelGridCard key={model.id} model={model} showRank onClick={onModelClick} />
        ))}
      </div>

      <div className="flex lg:hidden gap-3 overflow-x-auto snap-x scroll-smooth pb-2 -mx-6 px-6 md:-mx-30 md:px-30">
        {TOP_5_MODELS.map((model) => (
          <div
            key={model.id}
            className="snap-start shrink-0 w-2/5 sm:w-1/3 md:w-1/4"
          >
            <ModelGridCard model={model} showRank />
          </div>
        ))}
      </div>
    </section>
  );
}
