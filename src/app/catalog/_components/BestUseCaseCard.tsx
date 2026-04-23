import { ArrowIcon } from "@/components/ArrowIcon";
import type { UseCase } from "../_types";

type BestUseCaseCardProps = {
  useCase: UseCase;
};

export function BestUseCaseCard({ useCase }: BestUseCaseCardProps) {
  return (
    <article className="flex flex-col gap-4">
      <div className="relative bg-neutral-200 rounded-md overflow-hidden aspect-2/1">
        <div className="grid grid-cols-2 h-full">
          <div className="relative flex items-end justify-center pb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-50 text-caption-s text-neutral-500">
              모델 원본
            </span>
          </div>
          <div className="relative flex items-end justify-center pb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-caption-s text-pink-700">
              muse 생성 광고
            </span>
          </div>
        </div>
        <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-500 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center shadow-sm">
          <ArrowIcon direction="right" size="sm" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-md bg-pink-100 text-caption-m text-pink-800">
            {useCase.category}
          </span>
        </div>
        <h3 className="text-heading-s text-neutral-900">{useCase.title}</h3>
        <p className="text-body-m text-neutral-600">{useCase.description}</p>
      </div>
    </article>
  );
}
