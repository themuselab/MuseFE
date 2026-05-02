"use client";

import { useEffect, useState } from "react";
import { useRecommendMoods } from "@/hooks/useRecommendMoods";
import { industryLabelOf } from "@/constants/app";
import type { Mood, MoodSectionState } from "../_types";

const DEBOUNCE_MS = 600;

type Args = {
  industry: string; // FE 코드 (예: "fashion_beauty")
  itemName: string;
  description?: string;
};

export function useMoodRecommendation({
  industry,
  itemName,
  description,
}: Args): MoodSectionState {
  const [moods, setMoods] = useState<Mood[] | null>(null);
  const mutation = useRecommendMoods();
  const isInputReady = industry.length > 0 && itemName.length > 0;

  useEffect(() => {
    if (!isInputReady) {
      setMoods(null);
      return;
    }

    let cancelled = false;
    const debounce = setTimeout(() => {
      if (cancelled) return;
      mutation.mutate(
        {
          industry: industryLabelOf(industry),
          item: itemName,
          extraDescription: description?.trim() || undefined,
        },
        {
          onSuccess: (data) => {
            if (!cancelled) setMoods(data.moods);
          },
        },
      );
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(debounce);
    };
    // mutation은 ref 안정 — industry/item/desc 변경에만 반응
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputReady, industry, itemName, description]);

  if (!isInputReady) return { kind: "idle" };
  if (mutation.isPending || (moods === null && isInputReady))
    return { kind: "loading" };
  return { kind: "result", moods: moods ?? [] };
}
