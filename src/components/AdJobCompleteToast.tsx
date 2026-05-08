"use client";

import { AD_JOB_TOAST } from "@/constants/app";

type AdJobCompleteToastProps = {
  onView: () => void;
};

export function AdJobCompleteToast({ onView }: AdJobCompleteToastProps) {
  return (
    <div className="inline-flex items-center gap-12 px-3 py-2 rounded-lg bg-neutral-900 shadow-md">
      <div className="inline-flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-pink-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3.5 8.5L6.5 11.5L12.5 5"
              stroke="#fbfbfb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-body-l text-neutral-50">
          {AD_JOB_TOAST.completeText}
        </span>
      </div>
      <button
        type="button"
        onClick={onView}
        className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-neutral-100 text-body-l text-neutral-700"
      >
        {AD_JOB_TOAST.ctaText}
      </button>
    </div>
  );
}
