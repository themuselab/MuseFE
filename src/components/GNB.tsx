"use client";

import { type ReactNode } from "react";
import Link from "next/link";
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

function MuseLogo() {
  return (
    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
      <svg width="44" height="23" viewBox="0 0 44 22.4" fill="none">
        <defs>
          <linearGradient id="muse-logo-gradient" x1="22" y1="0" x2="22" y2="22.4" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFD1E3" />
            <stop offset="100%" stopColor="#DFBAE3" />
          </linearGradient>
        </defs>
        <path
          d="M0 38.4V0.896H11.392V4.48C13.632 1.472 16.448 0 20.608 0C25.344 0 29.248 1.92 31.744 5.376C34.56 1.792 38.528 0 43.224 0C51.864 0 57.624 6.272 57.624 16.704V38.4H46.232V18.624C46.232 12.928 44.056 9.792 39.896 9.792C36.184 9.792 34.2 12.736 34.008 18.048V38.4H22.616V18.624C22.616 12.928 20.44 9.792 16.28 9.792C12.568 9.792 10.584 12.736 10.392 18.048V38.4H0Z"
          fill="url(#muse-logo-gradient)"
          transform="translate(0,0) scale(0.575)"
        />
        <path
          d="M6.4 0C10.048 0 12.736 2.752 12.736 6.4C12.736 10.048 10.048 12.8 6.4 12.8C2.688 12.8 0 10.048 0 6.4C0 2.752 2.688 0 6.4 0Z"
          fill="url(#muse-logo-gradient)"
          transform="translate(36.67,15.02) scale(0.575)"
        />
      </svg>
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
    "w-full lg:max-w-[1440px] lg:mx-auto h-[80px] lg:h-[88px] flex items-center justify-between px-6 lg:px-[120px] py-4",
    "bg-neutral-50",
    isLanding
      ? "lg:bg-neutral-50/60 lg:rounded-full lg:shadow-[0_1px_3.5px_#e8e3e6,0_2px_7px_rgba(32,29,31,0.13)] shadow-[0_1px_0.875px_#e8e3e6]"
      : "shadow-[0_1px_0.875px_#e8e3e6]",
    className,
  ].join(" ");

  return (
    <nav className={containerClasses}>
      {/* 로고 */}
      <Link href="/" className="shrink-0">{logo ?? <MuseLogo />}</Link>

      {/* 탭 (가운데) */}
      <div className="flex items-center gap-1 lg:gap-2">
        {tabs.map((tab) => (
          <GNBTabButton
            key={tab.value}
            label={tab.label}
            size="large"
            active={activeTab === tab.value}
            badge={tab.badge}
            onClick={() => onTabClick?.(tab.value)}
            className={tab.value === "pricing" ? "hidden lg:inline-flex" : ""}
          />
        ))}
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
              <span className="flex items-center gap-1 bg-neutral-100 rounded-sm px-1.5 py-0.5">
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
            <span className="hidden lg:block"><Avatar name={userName} size="lg" /></span>
            <span className="block lg:hidden"><Avatar name={userName} size="md" /></span>
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
