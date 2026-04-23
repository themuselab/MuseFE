"use client";

import { AlertModal } from "@/components/AlertModal";

type SaveConfirmModalProps = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function SaveConfirmModal({ open, loading, onClose, onConfirm }: SaveConfirmModalProps) {
  return (
    <AlertModal
      open={open}
      onClose={onClose}
      size="sm"
      title="수정사항을 저장하시겠어요?"
      primaryLabel={loading ? "저장 중…" : "저장하기"}
      secondaryLabel="취소"
      onPrimary={onConfirm}
      onSecondary={onClose}
    />
  );
}
