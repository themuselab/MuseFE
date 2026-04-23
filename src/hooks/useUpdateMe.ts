"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, type UpdateMeInput } from "@/api/users";

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateMeInput) => {
      const result = await usersApi.updateMe(input);
      if (!result.success) throw new Error(result.error.message);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
