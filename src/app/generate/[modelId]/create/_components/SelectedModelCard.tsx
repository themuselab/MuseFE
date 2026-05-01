import Image from "next/image";
import { INDUSTRY_MAIN_OPTIONS } from "@/constants/app";
import { RADAR_AXES } from "../../../_data";
import type { Model, RadarAxis } from "../../../_types";

type SelectedModelCardProps = {
  model: Model;
};

function getIndustryLabel(value: string): string {
  return (
    INDUSTRY_MAIN_OPTIONS.find((opt) => opt.value === value)?.label ?? value
  );
}

function getAxisLabel(axis: RadarAxis): string {
  return RADAR_AXES.find((a) => a.key === axis)?.label ?? axis;
}

function getTopTwoScores(scores: Model["scores"]) {
  return (Object.entries(scores) as [RadarAxis, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
}

export function SelectedModelCard({ model }: SelectedModelCardProps) {
  const topScores = getTopTwoScores(model.scores);
  const cover = model.imageUrls[0] ?? "";

  return (
    <article className="w-full lg:w-120 shrink-0 flex flex-col gap-10 p-6 lg:p-10 lg:pt-15 rounded-lg border border-neutral-200 bg-neutral-50">
      <div className="relative w-full aspect-3/4 rounded-md bg-neutral-100 overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={model.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 480px, 100vw"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-heading-s text-neutral-900">{model.name}</h2>
          <p className="flex items-center gap-2 text-body-l text-neutral-500">
            <span>{model.age}</span>
            <span
              aria-hidden="true"
              className="inline-block w-1 h-1 rounded-full bg-neutral-200"
            />
            <span>{model.gender}</span>
          </p>
        </div>

        <ul className="flex items-stretch rounded-sm bg-neutral-100/40 px-2 py-4 gap-7">
          {topScores.map(([axis, value]) => (
            <li
              key={axis}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <span className="text-heading-l text-pink-500">{value}</span>
              <span className="text-caption-m text-neutral-500">
                {getAxisLabel(axis)}
              </span>
            </li>
          ))}
        </ul>

        {model.recommendedIndustries.length > 0 ? (
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-body-l text-neutral-500 shrink-0">
              추천 업종
            </span>
            <div className="flex gap-2 flex-wrap">
              {model.recommendedIndustries.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-pink-50 text-neutral-900 border border-pink-100 text-caption-m"
                >
                  {getIndustryLabel(value)}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
