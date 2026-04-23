"use client";

import { AuthGNB } from "@/components/AuthGNB";
import { HeroSection } from "./_components/HeroSection";
import { FeatureSection } from "./_components/FeatureSection";
import { PromptSection } from "./_components/PromptSection";
import { CatalogSection } from "./_components/CatalogSection";
import { StepSection } from "./_components/StepSection";
import { CTASection } from "./_components/CTASection";
import { LandingFooter } from "./_components/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <AuthGNB />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeatureSection />
        <PromptSection />
        <CatalogSection />
        <StepSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
