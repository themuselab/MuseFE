"use client";

import { useEffect, useState } from "react";
import { fetchAuthenticatedBlob } from "@/lib/authenticatedFetch";

/**
 * 인증 필요 정적 파일(/uploads/...) 을 fetch + blob URL 로 반환.
 * url 변경 시 / unmount 시 revokeObjectURL 정리.
 */
export const useAuthenticatedImage = (url: string | null | undefined) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
      setBlobUrl(null);
      return;
    }

    let cancelled = false;
    let createdUrl: string | null = null;

    fetchAuthenticatedBlob(url)
      .then((blob) => {
        if (cancelled) return;
        createdUrl = URL.createObjectURL(blob);
        setBlobUrl(createdUrl);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      });

    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [url]);

  return { blobUrl, error, loading: Boolean(url) && blobUrl === null && error === null };
};
