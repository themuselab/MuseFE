"use client";

import { Button } from "@/components/Button";
import { ModalShell } from "@/components/ModalShell";

type LeaveConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onLeave: () => void;
  onSaveAndLeave: () => void;
};

export function LeaveConfirmModal({
  open,
  onClose,
  onLeave,
  onSaveAndLeave,
}: LeaveConfirmModalProps) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      size="md"
      mobileStyle="centered"
      ariaLabel="입력 중단 확인"
    >
      <div className="flex flex-col gap-14 pt-12 px-10 pb-10">
        <h2 className="text-heading-m text-neutral-900 text-center">
          작성 중인 내용이 있어요
        </h2>
        <div className="flex gap-4">
          <Button
            hierarchy="secondary"
            size="large"
            className="flex-1"
            onClick={onLeave}
          >
            나가기
          </Button>
          <Button
            hierarchy="primary"
            size="large"
            className="flex-1"
            onClick={onSaveAndLeave}
          >
            임시저장하고 나가기
          </Button>
        </div>
      </div>
    </ModalShell>
  );
}
