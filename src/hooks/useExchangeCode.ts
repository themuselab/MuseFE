"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { setAccessToken } from "@/lib/fetchClient";

export const useExchangeCode = () =>
  useMutation({
    mutationFn: (code: string) => authApi.exchange(code),
    onSuccess: (result) => {
      if (result.success) {
        setAccessToken(result.data.accessToken);
      }
    },
  });
