"use client";

import { useEffect, useState } from "react";
import { GENERATION_DURATION_MS } from "../_constants";

export function useGenerationProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / GENERATION_DURATION_MS);
      setProgress(Math.round(ratio * 100));
      if (ratio < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return progress;
}
