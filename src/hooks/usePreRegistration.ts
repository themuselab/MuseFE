"use client";

import { useMutation } from "@tanstack/react-query";
import {
  preRegistrationApi,
  type PreRegistrationRequest,
  type PreRegistrationResponse,
} from "@/api/preRegistration";

type ApiError = { code: string; message: string };

export function usePreRegistration(options?: {
  onSuccess?: (data: PreRegistrationResponse) => void;
  onError?: (error: ApiError) => void;
}) {
  return useMutation({
    mutationFn: async (payload: PreRegistrationRequest) => {
      const res = await preRegistrationApi.submit(payload);
      if (!res.success) {
        throw res.error;
      }
      return res.data;
    },
    onSuccess: options?.onSuccess,
    onError: (error: ApiError) => {
      options?.onError?.(error);
    },
  });
}
