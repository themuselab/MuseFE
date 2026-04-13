"use client";

import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";
import { signupBusinessSchema } from "@/lib/validation";
import { INDUSTRY_MAIN_OPTIONS, BUSINESS_DURATION_OPTIONS } from "@/constants/app";
import type { SignupFormData } from "../_types";

type StepBusinessInfoProps = {
  business: SignupFormData["business"];
  onUpdate: (key: keyof SignupFormData["business"], value: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export function StepBusinessInfo({
  business,
  onUpdate,
  onPrev,
  onSubmit,
  isSubmitting,
}: StepBusinessInfoProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const result = signupBusinessSchema.safeParse(business);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit();
  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-10">
        {/* Title */}
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-heading-l text-neutral-900 text-center">
            사업 정보를 알려주세요
          </h2>
          <p className="text-heading-xs text-neutral-700 text-center">
            가장 관련 있는 업종을 선택해 주세요.{"\n"}맞춤형 모델 추천에 활용됩니다.
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-5 w-full">
          {/* Industry Main */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center gap-0.5">
              <span className="text-caption-m text-neutral-700">업종</span>
              <span className="text-[14px] font-medium text-pink-400">*</span>
            </div>
            <Dropdown
              items={INDUSTRY_MAIN_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
              value={business.industryMain}
              onChange={(v) => onUpdate("industryMain", v)}
              placeholder="업종"
              className="w-full!"
            />
            {errors.industryMain && (
              <span className="text-[14px] font-normal leading-none text-error-500 pl-3">
                {errors.industryMain}
              </span>
            )}
          </div>

          {/* Business Name */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-caption-m text-neutral-700">사업자명</span>
            <TextField
              label="예: 네이버"
              value={business.businessName}
              onChange={(e) => onUpdate("businessName", e.target.value)}
            />
          </div>

          {/* Business Duration */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-caption-m text-neutral-700">사업기간</span>
            <Dropdown
              items={BUSINESS_DURATION_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
              value={business.businessDuration}
              onChange={(v) => onUpdate("businessDuration", v)}
              placeholder="기간"
              className="w-full!"
            />
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
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          가입하기
        </Button>
      </div>
    </>
  );
}
