"use client";

import { Button } from "@/components/Button";

type ResultActionsProps = {
  onCreateNew: () => void;
  onDownload: () => void;
};

export function ResultActions({ onCreateNew, onDownload }: ResultActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button
        hierarchy="secondary"
        size="large"
        className="w-full sm:w-[282px]"
        onClick={onCreateNew}
      >
        새로 만들기
      </Button>
      <Button
        hierarchy="primary"
        size="large"
        className="w-full sm:w-[282px]"
        onClick={onDownload}
      >
        다운로드
      </Button>
    </div>
  );
}
