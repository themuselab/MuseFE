"use client";

import { useState } from "react";
import type {
  AgeFilter,
  FilterState,
  GenderFilter,
  ImpressionFilter,
  SortOption,
} from "../_types";

const INITIAL_STATE: FilterState = {
  gender: "all",
  age: "all",
  impression: "all",
};

export function useGenerateFilters() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_STATE);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState<SortOption>("recommend");
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const setGender = (gender: GenderFilter) =>
    setFilters((prev) => ({ ...prev, gender }));
  const setAge = (age: AgeFilter) =>
    setFilters((prev) => ({ ...prev, age }));
  const setImpression = (impression: ImpressionFilter) =>
    setFilters((prev) => ({ ...prev, impression }));

  const setAll = (next: FilterState) => setFilters(next);

  const reset = () => setFilters(INITIAL_STATE);

  return {
    filters,
    keyword,
    sort,
    modalOpen,
    setKeyword,
    setSort,
    setGender,
    setAge,
    setImpression,
    setAll,
    reset,
    openModal,
    closeModal,
    INITIAL_FILTERS: INITIAL_STATE,
  };
}
