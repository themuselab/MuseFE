"use client";

import { type ReactNode } from "react";
import { GNBTabButton } from "@/components/GNBTabButton";
import { Avatar } from "@/components/Avatar";

type GNBState = "logout" | "login" | "landing";

type GNBTab = {
  label: string;
  value: string;
  badge?: number;
};

type GNBProps = {
  state: GNBState;
  tabs?: GNBTab[];
  activeTab?: string;
  onTabClick?: (tab: string) => void;
  onLoginClick?: () => void;
  userName?: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onAvatarClick?: () => void;
  logo?: ReactNode;
  className?: string;
};

const DEFAULT_TABS: GNBTab[] = [
  { label: "모델 카탈로그", value: "catalog" },
  { label: "생성하기", value: "create" },
  { label: "히스토리", value: "history" },
  { label: "요금제", value: "pricing" },
];

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0"
        stroke="#B6AFB3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoPlaceholder() {
  return (
    <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
      <span className="text-[16px] font-bold text-neutral-500">M</span>
    </div>
  );
}

export function GNB({
  state,
  tabs = DEFAULT_TABS,
  activeTab,
  onTabClick,
  onLoginClick,
  userName = "M",
  notificationCount = 0,
  onNotificationClick,
  onAvatarClick,
  logo,
  className = "",
}: GNBProps) {
  const isLanding = state === "landing";

  const containerClasses = [
    "w-full max-w-[1440px] h-[88px] flex items-center px-[120px] py-4",
    "bg-neutral-50",
    isLanding
      ? "bg-neutral-50/60 rounded-full shadow-[0_1px_3.5px_#e8e3e6,0_2px_7px_rgba(32,29,31,0.13)]"
      : "shadow-[0_1px_0.875px_#e8e3e6]",
    className,
  ].join(" ");

  return (
    <nav className={containerClasses}>
      {/* 왼쪽: 로고 + 탭 */}
      <div className="flex items-center gap-8 flex-1">
        {logo ?? <LogoPlaceholder />}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <GNBTabButton
              key={tab.value}
              label={tab.label}
              size="large"
              active={activeTab === tab.value}
              badge={tab.badge}
              onClick={() => onTabClick?.(tab.value)}
            />
          ))}
        </div>
      </div>

      {/* 오른쪽 */}
      {state === "login" ? (
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onNotificationClick}
            className="flex items-center gap-1 cursor-pointer"
          >
            <BellIcon />
            {notificationCount > 0 && (
              <span className="flex items-center gap-1 bg-neutral-100 rounded-[4px] px-1.5 py-0.5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                  <path
                    d="M13.5 6A4.5 4.5 0 1 0 4.5 6c0 5.25-2.25 6.75-2.25 6.75h13.5S13.5 11.25 13.5 6ZM10.3 15.75a1.5 1.5 0 0 1-2.6 0"
                    stroke="#B6AFB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[16px] font-medium leading-[1.75] text-neutral-500">
                  {notificationCount}
                </span>
              </span>
            )}
          </button>
          <button type="button" onClick={onAvatarClick} className="cursor-pointer">
            <Avatar name={userName} size="lg" />
          </button>
        </div>
      ) : (
        <GNBTabButton
          label="로그인"
          size="large"
          onClick={onLoginClick}
        />
      )}
    </nav>
  );
}
