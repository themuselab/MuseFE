"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import { RadarChart } from "./RadarChart";
import { HeroBanner } from "./HeroBanner";

export function HeroSection() {
  return (
    <section className="relative w-full bg-neutral-50 overflow-hidden">
      {/* 배너 */}
      <HeroBanner />

      {/* 메인 Hero 콘텐츠 */}
      <div className="relative w-full max-w-[1440px] mx-auto">
        {/* 배경 레이더차트 */}
        <RadarChart className="absolute -left-[189px] top-[360px] w-[717px] h-[664px] opacity-30 pointer-events-none max-md:-left-[255px] max-md:top-[317px]" />

        {/* 콘텐츠 */}
        <div className="relative z-10 flex items-center justify-between gap-20 px-[120px] py-[216px] max-md:px-6 max-md:py-[196px] max-md:flex-col max-md:items-start">
          {/* 좌측 텍스트 */}
          <div className="flex flex-col gap-[82px] max-w-[468px] max-md:max-w-full">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <span
                  className="text-[28px] font-bold tracking-[-0.02em] bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #FFD1E3 0%, #DFBAE3 100%)",
                    fontFamily: "'Gmarket Sans', sans-serif",
                  }}
                >
                  muse.
                </span>
                <h1 className="text-display-2xl text-neutral-900 max-md:text-display-m">
                  광고,{"\n"}
                  이제 모델 없이{"\n"}
                  만드세요
                </h1>
              </div>
              <p className="text-heading-xs text-neutral-700">
                데이터가 고르고, 광고가 증명합니다.{"\u2028"}20만 장의 인상
                데이터로 업종별 최적 AI 모델을 즉시 생성합니다.
              </p>
            </div>

            {/* CTA 버튼 */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button hierarchy="accent" size="large" className="shrink-0 whitespace-nowrap">
                지금 바로 광고 생성하기
              </Button>
              <Button hierarchy="secondary" size="large" className="shrink-0 whitespace-nowrap">
                모델 카탈로그 보기
              </Button>
            </div>
          </div>

          {/* 우측 모델 이미지 */}
          <div className="relative max-md:hidden">
            {/* 메인 이미지 플레이스홀더 — gradient border via wrapper */}
            <div
              className="w-[492px] h-[492px] rounded-xl p-[2px] ml-[189px]"
              style={{
                background:
                  "linear-gradient(135deg, #FFD1E3 0%, #DFBAE3 100%)",
              }}
            >
              <Image
                src="/images/landing/hero-1.png"
                width={488}
                height={488}
                alt="AI 모델"
                priority
                className="w-full h-full rounded-[10px] object-cover"
              />
            </div>

            {/* 좌하단 겹치는 그림자 실루엣 */}
            <div
              className="absolute left-0 top-[70px] w-[282px] h-[423px] rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 15.75px 31.5px rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src="/images/landing/hero-2.png"
                width={282}
                height={423}
                alt="AI 모델 실루엣"
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
