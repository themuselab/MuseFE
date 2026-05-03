"use client";

import Image from "next/image";

function ModelCardPlaceholder() {
  return (
    <div className="w-[66px] h-[91px] rounded bg-neutral-200 flex flex-col items-center justify-center gap-1 shrink-0">
      <div className="w-[40px] h-[50px] rounded-t-[371px] bg-neutral-300" />
      <span className="text-[8px] font-medium text-neutral-400">모델</span>
    </div>
  );
}

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
              {[1, 2, 3, 4].map((i) => (
                <ModelCardPlaceholder key={i} />
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
            <div className="w-full max-w-[296px] h-[370px] rounded-lg bg-neutral-100 flex items-center justify-center">
              <span className="text-heading-xs text-neutral-400 text-center">
                이미지 준비중
              </span>
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
              src="/images/landing/step3.png"
              width={296}
              height={296}
              alt="제품 합성 결과"
              className="w-full aspect-square max-h-80 rounded-lg object-cover"
            />
            <GradientDot />
          </div>
        </div>
      </div>
    </section>
  );
}
