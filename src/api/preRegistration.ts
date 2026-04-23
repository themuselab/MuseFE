import { fetchClient } from "@/lib/fetchClient";

export type PreRegistrationRequest = {
  email: string;
  phone?: string;
  privacyAgreed: true;
  marketingAgreed: boolean;
};

export type PreRegistrationResponse = {
  id: string;
  email: string;
  createdAt: string;
};

export const preRegistrationApi = {
  submit: (data: PreRegistrationRequest) =>
    fetchClient<PreRegistrationResponse>("/pre-registration", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
