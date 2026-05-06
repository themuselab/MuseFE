"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGNB } from "@/components/AuthGNB";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useTopCatalogModels } from "@/hooks/useTopCatalogModels";
import {
  INDUSTRY_MAIN_OPTIONS,
  WELCOME_MODAL_DISMISSED_KEY,
} from "@/constants/app";
import { CatalogHero } from "./_components/CatalogHero";
import { TopModelsSection } from "./_components/TopModelsSection";
import { BestUseCaseSection } from "./_components/BestUseCaseSection";
import { WelcomeModal } from "./_components/WelcomeModal";
import type { TopModel } from "./_types";
import type { CatalogTopModelDto } from "@/types/ad";

const dtoToTopModel = (dto: CatalogTopModelDto): TopModel => ({
  id: dto.id,
  rank: dto.rank,
  name: dto.name,
  tags: dto.tags.filter((t): t is string => Boolean(t && t.trim())),
  imageUrl: dto.imageUrl,
});

export default function CatalogPage() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const [welcomeOpen, setWelcomeOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      window.localStorage.getItem(WELCOME_MODAL_DISMISSED_KEY) !== "true"
    );
  });

  const industryMain = user?.business?.industryMain;
  const industryLabel =
    INDUSTRY_MAIN_OPTIONS.find((o) => o.value === industryMain)?.label ?? "OO 인상";

  const topQuery = useTopCatalogModels();
  const topModels: TopModel[] = useMemo(
    () => (topQuery.data?.items ?? []).map(dtoToTopModel),
    [topQuery.data],
  );

  const dismissWelcome = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(WELCOME_MODAL_DISMISSED_KEY, "true");
    }
    setWelcomeOpen(false);
  };

  const handleModelClick = () => {
    if (!user) {
      router.push(`/login?from=${encodeURIComponent("/catalog")}`);
      return;
    }
    router.push("/generate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <AuthGNB activeTab="catalog" />
      <main className="flex-1 flex flex-col gap-12 md:gap-20 px-6 md:px-30 pb-20 max-w-[1440px] w-full mx-auto">
        <CatalogHero />
        <TopModelsSection
          categoryLabel={industryLabel}
          models={topModels}
          onModelClick={handleModelClick}
        />
        <BestUseCaseSection />
      </main>

      {!user && (
        <WelcomeModal
          open={welcomeOpen}
          onDismiss={dismissWelcome}
          onStart={() => {
            dismissWelcome();
            router.push("/signup");
          }}
        />
      )}
    </div>
  );
}
