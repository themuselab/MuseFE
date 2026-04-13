"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { getAccessToken } from "@/lib/fetchClient";

export const useCurrentUser = () => {
  const hasToken = !!getAccessToken();

  return useQuery({
    queryKey: ["currentUser", hasToken],
    queryFn: async () => {
      if (!hasToken) return null;
      const result = await authApi.me();
      if (result.success) return result.data;
      return null;
    },
    enabled: hasToken,
    retry: false,
  });
};
