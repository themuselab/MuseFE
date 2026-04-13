"use client";

import { AlertModal } from "@/components/AlertModal";

type PreRegistrationModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PreRegistrationModal({ open, onClose }: PreRegistrationModalProps) {
  return (
    <AlertModal
      open={open}
      onClose={onClose}
      title="모델 서비스는 준비 중이에요"
      description="오픈 시 알림을 받으시겠어요?"
      size="sm"
      primaryLabel="사전 등록하기"
      secondaryLabel="닫기"
      onPrimary={onClose}
      onSecondary={onClose}
    />
  );
}
