"use client";

import { ModalShell } from "@/components/ModalShell";
import { SIGNUP_TERMS, type SignupTermKey } from "@/constants/signupTerms";

type TermsModalProps = {
  termKey: SignupTermKey | null;
  onClose: () => void;
};

export function TermsModal({ termKey, onClose }: TermsModalProps) {
  const open = termKey !== null;
  const content = termKey ? SIGNUP_TERMS[termKey] : null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      size="xl"
      mobileStyle="centered"
      showClose={false}
      ariaLabelledBy="terms-modal-title"
      className="lg:!max-w-[1200px]"
    >
      {content && (
        <div className="flex flex-col gap-12 p-6 lg:p-12 min-h-0 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 shrink-0">
            <h2
              id="terms-modal-title"
              className="text-[24px] font-bold leading-[1.5] tracking-[-0.048em] text-neutral-700"
            >
              {content.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="shrink-0 cursor-pointer text-neutral-700 flex items-center justify-center w-6 h-6"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex flex-col gap-12 min-h-0 flex-1 overflow-y-auto">
            {/* Notice */}
            <div className="rounded bg-pink-50 p-2">
              <p className="text-[16px] font-medium leading-[1.75] text-neutral-700 text-left">
                {content.notice}
              </p>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-6">
              {content.sections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  {section.title && (
                    <h3 className="text-[14px] font-medium leading-[1.143] text-neutral-900">
                      {section.title}
                    </h3>
                  )}
                  <p className="text-[13px] font-normal leading-[1.538] text-neutral-700 whitespace-pre-wrap">
                    {section.body}
                  </p>
                </div>
              ))}

              {content.footer && (
                <div className="flex flex-col gap-1 pt-4">
                  <p className="text-[13px] font-normal leading-[1.538] text-neutral-700 whitespace-pre-wrap">
                    {content.footer}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ModalShell>
  );
}
