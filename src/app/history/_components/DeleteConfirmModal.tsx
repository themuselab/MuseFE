"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/components/icons/CloseIcon";

type DeleteConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, onClose, onConfirm }: DeleteConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 md:px-0">
      <div
        className="absolute inset-0 bg-neutral-900/40"
        onClick={onClose}
        role="presentation"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        className="relative w-full md:w-[560px] bg-neutral-50 rounded-xl pt-12 px-10 pb-10 shadow-[0_0_43.75px_#1e293b14]"
      >
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4">
            <div className="flex justify-end h-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="cursor-pointer text-neutral-900"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <h2
                id="delete-confirm-title"
                className="text-neutral-900 text-center text-[24px] font-semibold leading-[1.333] tracking-[-0.48px]"
              >
                선택한 파일을 삭제할까요?
              </h2>
              <p className="text-neutral-700 text-center text-[18px] font-medium leading-[1.556] tracking-[-0.36px]">
                삭제한 파일은 다시 복구할 수 없어요.
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-4 h-[60px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 flex items-center justify-center rounded-full bg-neutral-50 border border-neutral-200 text-heading-s text-neutral-900 cursor-pointer"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-[232px] flex items-center justify-center rounded-full bg-neutral-50 border border-error-500 text-heading-s text-error-500 cursor-pointer"
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
