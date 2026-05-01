"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ALL_MODELS, TOP_5_MODELS } from "../../_data";
import type { Model } from "../../_types";
import { CreateFlowGNB } from "../create/_components/CreateFlowGNB";
import { CancelGenerationModal } from "./_components/CancelGenerationModal";
import { GenerationActions } from "./_components/GenerationActions";
import { GenerationPreview } from "./_components/GenerationPreview";
import { GenerationProgressBar } from "./_components/GenerationProgressBar";
import { useGenerationContext } from "./_hooks/useGenerationContext";
import { useGenerationProgress } from "./_hooks/useGenerationProgress";

function findModel(modelId: string): Model | null {
  const all = [...TOP_5_MODELS, ...ALL_MODELS];
  return all.find((m) => m.id === modelId) ?? null;
}

export default function GeneratingPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const model = findModel(params.modelId);

  if (!model) {
    notFound();
  }

  const ctx = useGenerationContext(model.id);
  const progress = useGenerationProgress();
  const [cancelOpen, setCancelOpen] = useState(false);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => {
      router.replace(`/generate/${model.id}/result`);
    }, 500);
    return () => clearTimeout(t);
  }, [progress, model.id, router]);

  if (!ctx) return null;

  const openCancel = () => setCancelOpen(true);
  const closeCancel = () => setCancelOpen(false);

  const handleConfirmCancel = () => {
    sessionStorage.removeItem(`ad-create-flow:${model.id}`);
    sessionStorage.removeItem(`ad-create-product:${model.id}`);
    router.replace("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <CreateFlowGNB
        currentStep={3}
        completedSteps={[1, 2]}
        onBack={openCancel}
      />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 flex flex-col items-center gap-10">
        <GenerationProgressBar progress={progress} />
        <div className="w-full max-w-[396px] flex flex-col gap-10">
          <GenerationPreview />
          <GenerationActions onCancel={openCancel} onGoHome={openCancel} />
        </div>
      </main>

      <CancelGenerationModal
        open={cancelOpen}
        onClose={closeCancel}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
