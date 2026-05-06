"use client";

import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adsApi } from "@/api/ads";
import { dtoToHistoryItem } from "../_data";
import type { HistoryItem } from "../_types";

const HISTORY_QUERY_KEY = ["history"] as const;
const HISTORY_LIMIT = 100;

type UseHistoryItemsResult = {
  items: HistoryItem[];
  isLoading: boolean;
  isError: boolean;
};

export const useHistoryItems = (): UseHistoryItemsResult => {
  const query = useQuery({
    queryKey: HISTORY_QUERY_KEY,
    queryFn: async () => {
      const res = await adsApi.listJobs({ limit: HISTORY_LIMIT });
      if (!res.success) throw new Error(res.error.message);
      return res.data.items;
    },
  });

  const items = useMemo(
    () => (query.data ?? []).map(dtoToHistoryItem),
    [query.data],
  );

  return {
    items,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export const useDeleteHistoryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: string) => {
      const res = await adsApi.deleteJob(jobId);
      if (!res.success) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HISTORY_QUERY_KEY });
    },
  });
};

export const useDownloadHistoryItem = () =>
  useMutation({
    mutationFn: async ({
      id,
      fallbackFilename,
    }: {
      id: string;
      fallbackFilename: string;
    }) => {
      await adsApi.downloadJob(id, fallbackFilename);
    },
  });
