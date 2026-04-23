import { PlaceholderBox } from "./PlaceholderBox";
import type { TopModel } from "../_types";

type TopModelCardProps = {
  model: TopModel;
};

export function TopModelCard({ model }: TopModelCardProps) {
  return (
    <article className="flex flex-col gap-4 w-full min-w-36 md:min-w-0">
      <div className="relative">
        <PlaceholderBox className="w-full aspect-3/4 rounded-md" />
        <span className="absolute top-0 left-0 w-7 h-7 rounded-tl-md rounded-br-md bg-neutral-900 text-neutral-50 text-label-m flex items-center justify-center">
          {model.rank}
        </span>
      </div>
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
