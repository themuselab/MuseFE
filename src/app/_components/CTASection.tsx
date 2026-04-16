"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function CTASection() {
  const [email, setEmail] = useState("");

  return (
    <section className="w-full bg-neutral-50">
      <div className="flex w-full max-md:flex-col group/cta">
        {/* 좌측: 브랜드·소상공인 */}
        <div
          className="relative flex-1 py-[60px] overflow-hidden transition-all duration-400 ease-in-out md:hover:flex-[1.2] md:group-hover/cta:[&:not(:hover)]:flex-[0.8]"
          style={{
            background:
              "linear-gradient(135deg, #FFD1E3 0%, #DFBAE3 100%)",
          }}
        >
          <div className="flex flex-col gap-10 pl-[120px] pr-0 max-md:px-6">
            {/* 텍스트 */}
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center self-start gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-400 text-heading-xs text-pink-400">
                브랜드 · 소상공인
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-display-m text-neutral-900 max-md:text-heading-l">
                  광고 모델,{"\n"}이제 고용하지 마세요
                </h3>
                <p className="text-heading-s text-neutral-700 max-md:text-body-l">
                  업종에 맞는 모델을 골라 40초 안에 광고 소재까지.{"\n"}지금 바로
                  첫 번째 모델을 만들어보세요.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Button hierarchy="accent" size="large">
                무료로 시작하기
              </Button>
            </div>
          </div>
        </div>

        {/* 우측: 모델·인플루언서 */}
        <div
          className="relative flex-1 py-[60px] overflow-hidden transition-all duration-400 ease-in-out md:hover:flex-[1.2] md:group-hover/cta:[&:not(:hover)]:flex-[0.8]"
          style={{
            background:
              "linear-gradient(135deg, #F3498D 0%, #A63EB1 100%)",
          }}
        >
          <div className="flex flex-col gap-10 pl-[40px] pr-[120px] max-md:px-6">
            {/* 텍스트 */}
            <div className="flex flex-col gap-6">
              <span className="inline-flex items-center self-start gap-2 px-4 py-2 rounded-full bg-neutral-100/15 border border-neutral-200 text-heading-xs text-neutral-100">
                모델 · 인플루언서
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-display-m text-neutral-50 max-md:text-heading-l">
                  내 인상이{"\n"}브랜드의 얼굴이 됩니다
                </h3>
                <p className="text-heading-s text-neutral-300 max-md:text-body-l">
                  뮤즈에 등록된 인상은 수백 개의 브랜드 광고에 활용됩니다.{"\n"}
                  출시 알림을 먼저 받아보세요.
                </p>
              </div>
            </div>

            {/* 이메일 입력 + CTA */}
            <div className="flex items-center gap-3 max-md:flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 h-[60px] px-[30px] py-4 rounded-full bg-neutral-100/15 border border-neutral-300 text-body-l text-neutral-300 placeholder:text-neutral-300 text-center outline-none focus:border-neutral-50 transition-colors max-md:w-full"
              />
              <Button hierarchy="secondary" size="large">
                알림 받기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
