"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "@/components/icons/CloseIcon";

type ModalShellSize = "sm" | "md" | "lg" | "xl";
type ModalShellMobileStyle = "sheet" | "centered";

type ModalShellProps = {
  open: boolean;
  onClose: () => void;
  size?: ModalShellSize;
  mobileStyle?: ModalShellMobileStyle;
  showClose?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  children: ReactNode;
};

const sizeClass: Record<ModalShellSize, string> = {
  sm: "lg:max-w-86",
  md: "lg:max-w-140",
  lg: "lg:max-w-180",
  xl: "lg:max-w-[851px]",
};

const mobileWrapperClass: Record<ModalShellMobileStyle, string> = {
  sheet: "items-end lg:items-center",
  centered: "items-center px-4 lg:px-0",
};

const mobileCardClass: Record<ModalShellMobileStyle, string> = {
  sheet: "rounded-t-3xl lg:rounded-3xl",
  centered: "rounded-3xl",
};

export function ModalShell({
  open,
  onClose,
  size = "md",
  mobileStyle = "sheet",
  showClose = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  ariaLabel,
  ariaLabelledBy,
  className = "",
  children,
}: ModalShellProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    cardRef.current?.focus();

    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, closeOnEscape, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-neutral-900/40 flex justify-center ${mobileWrapperClass[mobileStyle]}`}
      onClick={closeOnBackdropClick ? onClose : undefined}
      role="presentation"
    >
      <div
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onClick={(e) => e.stopPropagation()}
        className={[
          "relative w-full bg-neutral-50 flex flex-col max-h-[95vh] lg:max-h-[90vh] overflow-hidden outline-none",
          sizeClass[size],
          mobileCardClass[mobileStyle],
          className,
        ].join(" ")}
      >
        {showClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-6 top-6 lg:right-12 lg:top-12 z-10 cursor-pointer text-neutral-900 flex items-center justify-center"
          >
            <CloseIcon />
          </button>
        ) : null}

        {children}
      </div>
    </div>
  );
}
