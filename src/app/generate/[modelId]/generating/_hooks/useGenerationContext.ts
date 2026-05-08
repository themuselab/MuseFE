"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AD_CREATE_KEYS } from "@/constants/app";
import type { AdInfoFormState } from "../../create/_types";

export type AdCreateProductPayload = {
  productImagePath?: string;
};

export type GenerationContext = {
  flow: AdInfoFormState;
  product: AdCreateProductPayload;
};

function isAdInfoFormState(value: unknown): value is AdInfoFormState {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (
    typeof obj.industry !== "string" ||
    typeof obj.itemName !== "string" ||
    typeof obj.description !== "string"
  ) {
    return false;
  }
  if (obj.selectedMood === null) return true;
  if (typeof obj.selectedMood !== "object" || obj.selectedMood === null) {
    return false;
  }
  const mood = obj.selectedMood as Record<string, unknown>;
  return (
    typeof mood.id === "string" &&
    typeof mood.label === "string" &&
    typeof mood.subtitle === "string"
  );
}

function isProductPayload(value: unknown): value is AdCreateProductPayload {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (obj.productImagePath === undefined) return true;
  return typeof obj.productImagePath === "string";
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
      sessionStorage.getItem(AD_CREATE_KEYS.flow(modelId)),
      isAdInfoFormState,
    );
    const product = safeParse(
      sessionStorage.getItem(AD_CREATE_KEYS.product(modelId)),
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
