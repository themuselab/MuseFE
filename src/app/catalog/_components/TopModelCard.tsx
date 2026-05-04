import { RankingCard } from "@/components/RankingCard";
import type { TopModel } from "../_types";

type TopModelCardProps = {
  model: TopModel;
  onClick?: (model: TopModel) => void;
};

export function TopModelCard({ model, onClick }: TopModelCardProps) {
  if (!onClick) {
    return (
      <article className="flex flex-col gap-4 w-full min-w-36 md:min-w-0">
        <RankingCard
          rank={model.rank}
          imageUrl={model.imageUrl}
          alt={model.name}
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-heading-xs text-neutral-900">{model.name}</h3>
          <div className="flex flex-wrap gap-1.5">
            {model.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-md bg-neutral-100 text-caption-m text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick(model)}
      className="flex flex-col gap-4 w-full min-w-36 md:min-w-0 text-left cursor-pointer"
    >
      <RankingCard
        rank={model.rank}
        imageUrl={model.imageUrl}
        alt={model.name}
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-heading-xs text-neutral-900">{model.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          {model.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-md bg-neutral-100 text-caption-m text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
