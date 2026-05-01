"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MOCK_FETCH_MS = 1500;

export type UploadStatus =
  | { kind: "idle" }
  | { kind: "loading"; imageUrl: string }
  | { kind: "done"; imageUrl: string };

export function useProductImageUpload() {
  const [status, setStatus] = useState<UploadStatus>({ kind: "idle" });
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (status.kind === "loading") {
      const timer = setTimeout(() => {
        setStatus({ kind: "done", imageUrl: status.imageUrl });
      }, MOCK_FETCH_MS);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [status]);

  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
    };
  }, []);

  const onSelectFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    if (previousUrlRef.current) {
      URL.revokeObjectURL(previousUrlRef.current);
    }
    previousUrlRef.current = url;
    setStatus({ kind: "loading", imageUrl: url });
  }, []);

  return { status, onSelectFile };
}
