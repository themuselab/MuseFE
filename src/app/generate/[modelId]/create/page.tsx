"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useCatalogModels } from "@/hooks/useCatalogModels";
import { AD_CREATE_KEYS } from "@/constants/app";
import type { Model } from "../../_types";
import type { CatalogModelDto } from "@/types/ad";
import { AdInfoForm } from "./_components/AdInfoForm";
import { CreateFlowGNB } from "./_components/CreateFlowGNB";
import { CreateFooter } from "./_components/CreateFooter";
import { LeaveConfirmModal } from "./_components/LeaveConfirmModal";
import { SelectedModelCard } from "./_components/SelectedModelCard";
import { useAdInfoForm } from "./_hooks/useAdInfoForm";
import { useLeaveConfirm } from "./_hooks/useLeaveConfirm";
import { useMoodRecommendation } from "./_hooks/useMoodRecommendation";

const DRAFT_KEY_PREFIX = "ad-create-draft:";

const dtoToModel = (dto: CatalogModelDto): Model => ({
  id: dto.id,
  name: dto.name,
  age: dto.age,
  gender: dto.gender,
  tags: dto.tags,
  imageUrl: dto.imageUrl,
  imageUrls: dto.imageUrls,
  scores: dto.scores,
  recommendedIndustries: dto.recommendedIndustries,
});

export default function CreateAdInfoPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const catalogQuery = useCatalogModels();

  const model: Model | null = useMemo(() => {
    const dto = catalogQuery.data?.items.find((m) => m.id === params.modelId);
    return dto ? dtoToModel(dto) : null;
  }, [catalogQuery.data, params.modelId]);

  const {
    form,
    canSubmit,
    isDirty,
    setIndustry,
    setItemName,
    setDescription,
    selectMood,
  } = useAdInfoForm();

  const moodState = useMoodRecommendation({
    industry: form.industry,
    itemName: form.itemName,
    description: form.description,
  });

  const saveDraft = useCallback(() => {
    if (typeof window === "undefined" || !model) return;
    sessionStorage.setItem(
      `${DRAFT_KEY_PREFIX}${model.id}`,
      JSON.stringify({ ...form, savedAt: new Date().toISOString() }),
    );
  }, [model, form]);

  const leave = useLeaveConfirm({ isDirty, saveDraft });

  if (catalogQuery.isLoading) return null;
  if (!model) {
    notFound();
  }

  const handleBack = () => {
    leave.guard(() => router.back());
  };

  const handleSubmit = () => {
    sessionStorage.setItem(AD_CREATE_KEYS.flow(model.id), JSON.stringify(form));
    router.push(`/generate/${model.id}/upload`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <CreateFlowGNB currentStep={1} completedSteps={[1]} onBack={handleBack} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 pb-30 flex flex-col lg:flex-row gap-10">
        <SelectedModelCard model={model} />
        <AdInfoForm
          form={form}
          moodState={moodState}
          onIndustryChange={setIndustry}
          onItemNameChange={setItemName}
          onDescriptionChange={setDescription}
          onSelectMood={selectMood}
        />
      </main>

      <CreateFooter canSubmit={canSubmit} onSubmit={handleSubmit} />

      <LeaveConfirmModal
        open={leave.open}
        onClose={leave.cancel}
        onLeave={leave.confirmLeave}
        onSaveAndLeave={leave.saveAndLeave}
      />
    </div>
  );
}
