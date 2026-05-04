"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CatalogModelCard, type CatalogModel } from "./CatalogModelCard";

const CATALOG_MODELS: CatalogModel[] = [
  {
    id: "SFWtA",
    name: "남수빈",
    age: "20대",
    gender: "여",
    highlights: ["신뢰감", "세련됨"],
    industries: ["가전·생활·인테리어", "여행·항공"],
  },
  {
    id: "K4qWLX",
    name: "최서현",
    age: "30대",
    gender: "여",
    highlights: ["신뢰감", "친근함"],
    industries: ["교육", "여행·항공"],
  },
  {
    id: "BfLwI",
    name: "한진혁",
    age: "20대",
    gender: "남",
    highlights: ["신뢰감", "전문성"],
    industries: ["금융·보험", "경영·회계·사무"],
  },
  {
    id: "W0K2J5",
    name: "홍지영",
    age: "20대",
    gender: "여",
    highlights: ["활발함", "친근함"],
    industries: ["헬스·스포츠", "보건·의료"],
  },
  {
    id: "uqsrm",
    name: "오재윤",
    age: "20대",
    gender: "남",
    highlights: ["친근함", "편안함"],
    industries: ["건설", "이용·숙박·여행·오락·스포츠"],
  },
  {
    id: "eNU9g",
    name: "권예린",
    age: "20대",
    gender: "여",
    highlights: ["활발함", "친근함"],
    industries: ["헬스·스포츠", "교육·자연·사회과학"],
  },
];

const AUTO_ROTATE_MS = 3500;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FBFBFB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export function ModelCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = CATALOG_MODELS.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, total]);

  const activeModel = CATALOG_MODELS[activeIndex];

  return (
    <div
      className="relative w-full flex flex-col items-center gap-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 카드 + 좌우 화살표 */}
      <div className="relative flex items-center justify-center">
        <button
          type="button"
          onClick={prev}
          aria-label="이전 모델"
          className="absolute -left-27 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full flex items-center justify-center bg-neutral-300/30 backdrop-blur-sm cursor-pointer z-10 hover:bg-neutral-300/50 transition-colors"
          style={{ boxShadow: "0 1px 10px rgba(0,0,0,0.25)" }}
        >
          <ArrowIcon direction="left" />
        </button>

        <CatalogModelCard model={activeModel} />

        <button
          type="button"
          onClick={next}
          aria-label="다음 모델"
          className="absolute -right-27 top-1/2 -translate-y-1/2 w-15 h-15 rounded-full flex items-center justify-center bg-neutral-300/30 backdrop-blur-sm cursor-pointer z-10 hover:bg-neutral-300/50 transition-colors"
          style={{ boxShadow: "0 1px 10px rgba(0,0,0,0.25)" }}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      {/* 인디케이터 dot */}
      <div className="flex items-center gap-2">
        {CATALOG_MODELS.map((model, i) => (
          <button
            key={model.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${i + 1}번째 모델로 이동`}
            className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: i === activeIndex ? "#F3498D" : "#B6AFB3",
              transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
