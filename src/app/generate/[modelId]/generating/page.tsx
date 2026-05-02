"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGenerateAd } from "@/hooks/useGenerateAd";
import { useAdJob } from "@/hooks/useAdJob";
import { AD_CREATE_KEYS, industryLabelOf } from "@/constants/app";
import { CreateFlowGNB } from "../create/_components/CreateFlowGNB";
import { CancelGenerationModal } from "./_components/CancelGenerationModal";
import { GenerationActions } from "./_components/GenerationActions";
import { GenerationPreview } from "./_components/GenerationPreview";
import { GenerationProgressBar } from "./_components/GenerationProgressBar";
import { useGenerationContext } from "./_hooks/useGenerationContext";

export default function GeneratingPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const ctx = useGenerationContext(params.modelId);
  const [jobId, setJobId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  const generate = useGenerateAd();
  const job = useAdJob(jobId);

  // 진입 시 한 번만 generate 호출
  useEffect(() => {
    if (!ctx) return;
    if (jobId) return; // 이미 생성됨
    if (generate.isPending) return;

    const cached = sessionStorage.getItem(AD_CREATE_KEYS.job(params.modelId));
    if (cached) {
      setJobId(cached);
      return;
    }

    const promptParts = [
      `${ctx.flow.itemName} 광고 사진`,
      ctx.flow.description.trim(),
    ].filter(Boolean);

    generate.mutate(
      {
        catalogModelId: params.modelId,
        productImagePath: ctx.product.productImagePath,
        prompt: promptParts.join(", "),
        industry: industryLabelOf(ctx.flow.industry),
        item: ctx.flow.itemName,
        extraDescription: ctx.flow.description.trim() || undefined,
        mood: ctx.flow.selectedMood
          ? `${ctx.flow.selectedMood.label}: ${ctx.flow.selectedMood.subtitle}`
          : undefined,
      },
      {
        onSuccess: (data) => {
          sessionStorage.setItem(
            AD_CREATE_KEYS.job(params.modelId),
            data.jobId,
          );
          setJobId(data.jobId);
        },
        onError: (err) => {
          setSubmitError(
            err instanceof Error ? err.message : "광고 생성 요청 실패",
          );
        },
      },
    );
    // generate는 ref 안정 — ctx만 의존
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, jobId, params.modelId]);

  // 완료되면 result로 이동
  useEffect(() => {
    if (job.data?.status === "completed") {
      const t = setTimeout(() => {
        router.replace(`/generate/${params.modelId}/result`);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [job.data?.status, params.modelId, router]);

  if (!ctx) return null;

  const progress = job.data?.progress ?? (jobId ? 5 : 0);
  const failed = job.data?.status === "failed";
  const failMessage = submitError ?? job.data?.errorMessage ?? null;

  const openCancel = () => setCancelOpen(true);
  const closeCancel = () => setCancelOpen(false);

  const handleConfirmCancel = () => {
    sessionStorage.removeItem(AD_CREATE_KEYS.flow(params.modelId));
    sessionStorage.removeItem(AD_CREATE_KEYS.product(params.modelId));
    sessionStorage.removeItem(AD_CREATE_KEYS.job(params.modelId));
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
          {failed && failMessage ? (
            <p className="text-caption-m text-error-500 text-center">
              {failMessage}
            </p>
          ) : null}
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
