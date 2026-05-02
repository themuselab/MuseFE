import { fetchAuthenticatedBlob } from "@/lib/authenticatedFetch";

export const downloadAuthenticated = async (
  url: string,
  filename: string,
): Promise<void> => {
  const blob = await fetchAuthenticatedBlob(url);
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // 약간의 지연 후 revoke (다운로드 시작 보장)
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
};
