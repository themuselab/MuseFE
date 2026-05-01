"use client";

import { AuthGNB } from "@/components/AuthGNB";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { INDUSTRY_MAIN_OPTIONS } from "@/constants/app";
import { TopRankingSection } from "./_components/TopRankingSection";
import { ModelFilterBar } from "./_components/ModelFilterBar";
import { ModelStatsBar } from "./_components/ModelStatsBar";
import { ModelGrid } from "./_components/ModelGrid";
import { FilterModal } from "./_components/FilterModal";
import { ModelDetailModal } from "./_components/ModelDetailModal";
import { useGenerateFilters } from "./_hooks/useGenerateFilters";
import { useModelDetail } from "./_hooks/useModelDetail";
import { ALL_MODELS } from "./_data";

export default function GeneratePage() {
  const { data: user } = useCurrentUser();
  const industryMain = user?.business?.industryMain;
  const industryLabel = INDUSTRY_MAIN_OPTIONS.find(
    (o) => o.value === industryMain,
  )?.label;

  const {
    filters,
    keyword,
    sort,
    modalOpen,
    setKeyword,
    setSort,
    setGender,
    setAge,
    setImpression,
    reset,
    openModal,
    closeModal,
  } = useGenerateFilters();

  const {
    selected: selectedModel,
    open: detailOpen,
    openWith: openDetail,
    close: closeDetail,
  } = useModelDetail();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <AuthGNB activeTab="create" />

      <main className="flex-1 flex flex-col gap-5 px-6 md:px-30 pb-20 max-w-[1440px] w-full mx-auto pt-8 md:pt-10">
        <TopRankingSection
          categoryLabel={industryLabel}
          onModelClick={openDetail}
        />

        <hr className="border-t border-neutral-200" />

        <ModelFilterBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          onFilterOpen={openModal}
        />

        <ModelStatsBar
          total={ALL_MODELS.length}
          sort={sort}
          onSortChange={setSort}
        />

        <ModelGrid models={ALL_MODELS} onModelClick={openDetail} />
      </main>

      <div className="hidden md:block fixed top-1/2 right-3 -translate-y-1/2 pointer-events-none">
        <ScrollIndicator direction="bottom" />
      </div>

      <ModelDetailModal
        model={selectedModel}
        open={detailOpen}
        onClose={closeDetail}
      />

      <FilterModal
        open={modalOpen}
        filters={filters}
        matchCount={0}
        onClose={closeModal}
        onGenderChange={setGender}
        onAgeChange={setAge}
        onImpressionChange={setImpression}
        onReset={reset}
        onApply={closeModal}
      />
    </div>
  );
}
