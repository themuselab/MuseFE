"use client";

import { TextField } from "@/components/TextField";
import { AgeGroupSelector } from "./AgeGroupSelector";

type BasicInfoSectionProps = {
  email: string;
  ageGroup: string;
  onAgeGroupChange: (v: string) => void;
};

export function BasicInfoSection({
  email,
  ageGroup,
  onAgeGroupChange,
}: BasicInfoSectionProps) {
  return (
    <section className="flex flex-col gap-6 p-6 md:p-8 bg-neutral-50 border border-neutral-200 rounded-lg">
      <h2 className="text-heading-xs text-neutral-900">기본 정보</h2>

      <TextField
        label="이메일"
        value={email}
        disabled
        state="disabled"
        helperText="가입 시 등록한 이메일은 변경할 수 없습니다."
        reserveHelperSpace
        readOnly
      />

      <div className="flex flex-col gap-3">
        <span className="text-caption-m text-neutral-500">연령대</span>
        <AgeGroupSelector value={ageGroup} onChange={onAgeGroupChange} />
      </div>
    </section>
  );
}
