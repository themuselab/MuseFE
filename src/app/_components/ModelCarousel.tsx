"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ModelCard = {
  id: number;
  label: string;
  color: string;
  imageUrl?: string;
};

const MODEL_CARDS: ModelCard[] = [
  { id: 1, label: "세련된 전문가", color: "#F3498D", imageUrl: "/images/landing/model-1.png" },
  { id: 2, label: "신뢰감 있는 리더", color: "#A63EB1", imageUrl: "/images/landing/model-2.png" },
  { id: 3, label: "친근한 이웃", color: "#92878C" },
  { id: 4, label: "활발한 크리에이터", color: "#E6196B" },
  { id: 5, label: "편안한 상담사", color: "#862D8F" },
];

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = MODEL_CARDS.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex(((index % total) + total) % total);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [total, isTransitioning]
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
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, total]);

  function getCardStyle(index: number) {
    const diff = ((index - activeIndex + total) % total) - Math.floor(total / 2);
    const normalizedDiff =
      diff > Math.floor(total / 2)
        ? diff - total
        : diff < -Math.floor(total / 2)
          ? diff + total
          : diff;

    const isCenter = normalizedDiff === 0;
    const isLeft = normalizedDiff === -1 || (normalizedDiff === total - 1);
    const isRight = normalizedDiff === 1 || (normalizedDiff === -(total - 1));

    if (isCenter) {
      return {
        transform: "translateX(0) scale(1)",
        zIndex: 30,
        opacity: 1,
        filter: "none",
      };
    }
    if (isLeft) {
      return {
        transform: "translateX(-65%) scale(0.88)",
        zIndex: 20,
        opacity: 0.4,
        filter: "none",
      };
    }
    if (isRight) {
      return {
        transform: "translateX(65%) scale(0.88)",
        zIndex: 20,
        opacity: 0.4,
        filter: "none",
      };
    }
    return {
      transform: `translateX(${normalizedDiff > 0 ? "120%" : "-120%"}) scale(0.7)`,
      zIndex: 10,
      opacity: 0,
      filter: "none",
    };
  }

  const activeCard = MODEL_CARDS[activeIndex];

  return (
    <div
      className="relative w-full max-w-[616px] h-[393px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 카드들 */}
      <div className="relative w-full h-full flex items-center justify-center">
        {MODEL_CARDS.map((card, index) => {
          const style = getCardStyle(index);
          const isActive = index === activeIndex;

          return (
            <div
              key={card.id}
              className="absolute w-[284px] h-[393px] rounded-lg transition-all duration-500 ease-in-out"
              style={{
                ...style,
                border: isActive
                  ? `2px solid ${card.color}`
                  : "1px solid #E8E3E6",
                boxShadow: isActive
                  ? `0 1px 14px rgba(0,0,0,0.13)`
                  : "none",
              }}
            >
              {/* 카드 내부 — 이미지 또는 플레이스홀더 */}
              <div className="relative w-full h-full rounded-lg bg-neutral-200 flex flex-col items-center justify-center gap-3 overflow-hidden">
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.label}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div
                      className="w-[107px] h-[145px] rounded-t-[371px]"
                      style={{ backgroundColor: isActive ? card.color + "33" : "#92878C33" }}
                    />
                    <span
                      className="text-label-m"
                      style={{ color: isActive ? card.color : "#92878C" }}
                    >
                      {card.label}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 좌우 화살표 */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded flex items-center justify-center bg-neutral-900/20 backdrop-blur-sm cursor-pointer z-40 hover:bg-neutral-900/40 transition-colors"
        style={{ boxShadow: "0 1px 7px rgba(0,0,0,0.25)" }}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded flex items-center justify-center bg-neutral-900/20 backdrop-blur-sm cursor-pointer z-40 hover:bg-neutral-900/40 transition-colors"
        style={{ boxShadow: "0 1px 7px rgba(0,0,0,0.25)" }}
      >
        <ArrowIcon direction="right" />
      </button>

      {/* 인디케이터 (프라이머리 컬러 dot) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {MODEL_CARDS.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor:
                i === activeIndex ? activeCard.color : "#B6AFB3",
              transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
