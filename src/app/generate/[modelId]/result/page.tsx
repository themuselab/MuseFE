"use client";

import { toPng } from "html-to-image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

export default function ResultPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem(AD_CREATE_KEYS.job(params.modelId));
    if (!id) {
      router.replace(`/generate/${params.modelId}/create`);
      return;
    }
    setJobId(id);
  }, [params.modelId, router]);

  const job = useAdJob(jobId);
  const resultUrl = job.data?.resultUrl ?? null;
  const { blobUrl, error: imageError } = useAuthenticatedImage(resultUrl);

  const [isEditing, setIsEditing] = useState(false);
  const [editedSrc, setEditedSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const editor = useEditorState(blobUrl ?? "", job.data?.textOverlays ?? null);

  const captureCanvas = async (): Promise<string | null> => {
    if (!canvasRef.current) return null;
    editor.select(null);
    await new Promise((r) => setTimeout(r, 50));
    // cacheBust: blob URL에 ?param 붙이면 invalid → false 유지
    return await toPng(canvasRef.current, { pixelRatio: 2, cacheBust: false });
  };

  const handleEditDone = async () => {
    const dataUrl = await captureCanvas();
    if (dataUrl) setEditedSrc(dataUrl);
    setIsEditing(false);
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
    const src = editedSrc ?? blobUrl;
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

  if (!blobUrl) {
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
        onBack={isEditing ? () => setIsEditing(false) : () => router.back()}
        rightSlot={
          isEditing ? (
            <EditorActions
              onDone={handleEditDone}
              onDownload={downloadComposite}
            />
          ) : null
        }
      />

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
            src={blobUrl}
            alt="생성된 광고 이미지"
            onEditText={() => setIsEditing(true)}
            editedSecondSrc={editedSrc}
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
