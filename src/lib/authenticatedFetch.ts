import { getAccessToken, API_BASE } from "@/lib/fetchClient";

const isAbsolute = (url: string) => /^https?:\/\//i.test(url);

export const fetchAuthenticatedBlob = async (url: string): Promise<Blob> => {
  const target = isAbsolute(url) ? url : `${API_BASE}${url}`;
  const token = getAccessToken();
  const res = await fetch(target, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`failed to fetch ${target}: ${res.status}`);
  }
  return res.blob();
};
