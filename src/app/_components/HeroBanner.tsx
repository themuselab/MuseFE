"use client";

import Image from "next/image";

export function HeroBanner() {
  return (
    <div className="w-full bg-neutral-900 h-34 relative overflow-hidden">
      {/* 좌측 텍스트 — 1440px 컨테이너 기준 */}
      <div className="max-w-360 mx-auto relative h-full">
        <div className="absolute left-60 top-8 flex flex-col gap-2 max-md:left-6">
          <p className="text-heading-m text-neutral-50">
            🎁 신규 가입자를 위한 혜택!
          </p>
          <p className="text-heading-xs text-neutral-50">
            오늘 가입시 5개의 AI 모델 생성권 무료 증정
          </p>
        </div>

        {/* 우측 쿠폰 카드 */}
        <div
          className="absolute right-55 -top-6.25 max-md:right-6"
          style={{ transform: "rotate(-13deg)" }}
        >
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
      </div>
    </div>
  );
}
