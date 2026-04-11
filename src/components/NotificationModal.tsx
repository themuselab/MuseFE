"use client";

import { useRef, useEffect } from "react";
import { NotificationTab } from "@/components/NotificationTab";

type NotificationType = "meeting" | "comment" | "welcome";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
};

type NotificationModalProps = {
  open: boolean;
  onClose: () => void;
  items: NotificationItem[];
  onMarkAllRead?: () => void;
  onItemClick?: (id: string) => void;
  className?: string;
};

export function NotificationModal({
  open,
  onClose,
  items,
  onMarkAllRead,
  onItemClick,
  className = "",
}: NotificationModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const hasUnread = items.some((item) => !item.read);
  const isEmpty = items.length === 0;

  return (
    <div
      ref={ref}
      className={[
        "w-[314px] rounded-xl bg-neutral-50 border border-neutral-200",
        "shadow-[0_4px_14px_rgba(0,0,0,0.04)]",
        "pt-6 pb-4 overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-6 mb-6">
        <span className="text-[16px] font-semibold leading-[1.5] tracking-[-0.32px] text-neutral-900">
          알림
        </span>
        {hasUnread && onMarkAllRead && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-[12px] font-semibold leading-[1.333] text-neutral-700 cursor-pointer"
          >
            모두 읽기
          </button>
        )}
      </div>

      {/* 리스트 or 빈 상태 */}
      {isEmpty ? (
        <div className="flex items-center justify-center pt-10 pb-14">
          <p className="text-[14px] font-medium leading-[1.43] tracking-[-0.28px] text-[#a4a4a4] text-center">
            아직 알림이 없어요
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {items.map((item) => (
            <NotificationTab
              key={item.id}
              type={item.type}
              title={item.title}
              message={item.message}
              timestamp={item.timestamp}
              read={item.read}
              actionLabel={item.actionLabel}
              onClick={() => onItemClick?.(item.id)}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
