"use client";

import { useMutation } from "@tanstack/react-query";
import { adsApi } from "@/api/ads";
import type { RecommendMoodsRequest, RecommendMoodsResponse } from "@/types/ad";

export const useRecommendMoods = () => {
  return useMutation<RecommendMoodsResponse, Error, RecommendMoodsRequest>({
    mutationFn: async (input) => {
      const result = await adsApi.recommendMoods(input);
      if (result.success) return result.data;
      throw new Error(result.error.message);
    },
  });
};
