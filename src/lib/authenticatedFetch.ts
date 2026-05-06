import { getAccessToken, API_BASE } from "@/lib/fetchClient";

const isAbsolute = (url: string) => /^https?:\/\//i.test(url);

export const fetchAuthenticatedBlob = async (url: string): Promise<Blob> => {
  const isExternal = isAbsolute(url);
  const target = isExternal ? url : `${API_BASE}${url}`;
  const token = getAccessToken();
  // 외부 CDN(fal.media 등)은 `Access-Control-Allow-Origin: *`로 응답하므로
  // credentials/Authorization 헤더를 보내면 브라우저가 CORS 차단.
  const res = await fetch(target, {
    headers: !isExternal && token ? { Authorization: `Bearer ${token}` } : {},
    credentials: isExternal ? "omit" : "include",
  });
  if (!res.ok) {
    throw new Error(`failed to fetch ${target}: ${res.status}`);
  }
  return res.blob();
};
