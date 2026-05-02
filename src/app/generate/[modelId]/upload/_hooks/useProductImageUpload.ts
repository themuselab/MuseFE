"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useUploadProductImage } from "@/hooks/useUploadProductImage";

export type UploadStatus =
  | { kind: "idle" }
  | { kind: "loading"; previewUrl: string }
  | { kind: "done"; previewUrl: string; productImagePath: string }
  | { kind: "error"; previewUrl: string; message: string };

export function useProductImageUpload(initial?: {
  productImagePath: string;
  previewUrl: string;
}) {
  const [status, setStatus] = useState<UploadStatus>(
    initial
      ? { kind: "done", previewUrl: initial.previewUrl, productImagePath: initial.productImagePath }
      : { kind: "idle" },
  );
  const previousUrlRef = useRef<string | null>(null);
  const mutation = useUploadProductImage();

  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
    };
  }, []);

  const onSelectFile = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
      previousUrlRef.current = url;
      setStatus({ kind: "loading", previewUrl: url });

      mutation.mutate(file, {
        onSuccess: (data) => {
          setStatus({
            kind: "done",
            previewUrl: url,
            productImagePath: data.productImagePath,
          });
        },
        onError: (err) => {
          setStatus({
            kind: "error",
            previewUrl: url,
            message: err instanceof Error ? err.message : "업로드 실패",
          });
        },
      });
    },
    [mutation],
  );

  return { status, onSelectFile };
}
