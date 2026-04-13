"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { setAccessToken } from "@/lib/fetchClient";
import type { GoogleSignupRequest } from "@/types/auth";

export const useGoogleSignup = () =>
  useMutation({
    mutationFn: (data: GoogleSignupRequest) => authApi.googleSignup(data),
    onSuccess: (result) => {
      if (result.success) {
        setAccessToken(result.data.accessToken);
      }
    },
  });
