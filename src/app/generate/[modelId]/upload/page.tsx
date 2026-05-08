"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { ImageUploadCard } from "@/components/ImageUploadCard";
import { useCatalogModels } from "@/hooks/useCatalogModels";
import { AD_CREATE_KEYS } from "@/constants/app";
import type { Model } from "../../_types";
import type { CatalogModelDto } from "@/types/ad";
import { CreateFlowGNB } from "../create/_components/CreateFlowGNB";
import { CreateFooter } from "../create/_components/CreateFooter";
import { SelectedModelCard } from "../create/_components/SelectedModelCard";
import { UploadHeader } from "./_components/UploadHeader";
import { useFlowState } from "./_hooks/useFlowState";
import { useProductImageUpload } from "./_hooks/useProductImageUpload";

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

export default function ProductUploadPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const catalogQuery = useCatalogModels();

  const model: Model | null = useMemo(() => {
    const dto = catalogQuery.data?.items.find((m) => m.id === params.modelId);
    return dto ? dtoToModel(dto) : null;
  }, [catalogQuery.data, params.modelId]);

  const flowState = useFlowState(params.modelId);
  const { status, onSelectFile } = useProductImageUpload();

  if (catalogQuery.isLoading) return null;
  if (!model) {
    notFound();
  }
  if (!flowState) return null;

  const isLoading = status.kind === "loading";
  const previewUrl = status.kind !== "idle" ? status.previewUrl : null;
  const productImagePath =
    status.kind === "done" ? status.productImagePath : null;

  const errorMessage = status.kind === "error" ? status.message : null;

  const handleNext = () => {
    if (isLoading) return;
    sessionStorage.setItem(
      AD_CREATE_KEYS.product(model.id),
      JSON.stringify(productImagePath ? { productImagePath } : {}),
    );
    router.push(`/generate/${model.id}/generating`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <CreateFlowGNB
        currentStep={2}
        completedSteps={[1, 2]}
        onBack={() => router.back()}
      />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 pb-30 flex flex-col lg:flex-row gap-10">
        <SelectedModelCard model={model} />
        <div className="flex flex-col gap-10 flex-1 min-w-0">
          <UploadHeader />
          <ImageUploadCard
            size="sm"
            imageUrl={previewUrl}
            loading={isLoading}
            onSelectFile={onSelectFile}
            className="w-full"
          />
          {errorMessage ? (
            <p className="text-caption-m text-error-500">{errorMessage}</p>
          ) : null}
        </div>
      </main>

      <CreateFooter
        canSubmit={!isLoading}
        onSubmit={handleNext}
      />
    </div>
  );
}
