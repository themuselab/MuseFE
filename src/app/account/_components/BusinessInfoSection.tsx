"use client";

import { TextField } from "@/components/TextField";
import { Dropdown } from "@/components/Dropdown";
import { INDUSTRY_MAIN_OPTIONS, BUSINESS_DURATION_OPTIONS } from "@/constants/app";

type BusinessInfoSectionProps = {
  industryMain: string;
  businessName: string;
  businessDuration: string;
  onIndustryMainChange: (v: string) => void;
  onBusinessNameChange: (v: string) => void;
  onBusinessDurationChange: (v: string) => void;
};

export function BusinessInfoSection({
  industryMain,
  businessName,
  businessDuration,
  onIndustryMainChange,
  onBusinessNameChange,
  onBusinessDurationChange,
}: BusinessInfoSectionProps) {
  return (
    <section className="flex flex-col gap-6 p-6 md:p-8 bg-neutral-50 border border-neutral-200 rounded-lg">
      <h2 className="text-heading-xs text-neutral-900">비즈니스 정보</h2>

      <div className="flex flex-col gap-2">
        <span className="text-caption-m text-neutral-500">업종</span>
        <Dropdown
          items={[...INDUSTRY_MAIN_OPTIONS]}
          value={industryMain}
          onChange={onIndustryMainChange}
          placeholder="업종"
          className="w-full"
        />
      </div>

      <TextField
        label="사업자명"
        value={businessName}
        onChange={(e) => onBusinessNameChange(e.target.value)}
        placeholder="예: 네이버"
      />

      <div className="flex flex-col gap-2">
        <span className="text-caption-m text-neutral-500">사업기간</span>
        <Dropdown
          items={[...BUSINESS_DURATION_OPTIONS]}
          value={businessDuration}
          onChange={onBusinessDurationChange}
          placeholder="기간"
          className="w-full"
        />
      </div>
    </section>
  );
}
