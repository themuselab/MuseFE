"use client";

import { AlertModal } from "@/components/AlertModal";

type LeaveConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onLeave: () => void;
};

export function LeaveConfirmModal({ open, onClose, onLeave }: LeaveConfirmModalProps) {
  return (
    <AlertModal
      open={open}
      onClose={onClose}
      size="sm"
      title="수정을 중단하시겠어요?"
      primaryLabel="계속 수정하기"
      secondaryLabel="나가기"
      onPrimary={onClose}
      onSecondary={onLeave}
    />
  );
}
