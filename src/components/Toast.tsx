"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  open: boolean;
  onClose: () => void;
  durationMs?: number;
  variant?: "info" | "error";
};

export const Toast = ({
  message,
  open,
  onClose,
  durationMs = 2500,
  variant = "info",
}: ToastProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, durationMs);
    return () => clearTimeout(timer);
  }, [open, durationMs, onClose]);

  if (!open) return null;

  const bgClass = variant === "error" ? "bg-error-500" : "bg-neutral-900";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${bgClass} text-neutral-50 text-body-m px-6 py-3 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  );
};
