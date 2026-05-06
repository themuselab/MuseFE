"use client";

import Image from "next/image";

const STEP1_CARDS = [
  { src: "/images/landing/step1/card-1.png", alt: "모델 카드 1" },
  { src: "/images/landing/step1/card-2.png", alt: "모델 카드 2" },
  { src: "/images/landing/step1/card-3.png", alt: "모델 카드 3" },
  { src: "/images/landing/step1/card-4.png", alt: "모델 카드 4" },
];

// design.pen Group 33876 좌표를 320×420 프레임 기준으로 절대 배치
const STEP2_IMAGES = [
  { src: "/images/landing/step2/45deg.png", alt: "45도 모델", x: 17, y: 0, w: 103, h: 185, rotate: 0, shadow: false },
  { src: "/images/landing/step2/offgaze.png", alt: "오프게이즈 모델", x: 152, y: 0, w: 142, h: 254, rotate: 0, shadow: false },
  { src: "/images/landing/step2/fullbody.png", alt: "풀바디 모델", x: 0, y: 147, w: 138, h: 247, rotate: 0, shadow: false },
  { src: "/images/landing/step2/action.png", alt: "액션 모델", x: 181, y: 172, w: 120, h: 214, rotate: -6.8, shadow: false },
  { src: "/images/landing/step2/front.png", alt: "정면 모델", x: 83, y: 74, w: 135, h: 242, rotate: 0, shadow: true },
];

function GradientDot() {
  return (
    <div
      className="absolute w-[3.8px] h-[3.35px] rounded-full"
      style={{
        background: "linear-gradient(270deg, #862D8F 0%, #E6196B 100%)",
        boxShadow: "0 1px 3.5px #FFD1E3, 0 4px 3.5px #fff",
        filter: "blur(0.26px)",
        bottom: "20px",
        right: "28px",
      }}
    />
  );
}

export function StepSection() {
  return (
    <section className="w-full bg-neutral-50">
      <div className="max-w-[1440px] mx-auto px-[120px] py-[120px] flex flex-col items-center gap-20 max-md:px-6 max-md:py-20">
        {/* 헤더 */}
        <div className="flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-400 text-heading-xs text-pink-400">
            How It works
          </span>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-display-m text-neutral-900 text-center max-md:text-heading-l">
              3단계면 완성
            </h2>
            <p className="text-heading-s text-neutral-700 text-center max-md:text-body-l">
              고르고, 생성하고, 적용하면 끝입니다
            </p>
          </div>
        </div>

        {/* STEP 카드 3개 */}
        <div className="flex gap-10 w-full max-md:flex-col">
          {/* STEP 01 */}
          <div className="relative flex-1 flex flex-col items-center gap-9 rounded-xl border border-neutral-200 shadow-[0_1px_3.5px_rgba(0,0,0,0.13)] bg-neutral-50 pt-10 pb-5 px-7">
            <div className="flex flex-col gap-4 w-full">
              <span className="text-label-l text-pink-400 tracking-[0.032em]">
                STEP 01
              </span>
              <h3 className="text-heading-l text-neutral-900">
                모델 카탈로그
              </h3>
              <p className="text-heading-s text-neutral-500">
                업종별로 검증된 모델 인상.{"\n"}바로 선택하면 됩니다.
              </p>
            </div>
            {/* 모델 카드 이미지들 — 데스크탑 2×2, 모바일/태블릿 1×4 가로 */}
            <div className="grid grid-cols-2 gap-[10.5px] justify-items-center w-full max-md:flex max-md:justify-center">
              {STEP1_CARDS.map((card) => (
                <Image
                  key={card.src}
                  src={card.src}
                  alt={card.alt}
                  width={150}
                  height={207}
                  className="w-[150px] h-[207px] rounded-md object-cover shrink-0"
                />
              ))}
            </div>
            <GradientDot />
          </div>

          {/* STEP 02 — 다크 */}
          <div className="flex-1 flex flex-col items-center gap-9 rounded-xl border border-transparent shadow-[0_1px_3.5px_rgba(0,0,0,0.13)] bg-neutral-900 pt-10 pb-5 px-7">
            <div className="flex flex-col gap-4 w-full">
              <span className="text-label-l text-pink-400 tracking-[0.032em]">
                STEP 02
              </span>
              <h3 className="text-heading-l text-neutral-50">
                브랜드 모델 생성
              </h3>
              <p className="text-heading-s text-neutral-500">
                선택한 인상 그대로.{"\n"}상세페이지·배너·영상 어디든 동일한 얼굴.
              </p>
            </div>
            <div className="relative w-full max-w-[320px] h-[420px]">
              {STEP2_IMAGES.map((img) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  className="absolute object-cover rounded-sm"
                  style={{
                    left: `${(img.x / 320) * 100}%`,
                    top: `${(img.y / 420) * 100}%`,
                    width: `${(img.w / 320) * 100}%`,
                    height: `${(img.h / 420) * 100}%`,
                    transform: img.rotate ? `rotate(${img.rotate}deg)` : undefined,
                    boxShadow: img.shadow ? "0 2.5px 4.3px rgba(0,0,0,0.25)" : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          {/* STEP 03 */}
          <div className="relative flex-1 flex flex-col items-center gap-9 rounded-xl border border-neutral-200 shadow-[0_1px_3.5px_rgba(0,0,0,0.13)] bg-neutral-50 pt-10 pb-5 px-7">
            <div className="flex flex-col gap-4 w-full">
              <span className="text-label-l text-pink-400 tracking-[0.032em]">
                STEP 03
              </span>
              <h3 className="text-heading-l text-neutral-900">
                제품 합성까지 한 번에
              </h3>
              <p className="text-heading-s text-neutral-500">
                모델에 제품을 바로 합성.{"\n"}광고 소재 완성까지 뮤즈 안에서.
              </p>
            </div>
            <Image
              src="/images/landing/step3-composite.png"
              width={320}
              height={420}
              alt="제품 합성 결과"
              className="w-full max-w-[320px] h-[420px] rounded-lg object-cover"
            />
            <GradientDot />
          </div>
        </div>
      </div>
    </section>
  );
}
