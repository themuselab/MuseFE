"use client";

import { useMutation } from "@tanstack/react-query";
import { adsApi } from "@/api/ads";
import type { GenerateAdRequest, GenerateAdResponse } from "@/types/ad";

export const useGenerateAd = () => {
  return useMutation<GenerateAdResponse, Error, GenerateAdRequest>({
    mutationFn: async (input) => {
      const result = await adsApi.generate(input);
      if (result.success) return result.data;
      throw new Error(result.error.message);
    },
  });
};
