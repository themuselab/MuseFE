"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { ModalShell } from "@/components/ModalShell";
import { INDUSTRY_MAIN_OPTIONS } from "@/constants/app";
import type { Model } from "../_types";
import { ModelImageGallery } from "./ModelImageGallery";
import { ModelImpressionRadar } from "./ModelImpressionRadar";

type ModelDetailModalProps = {
  model: Model | null;
  open: boolean;
  onClose: () => void;
  onCreate?: (model: Model) => void;
};

function getIndustryLabel(value: string): string {
  return (
    INDUSTRY_MAIN_OPTIONS.find((opt) => opt.value === value)?.label ?? value
  );
}

function ProfileHeader({ model }: { model: Model }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-heading-l text-neutral-900">{model.name}</h2>
      <p className="text-caption-m text-neutral-500">
        {model.age} {model.gender}
      </p>
    </div>
  );
}

function RecommendedIndustries({ industries }: { industries: string[] }) {
  if (industries.length === 0) return null;
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-caption-m text-neutral-500 shrink-0">추천 업종</span>
      <div className="flex gap-2 flex-wrap">
        {industries.map((value) => (
          <span
            key={value}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-pink-50 text-neutral-900 border border-pink-100 text-caption-m"
          >
            {getIndustryLabel(value)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ModelDetailModal({
  model,
  open,
  onClose,
  onCreate,
}: ModelDetailModalProps) {
  const router = useRouter();

  if (!model) return null;

  const handleCreate = () => {
    if (onCreate) {
      onCreate(model);
    } else {
      router.push(`/generate/${model.id}/create`);
    }
    onClose();
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      size="xl"
      mobileStyle="sheet"
      ariaLabel="모델 상세"
    >
      <div className="flex-1 overflow-y-auto p-6 pt-16 lg:p-12 lg:pt-12">
        <div className="flex flex-col lg:flex-row lg:gap-10 gap-5">
          <div className="lg:w-100 shrink-0">
            <ModelImageGallery images={model.imageUrls} alt={model.name} />
          </div>

          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <ProfileHeader model={model} />

            <div className="flex justify-center py-2">
              <ModelImpressionRadar values={model.scores} />
            </div>

            <RecommendedIndustries industries={model.recommendedIndustries} />
          </div>
        </div>
      </div>

      <div className="flex justify-end p-6 bg-neutral-50 border-t border-neutral-100 lg:border-t-0 lg:p-12 lg:pt-0">
        <Button
          hierarchy="primary"
          size="large"
          className="w-full lg:w-95"
          onClick={handleCreate}
        >
          이 모델로 광고 생성하기
        </Button>
      </div>
    </ModalShell>
  );
}
