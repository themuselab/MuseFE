"use client";

import { useQuery } from "@tanstack/react-query";
import { catalogModelsApi } from "@/api/catalogModels";
import type { ListTopCatalogModelsResponse } from "@/types/ad";

export const useTopCatalogModels = () => {
  return useQuery({
    queryKey: ["catalogModels", "top"],
    queryFn: async (): Promise<ListTopCatalogModelsResponse> => {
      const result = await catalogModelsApi.top();
      if (result.success) return result.data;
      throw new Error(result.error.message);
    },
  });
};
