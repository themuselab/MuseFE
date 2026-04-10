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

export const fetchClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const body: ApiResponse<T> = await response.json();

  return body;
};
