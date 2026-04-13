"use client";

import { useRouter } from "next/navigation";
import { GNB } from "@/components/GNB";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLogout } from "@/hooks/useLogout";

export function AuthGNB() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const isLoggedIn = !!user;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
  };

  return (
    <GNB
      state={isLoggedIn ? "login" : "logout"}
      tabs={[
        { label: "모델 카탈로그", value: "catalog" },
        { label: "생성하기", value: "create" },
        { label: "요금제", value: "pricing" },
      ]}
      onLoginClick={() => router.push("/login")}
      userName={user?.email?.charAt(0).toUpperCase() ?? "M"}
      onAvatarClick={handleLogout}
    />
  );
}
