import Image from "next/image";
import { RankingCard } from "@/components/RankingCard";
import type { Model } from "../_types";

type ModelGridCardProps = {
  model: Model;
  showRank?: boolean;
  onClick?: (model: Model) => void;
};

export function ModelGridCard({
  model,
  showRank = false,
  onClick,
}: ModelGridCardProps) {
  const content = (
    <>
      {showRank && model.rank !== undefined ? (
        <RankingCard
          rank={model.rank}
          imageUrl={model.imageUrl}
          alt={model.name}
        />
      ) : (
        <div className="relative w-full aspect-3/4 rounded-md bg-neutral-100 overflow-hidden">
          {model.imageUrl ? (
            <Image
              src={model.imageUrl}
              alt={model.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          ) : null}
        </div>
      )}
      <div className="flex flex-col gap-2 pl-2">
        <h3 className="text-heading-s text-neutral-900">{model.name}</h3>
        <div className="flex flex-wrap gap-1">
          {model.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-2 rounded-sm bg-neutral-100 text-caption-m text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => onClick(model)}
        aria-label={`${model.name} 상세 보기`}
        className="flex flex-col gap-3 w-full text-left cursor-pointer rounded-md transition-shadow hover:shadow-card-hover"
      >
        {content}
      </button>
    );
  }

  return <article className="flex flex-col gap-3 w-full">{content}</article>;
}
