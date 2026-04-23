"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGNB } from "@/components/AuthGNB";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { INDUSTRY_MAIN_OPTIONS } from "@/constants/app";
import { CatalogHero } from "./_components/CatalogHero";
import { TopModelsSection } from "./_components/TopModelsSection";
import { BestUseCaseSection } from "./_components/BestUseCaseSection";
import { WelcomeModal } from "./_components/WelcomeModal";

export default function CatalogPage() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  const industryMain = user?.business?.industryMain;
  const industryLabel =
    INDUSTRY_MAIN_OPTIONS.find((o) => o.value === industryMain)?.label ?? "OO 인상";

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <AuthGNB activeTab="catalog" />
      <main className="flex-1 flex flex-col gap-12 md:gap-20 px-6 md:px-30 pb-20 max-w-[1440px] w-full mx-auto">
        <CatalogHero />
        <TopModelsSection categoryLabel={industryLabel} />
        <BestUseCaseSection />
      </main>

      {!user && (
        <WelcomeModal
          open={welcomeOpen}
          onDismiss={() => setWelcomeOpen(false)}
          onStart={() => {
            setWelcomeOpen(false);
            router.push("/signup");
          }}
        />
      )}
    </div>
  );
}
