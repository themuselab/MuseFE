"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PreRegistrationForm } from "./PreRegistrationForm";
import { PreRegistrationComplete } from "./PreRegistrationComplete";

type PreRegistrationModalProps = {
  open: boolean;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="#534b4f"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PreRegistrationModal({
  open,
  onClose,
}: PreRegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
    }
  }, [open]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-14 pb-14 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-neutral-50 rounded-xl shadow-[0_0_43.75px_rgba(30,41,59,0.08)] w-140 pt-12 px-10 pb-10 my-auto">
        {/* Close button */}
        <div className="flex justify-end h-8 mb-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        {submitted ? (
          <PreRegistrationComplete onClose={onClose} />
        ) : (
          <PreRegistrationForm onSuccess={() => setSubmitted(true)} />
        )}
      </div>
    </div>,
    document.body,
  );
}
