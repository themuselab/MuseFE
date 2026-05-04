"use client";

import { ModelCarousel } from "./ModelCarousel";

export function CatalogSection() {
  return (
    <section className="relative w-full bg-neutral-50 overflow-hidden">
      {/* 배경 blur ellipse */}
      <div
        className="absolute -left-[562px] -top-[59px] w-[1468px] h-[1468px] rounded-full opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, #FFD1E3 0%, rgba(223,186,227,0) 100%)",
          filter: "blur(175px)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[184px] py-[120px] flex flex-col items-center gap-[60px] max-md:px-6 max-md:py-20">
        {/* 헤더 */}
        <div className="flex flex-col items-center gap-6 w-full">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-400 text-heading-xs text-pink-400">
            Catalog
          </span>
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="text-heading-s text-neutral-700 text-center">
              인상 기반 모델 카탈로그
            </p>
            <h2 className="text-display-m text-neutral-900 text-center max-md:text-heading-l">
              업종별로 검증된 모델 인상
            </h2>
          </div>
        </div>

        {/* 캐러셀 */}
        <ModelCarousel />
      </div>
    </section>
  );
}
