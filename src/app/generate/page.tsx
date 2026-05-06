"use client";

import { AuthGNB } from "@/components/AuthGNB";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCatalogModels } from "@/hooks/useCatalogModels";
import { useTopCatalogModels } from "@/hooks/useTopCatalogModels";
import { INDUSTRY_MAIN_OPTIONS } from "@/constants/app";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { TopRankingSection } from "./_components/TopRankingSection";
import { ModelFilterBar } from "./_components/ModelFilterBar";
import { ModelStatsBar } from "./_components/ModelStatsBar";
import { ModelGrid } from "./_components/ModelGrid";
import { FilterModal } from "./_components/FilterModal";
import { ModelDetailModal } from "./_components/ModelDetailModal";
import { useGenerateFilters } from "./_hooks/useGenerateFilters";
import { useModelDetail } from "./_hooks/useModelDetail";
import type { Model } from "./_types";
import type { CatalogModelDto, CatalogTopModelDto } from "@/types/ad";

const dtoToModel = (dto: CatalogModelDto | CatalogTopModelDto): Model => ({
  id: dto.id,
  name: dto.name,
  age: dto.age,
  gender: dto.gender,
  tags: dto.tags,
  imageUrl: dto.imageUrl,
  imageUrls: dto.imageUrls,
  scores: dto.scores,
  recommendedIndustries: dto.recommendedIndustries,
  ...("rank" in dto && typeof dto.rank === "number" ? { rank: dto.rank } : {}),
});

export default function GeneratePage() {
  const router = useRouter();
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
    setAll,
    openModal,
    closeModal,
    INITIAL_FILTERS,
  } = useGenerateFilters();

  const catalogQuery = useCatalogModels({
    gender: filters.gender,
    age: filters.age,
    primaryLabel: filters.impression,
    keyword,
    sort,
  });

  const topQuery = useTopCatalogModels();

  const allModels: Model[] = useMemo(
    () => (catalogQuery.data?.items ?? []).map(dtoToModel),
    [catalogQuery.data],
  );
  const topModels: Model[] = useMemo(
    () => (topQuery.data?.items ?? []).map(dtoToModel),
    [topQuery.data],
  );

  const total = catalogQuery.data?.total ?? allModels.length;

  const {
    selected: selectedModel,
    open: detailOpen,
    openWith: openDetail,
    close: closeDetail,
  } = useModelDetail();

  const handleModelClick = (model: Model) => {
    if (!user) {
      router.push(`/login?from=${encodeURIComponent("/generate")}`);
      return;
    }
    openDetail(model);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <AuthGNB activeTab="create" />

      <main className="flex-1 flex flex-col gap-5 px-6 md:px-30 pb-20 max-w-[1440px] w-full mx-auto pt-8 md:pt-10">
        <TopRankingSection
          categoryLabel={industryLabel}
          models={topModels}
          onModelClick={handleModelClick}
        />

        <hr className="border-t border-neutral-200" />

        <ModelFilterBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          onFilterOpen={openModal}
        />

        <ModelStatsBar total={total} sort={sort} onSortChange={setSort} />

        <ModelGrid models={allModels} onModelClick={handleModelClick} />
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
        appliedFilters={filters}
        initialFilters={INITIAL_FILTERS}
        sort={sort}
        keyword={keyword}
        onClose={closeModal}
        onCommit={(next) => {
          setAll(next);
          closeModal();
        }}
      />
    </div>
  );
}
