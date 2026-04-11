"use client";

type NotificationType = "meeting" | "comment" | "welcome";

type NotificationTabProps = {
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
  onClick?: () => void;
  className?: string;
};

export function NotificationTab({
  type,
  title,
  message,
  timestamp,
  read = true,
  actionLabel,
  onActionClick,
  onClick,
  className = "",
}: NotificationTabProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      className={[
        "w-[314px] flex flex-col gap-2 pt-3 pr-7 pb-4 pl-5",
        read ? "bg-neutral-50" : "bg-neutral-100",
        onClick ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 콘텐츠 */}
      <div className="flex flex-col gap-1">
        {/* 헤더 행 */}
        <div className="flex items-center justify-between h-[18px]">
          <span className="text-[12px] font-semibold leading-[1.333] text-neutral-700">
            {title}
          </span>
          <div className="flex items-center gap-1">
            {!read && (
              <span className="w-1 h-1 rounded-full bg-pink-400 shrink-0" />
            )}
            <span className="text-[12px] font-normal leading-[1.333] text-neutral-500">
              {timestamp}
            </span>
          </div>
        </div>

        {/* 본문 */}
        <p className="text-[14px] font-normal leading-[1.43] tracking-[-0.28px] text-neutral-500">
          {message}
        </p>
      </div>

      {/* welcome 타입 액션 버튼 */}
      {type === "welcome" && actionLabel && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onActionClick?.();
          }}
          className="self-start inline-flex items-center gap-1 p-1 rounded text-[14px] font-normal leading-[1.43] tracking-[-0.28px] text-neutral-500 cursor-pointer"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
