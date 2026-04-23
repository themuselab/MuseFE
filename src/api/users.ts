import { fetchClient } from "@/lib/fetchClient";
import type { UserProfile } from "@/types/auth";

export type UpdateMeInput = {
  ageGroup?: string;
  business?: {
    industryMain?: string;
    businessName?: string;
    businessDuration?: string;
  };
};

export const usersApi = {
  me: () => fetchClient<UserProfile>("/users/me"),

  updateMe: (data: UpdateMeInput) =>
    fetchClient<UserProfile>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
