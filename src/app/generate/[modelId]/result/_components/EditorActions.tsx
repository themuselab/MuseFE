"use client";

import { Button } from "@/components/Button";

type EditorActionsProps = {
  onDone: () => void;
  onDownload: () => void;
  isSaving?: boolean;
};

export function EditorActions({ onDone, onDownload, isSaving = false }: EditorActionsProps) {
  return (
    <div className="flex gap-3 items-center">
      <Button
        hierarchy="secondary"
        size="medium"
        onClick={onDone}
        disabled={isSaving}
      >
        {isSaving ? "저장 중…" : "편집 완료"}
      </Button>
      <Button
        hierarchy="primary"
        size="medium"
        onClick={onDownload}
        disabled={isSaving}
      >
        다운로드
      </Button>
    </div>
  );
}
