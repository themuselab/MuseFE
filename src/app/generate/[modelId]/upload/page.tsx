"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { ImageUploadCard } from "@/components/ImageUploadCard";
import { ALL_MODELS, TOP_5_MODELS } from "../../_data";
import type { Model } from "../../_types";
import { CreateFlowGNB } from "../create/_components/CreateFlowGNB";
import { CreateFooter } from "../create/_components/CreateFooter";
import { SelectedModelCard } from "../create/_components/SelectedModelCard";
import { UploadHeader } from "./_components/UploadHeader";
import { useFlowState } from "./_hooks/useFlowState";
import { useProductImageUpload } from "./_hooks/useProductImageUpload";

function findModel(modelId: string): Model | null {
  const all = [...TOP_5_MODELS, ...ALL_MODELS];
  return all.find((m) => m.id === modelId) ?? null;
}

export default function ProductUploadPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const model = findModel(params.modelId);

  if (!model) {
    notFound();
  }

  const flowState = useFlowState(model.id);
  const { status, onSelectFile } = useProductImageUpload();

  if (!flowState) return null;

  const isLoading = status.kind === "loading";
  const productImageUrl =
    status.kind !== "idle" ? status.imageUrl : null;

  const handleNext = () => {
    sessionStorage.setItem(
      `ad-create-product:${model.id}`,
      JSON.stringify({
        productImageUrl: status.kind === "done" ? status.imageUrl : null,
      }),
    );
    router.push(`/generate/${model.id}/generating`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <CreateFlowGNB currentStep={2} completedSteps={[1, 2]} onBack={() => router.back()} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 pb-30 flex flex-col lg:flex-row gap-10">
        <SelectedModelCard model={model} />
        <div className="flex flex-col gap-10 flex-1 min-w-0">
          <UploadHeader />
          <ImageUploadCard
            size="sm"
            imageUrl={productImageUrl}
            loading={isLoading}
            onSelectFile={onSelectFile}
            className="w-full"
          />
        </div>
      </main>

      <CreateFooter canSubmit={!isLoading} onSubmit={handleNext} />
    </div>
  );
}
