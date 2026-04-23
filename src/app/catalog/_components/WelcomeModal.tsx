"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";

type WelcomeModalProps = {
  open: boolean;
  onDismiss: () => void;
  onStart: () => void;
};

const NOTCH_COUNT = 6;

export function WelcomeModal({ open, onDismiss, onStart }: WelcomeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onDismiss]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onDismiss}
        className="absolute inset-0 bg-neutral-900/60 cursor-default"
      />
      <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        {/* 플레이스홀더 이미지 배경 (추후 모델 썸네일로 교체) */}
        <div className="absolute inset-0 grid grid-cols-3" aria-hidden>
          <div className="bg-neutral-300" />
          <div className="bg-neutral-400" />
          <div className="bg-neutral-300" />
        </div>
        {/* 어두운 스크림 */}
        <div className="absolute inset-0 bg-neutral-900/65" aria-hidden />

        {/* 좌/우 스캘롭 노치 (티켓/필름 스트립 느낌) */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 flex flex-col justify-around py-3"
          aria-hidden
        >
          {Array.from({ length: NOTCH_COUNT }).map((_, i) => (
            <span key={i} className="w-4 h-4 rounded-full bg-neutral-50 -translate-x-1/2" />
          ))}
        </div>
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 flex flex-col justify-around py-3"
          aria-hidden
        >
          {Array.from({ length: NOTCH_COUNT }).map((_, i) => (
            <span key={i} className="w-4 h-4 rounded-full bg-neutral-50 translate-x-1/2" />
          ))}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="닫기"
          className="absolute top-4 right-6 z-10 w-8 h-8 flex items-center justify-center text-neutral-50 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative flex flex-col items-center gap-7 px-10 pt-12 pb-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 id="welcome-modal-title" className="text-heading-xs text-pink-300">
              신규 회원님께
            </h2>
            <p className="text-body-m text-neutral-50 whitespace-pre-line leading-relaxed">
              {"무료 크레딧 200P를 드려요.\n지금 바로 첫 광고 이미지를 만들어보세요."}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Button
              type="button"
              hierarchy="secondary"
              size="medium"
              onClick={onDismiss}
              className="flex-1"
            >
              다시 보지 않기
            </Button>
            <Button
              type="button"
              hierarchy="primary"
              size="medium"
              onClick={onStart}
              className="flex-1"
            >
              지금 바로 만들기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
