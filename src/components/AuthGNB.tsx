"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GNB } from "@/components/GNB";
import { NotificationModal } from "@/components/NotificationModal";
import { Avatar } from "@/components/Avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLogout } from "@/hooks/useLogout";

type NotificationItem = {
  id: string;
  type: "meeting" | "comment" | "welcome";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
};

const DUMMY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    type: "welcome",
    title: "무료 크레딧 지급",
    message: "무료 크레딧 200P가 지급되었습니다.",
    timestamp: "5시간 전",
    read: false,
  },
  {
    id: "n2",
    type: "welcome",
    title: "무료 크레딧 지급",
    message: "회원가입 환영해요! 200P가 지급되었습니다.",
    timestamp: "5시간 전",
    read: false,
  },
];

const DUMMY_CREDITS = 200;

const TABS = [
  { label: "모델 카탈로그", value: "catalog", path: "/catalog" },
  { label: "생성하기", value: "create", path: "/create" },
  { label: "히스토리", value: "history", path: "/history" },
] as const;

type AuthGNBProps = {
  activeTab?: "catalog" | "create" | "history";
};

const CLOSE_IGNORE_MS = 150;

export function AuthGNB({ activeTab }: AuthGNBProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifClosedAtRef = useRef(0);
  const profileClosedAtRef = useRef(0);
  const profileRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!user;
  const displayName = user?.email?.split("@")[0] ?? "회원";
  const initial = displayName.charAt(0).toUpperCase();

  const resolvedActiveTab =
    activeTab ??
    TABS.find((tab) => pathname?.startsWith(tab.path))?.value ??
    "catalog";

  const handleTabClick = (value: string) => {
    const tab = TABS.find((t) => t.value === value);
    if (tab) router.push(tab.path);
  };

  const handleLogout = () => {
    setProfileOpen(false);
    logoutMutation.mutate(undefined, {
      onSuccess: () => router.push("/login"),
    });
  };

  const handleBellClick = () => {
    if (Date.now() - notifClosedAtRef.current < CLOSE_IGNORE_MS) return;
    setProfileOpen(false);
    setNotifOpen((prev) => !prev);
  };

  const handleAvatarClick = () => {
    if (Date.now() - profileClosedAtRef.current < CLOSE_IGNORE_MS) return;
    setNotifOpen(false);
    setProfileOpen((prev) => !prev);
  };

  const handleNotifClose = () => {
    notifClosedAtRef.current = Date.now();
    setNotifOpen(false);
  };

  useEffect(() => {
    if (!profileOpen) return;
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        profileClosedAtRef.current = Date.now();
        setProfileOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        profileClosedAtRef.current = Date.now();
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [profileOpen]);

  const hasUnread = DUMMY_NOTIFICATIONS.some((n) => !n.read);

  const profileDropdown = isLoggedIn && profileOpen ? (
    <div
      ref={profileRef}
      className="w-70 rounded-xl bg-neutral-50 border border-neutral-200 shadow-[0_4px_14px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <Avatar name={initial} size="md" />
        <div className="flex flex-col min-w-0">
          <span className="text-heading-xs text-neutral-900 truncate">
            {displayName} 님
          </span>
          <span className="text-caption-s text-neutral-500 truncate">
            {user?.email}
          </span>
        </div>
      </div>
      <div className="border-t border-neutral-200" />
      <button
        type="button"
        onClick={() => {
          setProfileOpen(false);
          router.push("/account");
        }}
        className="w-full flex items-center gap-2 px-5 py-3 text-body-m text-neutral-700 hover:bg-neutral-100 cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path d="M10 11a4 4 0 100-8 4 4 0 000 8zM2.5 17.5a7.5 7.5 0 0115 0" stroke="#70666B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        계정 설정
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex items-center gap-2 px-5 py-3 text-body-m text-error-500 hover:bg-neutral-100 cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path d="M13 5V3H3v14h10v-2M8 10h10m0 0l-3-3m3 3l-3 3" stroke="#D1291A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        로그아웃
      </button>
    </div>
  ) : null;

  return (
    <div className="relative">
      <GNB
        state={isLoggedIn ? "login" : "logout"}
        tabs={TABS.map(({ label, value }) => ({ label, value }))}
        activeTab={resolvedActiveTab}
        onTabClick={handleTabClick}
        onLoginClick={() => router.push("/login")}
        userName={initial}
        creditBalance={isLoggedIn ? DUMMY_CREDITS : undefined}
        hasUnreadNotifications={isLoggedIn && hasUnread}
        onNotificationClick={handleBellClick}
        onAvatarClick={handleAvatarClick}
      />

      {/* 알림 팝오버 */}
      {isLoggedIn && (
        <div className="absolute top-20 right-6 md:right-30 z-40">
          <NotificationModal
            open={notifOpen}
            onClose={handleNotifClose}
            items={DUMMY_NOTIFICATIONS}
          />
        </div>
      )}

      {/* 프로필 드롭다운 */}
      <div className="absolute top-20 right-6 md:right-30 z-40">
        {profileDropdown}
      </div>
    </div>
  );
}
