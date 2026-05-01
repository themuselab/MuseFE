"use client";

import { Dropdown } from "@/components/Dropdown";
import { InputTextArea } from "@/components/InputTextArea";
import { TextField } from "@/components/TextField";
import { INDUSTRY_MAIN_OPTIONS } from "@/constants/app";
import { MoodSection } from "./MoodSection";
import type { AdInfoFormState, MoodSectionState } from "../_types";

type AdInfoFormProps = {
  form: AdInfoFormState;
  moodState: MoodSectionState;
  onIndustryChange: (value: string) => void;
  onItemNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSelectMood: (id: string) => void;
};

const ITEM_NAME_MAX = 30;
const DESCRIPTION_MAX = 100;

const INDUSTRY_ITEMS = INDUSTRY_MAIN_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
}));

export function AdInfoForm({
  form,
  moodState,
  onIndustryChange,
  onItemNameChange,
  onDescriptionChange,
  onSelectMood,
}: AdInfoFormProps) {
  return (
    <div className="flex flex-col gap-10 w-full">
      <header className="flex flex-col gap-3">
        <h1 className="text-heading-l text-neutral-900">
          어떤 광고를 만들까요?
        </h1>
        <p className="text-body-l text-neutral-700">
          업종과 아이템 정보를 입력하면 AI가 딱 맞는 광고를 생성해드려요.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        <span className="text-caption-m text-neutral-700">
          업종 <span className="text-pink-500">*</span>
        </span>
        <Dropdown
          size="large"
          items={INDUSTRY_ITEMS}
          value={form.industry || undefined}
          onChange={onIndustryChange}
          placeholder="업종을 선택해주세요"
          className="!w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-caption-m text-neutral-700">
            아이템명 <span className="text-pink-500">*</span>
          </span>
          <span className="text-caption-s text-neutral-400">
            {form.itemName.length}/{ITEM_NAME_MAX}
          </span>
        </div>
        <TextField
          label=""
          value={form.itemName}
          maxLength={ITEM_NAME_MAX}
          onChange={(e) => onItemNameChange(e.target.value)}
          placeholder="예: 얼굴형 정리 뷰티 디바이스"
        />
      </div>

      <InputTextArea
        label="추가 설명"
        size="large"
        maxLength={DESCRIPTION_MAX}
        value={form.description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="타겟 고객, 제품의 강점, 프로모션 혜택을 입력해 주세요. 자세히 적을수록 AI가 브랜드에 딱 맞는 광고를 만들어드려요."
      />

      <MoodSection
        state={moodState}
        itemName={form.itemName}
        selectedMoodId={form.selectedMoodId}
        onSelectMood={onSelectMood}
      />
    </div>
  );
}
