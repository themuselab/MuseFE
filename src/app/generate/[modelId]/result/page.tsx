"use client";

import { toPng } from "html-to-image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ALL_MODELS, TOP_5_MODELS } from "../../_data";
import type { Model } from "../../_types";
import { CreateFlowGNB } from "../create/_components/CreateFlowGNB";
import { useGenerationContext } from "../generating/_hooks/useGenerationContext";
import { EditorActions } from "./_components/EditorActions";
import { EditorCanvas } from "./_components/EditorCanvas";
import { EditorPanel } from "./_components/EditorPanel";
import { ResultActions } from "./_components/ResultActions";
import { ResultGallery } from "./_components/ResultGallery";
import { ResultHeader } from "./_components/ResultHeader";
import { MOCK_RESULTS } from "./_constants";
import { useEditorState } from "./_hooks/useEditorState";

function findModel(modelId: string): Model | null {
  const all = [...TOP_5_MODELS, ...ALL_MODELS];
  return all.find((m) => m.id === modelId) ?? null;
}

function svgUrlToPng(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 396 * 2;
      canvas.height = 528 * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("image load failed"));
    img.src = url;
  });
}

export default function ResultPage() {
  const params = useParams<{ modelId: string }>();
  const router = useRouter();
  const model = findModel(params.modelId);

  if (!model) {
    notFound();
  }

  const ctx = useGenerationContext(model.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSrc, setEditedSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const editor = useEditorState(MOCK_RESULTS[1].src);

  if (!ctx) return null;

  const captureCanvas = async (): Promise<string | null> => {
    if (!canvasRef.current) return null;
    editor.select(null);
    await new Promise((r) => setTimeout(r, 50));
    return await toPng(canvasRef.current, { pixelRatio: 2, cacheBust: true });
  };

  const handleEditDone = async () => {
    const dataUrl = await captureCanvas();
    if (dataUrl) setEditedSrc(dataUrl);
    setIsEditing(false);
  };

  const handleCreateNew = () => {
    sessionStorage.removeItem(`ad-create-flow:${model.id}`);
    sessionStorage.removeItem(`ad-create-product:${model.id}`);
    router.push("/generate");
  };

  const downloadOriginal = async () => {
    const src = editedSrc ?? MOCK_RESULTS[0].src;
    const dataUrl = src.startsWith("data:") ? src : await svgUrlToPng(src);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `muse-ad-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadComposite = async () => {
    const dataUrl = await captureCanvas();
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `muse-ad-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <CreateFlowGNB
        currentStep={3}
        completedSteps={[1, 2, 3]}
        onBack={isEditing ? () => setIsEditing(false) : () => router.back()}
        rightSlot={
          isEditing ? (
            <EditorActions onDone={handleEditDone} onDownload={downloadComposite} />
          ) : null
        }
      />

      {isEditing ? (
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            <EditorCanvas api={editor} canvasRef={canvasRef} />
          </div>
          <EditorPanel api={editor} className="lg:w-[462px] lg:shrink-0 rounded-xl" />
        </main>
      ) : (
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-30 py-8 lg:py-15 pb-30 flex flex-col gap-10">
          <ResultHeader />
          <ResultGallery
            onEditText={() => setIsEditing(true)}
            editedSecondSrc={editedSrc}
          />
          <ResultActions onCreateNew={handleCreateNew} onDownload={downloadOriginal} />
        </main>
      )}
    </div>
  );
}
