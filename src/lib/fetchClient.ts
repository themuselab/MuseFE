type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  error: null;
};

type ApiErrorResponse = {
  success: false;
  data: null;
  error: {
    code: string;
    message: string;
  };
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

let accessToken: string | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const getAccessToken = () => accessToken;

let authInitialized = false;
let initPromise: Promise<void> | null = null;

export const initializeAuth = async (): Promise<void> => {
  if (authInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const newToken = await attemptRefresh();
    if (newToken) {
      accessToken = newToken;
    }
    authInitialized = true;
    initPromise = null;
  })();

  return initPromise;
};

export const isAuthInitialized = () => authInitialized;

const attemptRefresh = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const body: ApiResponse<{ accessToken: string }> = await response.json();
    if (body.success) {
      return body.data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
};

type FetchOptions = RequestInit & { _retry?: boolean };

export const fetchClient = async <T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<ApiResponse<T>> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string> | undefined),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const body: ApiResponse<T> = await response.json();

  if (
    !body.success &&
    body.error.code === "AUTH_TOKEN_EXPIRED" &&
    !options?._retry
  ) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = attemptRefresh();
    }

    const newToken = await refreshPromise;
    isRefreshing = false;
    refreshPromise = null;

    if (newToken) {
      accessToken = newToken;
      return fetchClient<T>(endpoint, { ...options, _retry: true });
    }

    clearAccessToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return body;
};
