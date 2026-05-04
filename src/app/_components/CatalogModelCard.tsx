"use client";

import Image from "next/image";
import { RadarChart } from "./RadarChart";

export type CatalogModel = {
  id: string;
  name: string;
  age: string;
  gender: "여" | "남";
  imageUrl?: string;
  highlights: string[];
  industries: string[];
};

type CatalogModelCardProps = {
  model: CatalogModel;
};

export function CatalogModelCard({ model }: CatalogModelCardProps) {
  return (
    <div
      className="w-[851px] rounded-3xl bg-neutral-50 p-12 flex gap-10"
      style={{ boxShadow: "0 1px 14px 4px rgba(32,29,31,0.08)" }}
    >
      {/* 좌: 모델 이미지 */}
      <div className="relative w-[357px] h-[638px] shrink-0 rounded-md overflow-hidden bg-neutral-100">
        {model.imageUrl && (
          <Image
            src={model.imageUrl}
            alt={`${model.name} 모델 사진`}
            fill
            className="object-cover"
            sizes="357px"
          />
        )}
      </div>

      {/* 우: 정보 영역 (상단 정렬) */}
      <div className="flex-1 flex flex-col gap-4">
        {/* 헤더: 이름 + 연령·성별 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-heading-m text-neutral-900">{model.name}</h3>
          <div className="flex items-center gap-2 text-body-l text-neutral-500">
            <span>{model.age}</span>
            <span className="w-[3px] h-[3px] rounded-full bg-neutral-200" />
            <span>{model.gender}</span>
          </div>
        </div>

        {/* 레이더 차트 */}
        <RadarChart
          highlights={model.highlights}
          className="w-[358px] h-[332px]"
        />

        {/* 업종 태그 */}
        <div className="flex items-center gap-[11px] flex-wrap">
          {model.industries.map((industry) => (
            <span
              key={industry}
              className="p-2 rounded-full bg-pink-100 text-body-l text-pink-700"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
