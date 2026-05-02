"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AdInfoFormState } from "../../create/_types";

const FLOW_KEY_PREFIX = "ad-create-flow:";

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

export function useFlowState(modelId: string): AdInfoFormState | null {
  const router = useRouter();
  const [state, setState] = useState<AdInfoFormState | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`${FLOW_KEY_PREFIX}${modelId}`);
    if (!raw) {
      router.replace(`/generate/${modelId}/create`);
      return;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      if (!isAdInfoFormState(parsed)) {
        router.replace(`/generate/${modelId}/create`);
        return;
      }
      setState(parsed);
    } catch {
      router.replace(`/generate/${modelId}/create`);
    }
  }, [modelId, router]);

  return state;
}
