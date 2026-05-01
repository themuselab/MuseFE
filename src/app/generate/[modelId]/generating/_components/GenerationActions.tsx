"use client";

import { Button } from "@/components/Button";

type GenerationActionsProps = {
  onCancel: () => void;
  onGoHome: () => void;
};

export function GenerationActions({ onCancel, onGoHome }: GenerationActionsProps) {
  return (
    <div className="flex flex-col items-stretch gap-5 w-full">
      <p className="text-center text-body-l text-neutral-700 whitespace-pre-line">
        {"홈으로 돌아가도 이미지 제작은 계속 진행돼요\n다 완료되면 알림으로 알려드릴게요!"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Button hierarchy="secondary" size="large" onClick={onCancel}>
          제작 취소
        </Button>
        <Button hierarchy="primary" size="large" onClick={onGoHome}>
          메인으로
        </Button>
      </div>
    </div>
  );
}
