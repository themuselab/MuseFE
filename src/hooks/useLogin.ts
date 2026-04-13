"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { setAccessToken } from "@/lib/fetchClient";

export const useLogin = () =>
  useMutation({
    mutationFn: (data: { email: string; password: string }) => authApi.login(data),
    onSuccess: (result) => {
      if (result.success) {
        setAccessToken(result.data.accessToken);
      }
    },
  });
