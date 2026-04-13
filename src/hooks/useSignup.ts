"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import type { SignupRequest } from "@/types/auth";

export const useSignup = () =>
  useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
  });
