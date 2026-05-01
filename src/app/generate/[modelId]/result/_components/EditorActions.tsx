"use client";

import { Button } from "@/components/Button";

type EditorActionsProps = {
  onDone: () => void;
  onDownload: () => void;
};

export function EditorActions({ onDone, onDownload }: EditorActionsProps) {
  return (
    <div className="flex gap-3 items-center">
      <Button hierarchy="secondary" size="medium" onClick={onDone}>
        편집 완료
      </Button>
      <Button hierarchy="primary" size="medium" onClick={onDownload}>
        다운로드
      </Button>
    </div>
  );
}
