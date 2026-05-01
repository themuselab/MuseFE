"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AdInfoFormState } from "../../create/_types";

const FLOW_KEY_PREFIX = "ad-create-flow:";
const PRODUCT_KEY_PREFIX = "ad-create-product:";

export type AdCreateProductPayload = {
  productImageUrl: string | null;
};

export type GenerationContext = {
  flow: AdInfoFormState;
  product: AdCreateProductPayload;
};

function isAdInfoFormState(value: unknown): value is AdInfoFormState {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.industry === "string" &&
    typeof obj.itemName === "string" &&
    typeof obj.description === "string" &&
    (obj.selectedMoodId === null || typeof obj.selectedMoodId === "string")
  );
}

function isProductPayload(value: unknown): value is AdCreateProductPayload {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return obj.productImageUrl === null || typeof obj.productImageUrl === "string";
}

function safeParse<T>(raw: string | null, guard: (value: unknown) => value is T): T | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return guard(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function useGenerationContext(modelId: string): GenerationContext | null {
  const router = useRouter();
  const [ctx, setCtx] = useState<GenerationContext | null>(null);

  useEffect(() => {
    const flow = safeParse(
      sessionStorage.getItem(`${FLOW_KEY_PREFIX}${modelId}`),
      isAdInfoFormState,
    );
    const product = safeParse(
      sessionStorage.getItem(`${PRODUCT_KEY_PREFIX}${modelId}`),
      isProductPayload,
    );

    if (!flow || !product) {
      router.replace(`/generate/${modelId}/create`);
      return;
    }

    setCtx({ flow, product });
  }, [modelId, router]);

  return ctx;
}
