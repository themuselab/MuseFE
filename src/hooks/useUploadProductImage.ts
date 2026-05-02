"use client";

import { useMutation } from "@tanstack/react-query";
import { adsApi } from "@/api/ads";
import type { UploadProductImageResponse } from "@/types/ad";

export const useUploadProductImage = () => {
  return useMutation<UploadProductImageResponse, Error, File>({
    mutationFn: async (file) => {
      const result = await adsApi.uploadProduct(file);
      if (result.success) return result.data;
      throw new Error(result.error.message);
    },
  });
};
