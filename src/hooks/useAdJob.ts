"use client";

import { useQuery } from "@tanstack/react-query";
import { adsApi } from "@/api/ads";
import type { JobDto } from "@/types/ad";

const POLL_INTERVAL_MS = 3000;

export const useAdJob = (jobId: string | null) => {
  return useQuery({
    queryKey: ["adJob", jobId],
    queryFn: async (): Promise<JobDto> => {
      if (!jobId) throw new Error("jobId 없음");
      const result = await adsApi.getJob(jobId);
      if (result.success) return result.data;
      throw new Error(result.error.message);
    },
    enabled: Boolean(jobId),
    // 진행 중일 때만 3초마다 폴링, completed/failed면 멈춤
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return POLL_INTERVAL_MS;
      if (data.status === "completed" || data.status === "failed") return false;
      return POLL_INTERVAL_MS;
    },
    refetchOnWindowFocus: false,
  });
};
