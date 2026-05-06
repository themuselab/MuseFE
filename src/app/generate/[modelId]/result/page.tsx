"use client";

import { toPng } from "html-to-image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { adsApi } from "@/api/ads";
import { useAdJob } from "@/hooks/useAdJob";
import { useAuthenticatedImage } from "@/hooks/useAuthenticatedImage";
import { AD_CREATE_KEYS } from "@/constants/app";
import { CreateFlowGNB } from "../create/_components/CreateFlowGNB";
import { EditorActions } from "./_components/EditorActions";
import { EditorCanvas } from "./_components/EditorCanvas";
import { EditorPanel } from "./_components/EditorPanel";
import { ResultActions } from "./_components/ResultActions";
import { ResultGallery } from "./_components/ResultGallery";
import { ResultHeader } from "./_components/ResultHeader";
import { useEditorState } from "./_hooks/useEditorState";
import type { Layer, TextLayer } from "./_types";

const isTextLayer = (l: Layer): l is TextLayer => l.type === "text";

const findLayerContent = (layers: Layer[], overlayId: string): string => {
  const match = layers.find(
    (l) => isTextLayer(l) && l.id.startsWith(`overlay-${overlayId}-`),
  );
  return match && isTextLayer(match) ? match.content : "";
};

export default function ResultPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    // 1) 히스토리에서 ?jobId=... 로 진입한 경우 — 쿼리 우선, sessionStorage에도 동기화
    const fromQuery = searchParams.get("jobId");
    if (fromQuery) {
      sessionStorage.setItem(AD_CREATE_KEYS.job(params.modelId), fromQuery);
      setJobId(fromQuery);
      return;
    }
    // 2) 일반 생성 플로우 진입 — sessionStorage에서 복원
    const id = sessionStorage.getItem(AD_CREATE_KEYS.job(params.modelId));
    if (!id) {
      router.replace(`/generate/${params.modelId}/create`);
      return;
    }
    setJobId(id);
  }, [params.modelId, router, searchParams]);

  const job = useAdJob(jobId);
  // 첫 생성 결과(좌측 카드 — 절대 변경 X). 미존재(legacy) 시 resultUrl로 fallback.
  const originalResultUrl =
    job.data?.originalResultUrl ?? job.data?.resultUrl ?? null;
  // 최신 결과(우측 카드 — 재편집마다 갱신). 캔버스 캡처 미리보기는 editedSrc state로 우선 적용.
  const resultUrl = job.data?.resultUrl ?? null;
  const baseUrl = job.data?.baseImageUrl ?? null;
  const { blobUrl: originalBlobUrl, error: imageError } =
    useAuthenticatedImage(originalResultUrl);
  const { blobUrl: latestBlobUrl } = useAuthenticatedImage(resultUrl);
  // 편집 모드 캔버스 배경: 텍스트 없는 base 이미지 (재편집 시 텍스트 중복 방지)
  const { blobUrl: baseBlobUrl } = useAuthenticatedImage(baseUrl);

  const [isEditing, setIsEditing] = useState(false);
  const [editedSrc, setEditedSrc] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  // 편집 모드: baseBlobUrl(텍스트 없는 깨끗한 이미지) 우선, 없으면 blobUrl(폴백)
  const editorImageSrc = baseBlobUrl ?? latestBlobUrl ?? originalBlobUrl ?? "";
  const editor = useEditorState(editorImageSrc, job.data?.textOverlays ?? null);

  const captureCanvas = async (): Promise<string | null> => {
    if (!canvasRef.current) return null;
    editor.select(null);
    await new Promise((r) => setTimeout(r, 50));
    // cacheBust: blob URL에 ?param 붙이면 invalid → false 유지
    return await toPng(canvasRef.current, { pixelRatio: 2, cacheBust: false });
  };

  const handleEditDone = async () => {
    if (!jobId) {
      setIsEditing(false);
      return;
    }

    // 1) 캔버스 합성 결과를 즉시 미리보기로 보존 (BE 갱신까지 깜빡임 방지)
    const dataUrl = await captureCanvas();
    if (dataUrl) setEditedSrc(dataUrl);

    // 2) BE 재합성 호출 — GPT 미호출, PIL만 (비용 0¢)
    const headline = findLayerContent(editor.state.layers, "headline");
    if (!headline) {
      setIsEditing(false);
      return;
    }
    const subhead = findLayerContent(editor.state.layers, "subhead");
    const cta = findLayerContent(editor.state.layers, "cta");

    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await adsApi.reOverlay(jobId, {
        headline,
        subhead: subhead || undefined,
        cta: cta || undefined,
      });
      if (!res.success) {
        setSaveError(res.error.message);
      } else {
        await job.refetch();
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "재합성 실패");
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCreateNew = () => {
    sessionStorage.removeItem(AD_CREATE_KEYS.flow(params.modelId));
    sessionStorage.removeItem(AD_CREATE_KEYS.product(params.modelId));
    sessionStorage.removeItem(AD_CREATE_KEYS.job(params.modelId));
    router.push("/generate");
  };

  const triggerDownload = (dataUrl: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `muse-ad-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadOriginal = async () => {
    // 다운로드는 우측(편집본) 우선 — 사용자가 마지막으로 본 결과
    const src = editedSrc ?? latestBlobUrl ?? originalBlobUrl;
    if (!src) return;
    if (src.startsWith("data:")) {
      triggerDownload(src);
      return;
    }
    // blob URL → fetch + dataURL 변환 후 다운로드
    const res = await fetch(src);
    const blob = await res.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") triggerDownload(reader.result);
    };
    reader.readAsDataURL(blob);
  };

  const downloadComposite = async () => {
    const dataUrl = await captureCanvas();
    if (!dataUrl) return;
    triggerDownload(dataUrl);
  };

  if (!jobId) return null;

  if (imageError || job.data?.status === "failed") {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <CreateFlowGNB
          currentStep={3}
          completedSteps={[1, 2, 3]}
          onBack={() => router.back()}
        />
        <main className="flex-1 flex items-center justify-center px-6">
          <p className="text-body-l text-error-500">
            {imageError?.message ??
              job.data?.errorMessage ??
              "결과를 불러올 수 없습니다."}
          </p>
        </main>
      </div>
    );
  }

  if (!originalBlobUrl) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <CreateFlowGNB
          currentStep={3}
          completedSteps={[1, 2, 3]}
          onBack={() => router.back()}
        />
        <main className="flex-1 flex items-center justify-center px-6">
          <p className="text-body-l text-neutral-700">결과를 불러오는 중…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <CreateFlowGNB
        currentStep={3}
        completedSteps={[1, 2, 3]}
        onBack={
          isEditing
            ? () => {
                if (!isSaving) setIsEditing(false);
              }
            : () => router.back()
        }
        rightSlot={
          isEditing ? (
            <EditorActions
              onDone={handleEditDone}
              onDownload={downloadComposite}
              isSaving={isSaving}
            />
          ) : null
        }
      />

      {saveError ? (
        <div className="bg-error-50 text-error-600 text-caption-m px-6 py-2 text-center">
          저장 실패: {saveError}
        </div>
      ) : null}

      {isEditing ? (
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            <EditorCanvas api={editor} canvasRef={canvasRef} />
          </div>
          <EditorPanel
            api={editor}
            className="lg:w-[462px] lg:shrink-0 rounded-xl"
          />
        </main>
      ) : (
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 pb-30 flex flex-col gap-10">
          <ResultHeader />
          <ResultGallery
            originalSrc={originalBlobUrl}
            editedSrc={editedSrc ?? latestBlobUrl}
            alt="생성된 광고 이미지"
            onEditText={() => setIsEditing(true)}
          />
          <ResultActions
            onCreateNew={handleCreateNew}
            onDownload={downloadOriginal}
          />
        </main>
      )}
    </div>
  );
}
