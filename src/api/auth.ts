import { fetchClient } from "@/lib/fetchClient";
import type { LoginResponse, SignupRequest, GoogleSignupRequest, UserProfile } from "@/types/auth";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    fetchClient<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  signup: (data: SignupRequest) =>
    fetchClient<{ userId: string }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  googleSignup: (data: GoogleSignupRequest) =>
    fetchClient<LoginResponse>("/auth/google/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  exchange: (code: string) =>
    fetchClient<LoginResponse>("/auth/exchange", {
      method: "POST",
      body: JSON.stringify({ code }),
    }),

  googlePending: (code: string) =>
    fetchClient<{ email: string }>(`/auth/google/pending?code=${encodeURIComponent(code)}`),

  refresh: () =>
    fetchClient<{ accessToken: string }>("/auth/refresh", {
      method: "POST",
    }),

  logout: () =>
    fetchClient<null>("/auth/logout", {
      method: "POST",
    }),

  checkEmail: (email: string) =>
    fetchClient<{ available: boolean }>("/auth/check-email", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  me: () => fetchClient<UserProfile>("/auth/me"),
};
