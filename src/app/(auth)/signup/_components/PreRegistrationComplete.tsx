"use client";

import { Button } from "@/components/Button";

type PreRegistrationCompleteProps = {
  onClose: () => void;
};

export function PreRegistrationComplete({ onClose }: PreRegistrationCompleteProps) {
  return (
    <div className="flex flex-col gap-10 w-full">
      <h2 className="text-[24px] font-bold leading-[1.5] tracking-[-0.048px] text-neutral-900 text-center whitespace-pre-line">
        알림 신청이 완료되었어요!
      </h2>

      <Button
        hierarchy="accent"
        size="large"
        className="w-full"
        onClick={onClose}
      >
        닫기
      </Button>
    </div>
  );
}
