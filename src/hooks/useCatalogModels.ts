"use client";

import { useQuery } from "@tanstack/react-query";
import { catalogModelsApi } from "@/api/catalogModels";
import type { CatalogFilter, ListCatalogModelsResponse } from "@/types/ad";

export const useCatalogModels = (filter?: CatalogFilter) => {
  return useQuery({
    queryKey: ["catalogModels", filter ?? null],
    queryFn: async (): Promise<ListCatalogModelsResponse> => {
      const result = await catalogModelsApi.list(filter);
      if (result.success) return result.data;
      throw new Error(result.error.message);
    },
  });
};
