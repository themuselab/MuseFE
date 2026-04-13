"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export const useCheckEmail = () =>
  useMutation({
    mutationFn: (email: string) => authApi.checkEmail(email),
  });
