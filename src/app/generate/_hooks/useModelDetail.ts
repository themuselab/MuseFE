"use client";

import { useCallback, useState } from "react";
import type { Model } from "../_types";

export function useModelDetail() {
  const [selected, setSelected] = useState<Model | null>(null);
  const open = selected !== null;

  const openWith = useCallback((model: Model) => {
    setSelected(model);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
  }, []);

  return { selected, open, openWith, close };
}
