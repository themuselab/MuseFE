"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { ALL_MODELS, TOP_5_MODELS } from "../../_data";
import type { Model } from "../../_types";
import { AdInfoForm } from "./_components/AdInfoForm";
import { CreateFlowGNB } from "./_components/CreateFlowGNB";
import { CreateFooter } from "./_components/CreateFooter";
import { LeaveConfirmModal } from "./_components/LeaveConfirmModal";
import { SelectedModelCard } from "./_components/SelectedModelCard";
import { useAdInfoForm } from "./_hooks/useAdInfoForm";
import { useLeaveConfirm } from "./_hooks/useLeaveConfirm";
import { useMoodRecommendation } from "./_hooks/useMoodRecommendation";

function findModel(modelId: string): Model | null {
  const all = [...TOP_5_MODELS, ...ALL_MODELS];
  return all.find((m) => m.id === modelId) ?? null;
}

const DRAFT_KEY_PREFIX = "ad-create-draft:";

export default function CreateAdInfoPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const model = findModel(params.modelId);

  if (!model) {
    notFound();
  }

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
  });

  const saveDraft = useCallback(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(
      `${DRAFT_KEY_PREFIX}${model.id}`,
      JSON.stringify({ ...form, savedAt: new Date().toISOString() }),
    );
  }, [model.id, form]);

  const leave = useLeaveConfirm({ isDirty, saveDraft });

  const handleBack = () => {
    leave.guard(() => router.back());
  };

  const handleSubmit = () => {
    sessionStorage.setItem(
      `ad-create-flow:${model.id}`,
      JSON.stringify(form),
    );
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
