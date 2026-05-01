"use client";

import { useEffect, useState } from "react";
import { MOOD_PRESETS } from "../_data";
import type { Mood, MoodSectionState } from "../_types";

const DEBOUNCE_MS = 600;
const MOCK_FETCH_MS = 1200;

type Args = {
  industry: string;
  itemName: string;
};

type AsyncResult =
  | { loading: false; moods: null }
  | { loading: true }
  | { loading: false; moods: Mood[] };

const INITIAL: AsyncResult = { loading: false, moods: null };

export function useMoodRecommendation({
  industry,
  itemName,
}: Args): MoodSectionState {
  const [result, setResult] = useState<AsyncResult>(INITIAL);
  const isInputReady = industry.length > 0 && itemName.length > 0;

  useEffect(() => {
    if (!isInputReady) return;

    let cancelled = false;
    let fetchTimer: ReturnType<typeof setTimeout> | null = null;

    const debounceTimer = setTimeout(() => {
      if (cancelled) return;
      setResult({ loading: true });
      fetchTimer = setTimeout(() => {
        if (cancelled) return;
        setResult({ loading: false, moods: MOOD_PRESETS.slice(0, 3) });
      }, MOCK_FETCH_MS);
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(debounceTimer);
      if (fetchTimer) clearTimeout(fetchTimer);
    };
  }, [isInputReady, industry, itemName]);

  if (!isInputReady) return { kind: "idle" };
  if (result.loading) return { kind: "loading" };
  if (result.moods) return { kind: "result", moods: result.moods };
  return { kind: "loading" };
}
