"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative h-34 w-full overflow-hidden bg-neutral-900">
      {/* 좌측 텍스트 — 1440px 컨테이너 기준 */}
      <div className="relative mx-auto h-full max-w-360">
        <div className="absolute top-8 left-60 flex flex-col gap-2 max-md:left-6">
          <p className="text-heading-m text-neutral-50">
            🎁 신규 가입자를 위한 혜택!
          </p>
          <p className="text-heading-xs text-neutral-50">
            오늘 가입시 5개의 AI 모델 생성권 무료 증정
          </p>
        </div>

        {/* 우측 쿠폰 카드 */}
        <div className="absolute top-0 right-20 max-md:hidden">
          <Image
            src="/images/landing/early-bird.png"
            width={213}
            height={124}
            alt="얼리버드 최대 할인"
            priority
            style={{
              width: 213,
              height: 124,
              filter: "drop-shadow(0 1.5px 2.66px rgba(0,0,0,0.25))",
            }}
          />
        </div>

        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="배너 닫기"
          className="absolute top-6 right-6 flex h-6 w-6 cursor-pointer items-center justify-center text-neutral-50 transition-opacity hover:opacity-70"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
