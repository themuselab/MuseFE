"use client";

import { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { TermsModal } from "./TermsModal";
import type { SignupTermKey } from "@/constants/signupTerms";

type TermsData = {
  service: boolean;
  privacy: boolean;
  overseas: boolean;
  adid: boolean;
};

type StepTermsProps = {
  terms: TermsData;
  onUpdateTerm: (key: keyof TermsData, value: boolean) => void;
  onToggleAll: (checked: boolean) => void;
  allAgreed: boolean;
  requiredAgreed: boolean;
  onNext: () => void;
  onPrev: () => void;
};

type TermItem = {
  key: keyof TermsData;
  title: string;
  description: string;
  required: boolean;
};

const TERM_ITEMS: TermItem[] = [
  {
    key: "service",
    title: "서비스 이용약관 동의",
    description: "서비스 이용 규칙, 크레딧 규정, 면책 조항 동의",
    required: true,
  },
  {
    key: "privacy",
    title: "개인정보 수집 및 이용 동의",
    description: "이메일, 이름, 비밀번호 수집 · 목적 · 보유 기간",
    required: true,
  },
  {
    key: "overseas",
    title: "개인정보의 국외 이전 동의",
    description: "OpenAI 등 해외 AI API 사용을 위한 데이터 전송 동의",
    required: true,
  },
  {
    key: "adid",
    title: "ADID 수집 동의 (선택)",
    description: "",
    required: false,
  },
];

export function StepTerms({
  terms,
  onUpdateTerm,
  onToggleAll,
  allAgreed,
  requiredAgreed,
  onNext,
  onPrev,
}: StepTermsProps) {
  const [openTermKey, setOpenTermKey] = useState<SignupTermKey | null>(null);

  return (
    <>
      <div className="flex flex-col items-center w-full gap-10">
        {/* Title */}
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-heading-l text-neutral-900 text-center">
            약관에 동의해주세요
          </h2>
          <p className="text-heading-xs text-neutral-700 text-center">
            아래 약관에 동의 후 서비스 이용이 가능합니다.
          </p>
        </div>

        {/* Terms list */}
        <div className="flex flex-col w-full gap-9">
          {/* All agree */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-4 pl-3">
              <Checkbox
                checked={allAgreed}
                onChange={(e) => onToggleAll(e.target.checked)}
              />
              <span className="text-heading-s text-neutral-900">
                전체 동의
              </span>
            </div>
            <div className="h-px bg-neutral-200 w-full" />
          </div>

          {/* Individual terms */}
          <div className="flex flex-col gap-6 w-full">
            {TERM_ITEMS.map((item) => (
              <div key={item.key} className="flex items-center justify-between pl-3 w-full">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={terms[item.key]}
                    onChange={(e) => onUpdateTerm(item.key, e.target.checked)}
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0">
                      <span className="text-heading-xs text-neutral-900">
                        {item.title}
                      </span>
                      {item.required && (
                        <span className="text-[14px] font-medium leading-[1.43] text-pink-400 ml-0.5">
                          *
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <span className="text-[14px] font-normal leading-none text-neutral-700">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenTermKey(item.key)}
                  className="text-[14px] font-normal leading-none text-neutral-700 cursor-pointer shrink-0"
                >
                  보기
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between w-full gap-2">
        <Button
          hierarchy="secondary"
          size="large"
          onClick={onPrev}
        >
          이전
        </Button>
        <Button
          hierarchy="primary"
          size="large"
          disabled={!requiredAgreed}
          onClick={onNext}
        >
          다음 단계로
        </Button>
      </div>

      <TermsModal
        termKey={openTermKey}
        onClose={() => setOpenTermKey(null)}
      />
    </>
  );
}
