"use client";

import { Button } from "@/components/Button";
import { ModalShell } from "@/components/ModalShell";

type CancelGenerationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function CancelGenerationModal({
  open,
  onClose,
  onConfirm,
}: CancelGenerationModalProps) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      size="md"
      mobileStyle="centered"
      ariaLabel="광고 제작 중단 확인"
      className="lg:max-w-140"
    >
      <div className="flex flex-col gap-14 p-10 pt-12">
        <h2 className="text-heading-m text-neutral-900 text-center">
          광고 제작을 중단하시겠어요?
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Button hierarchy="secondary" size="large" onClick={onClose}>
            계속하기
          </Button>
          <Button hierarchy="primary" size="large" onClick={onConfirm}>
            중단하기
          </Button>
        </div>
      </div>
    </ModalShell>
  );
}
