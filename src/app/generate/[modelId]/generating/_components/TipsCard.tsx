"use client";

import { useEffect, useState } from "react";
import { GENERATION_TIPS, TIP_ROTATION_INTERVAL_MS } from "../_constants";

export function TipsCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % GENERATION_TIPS.length);
    }, TIP_ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative rounded-lg border border-pink-400 px-3 pt-4 pb-3 bg-neutral-50">
      <span className="absolute -top-2 left-3 px-1 bg-neutral-50 text-caption-m text-pink-500">
        Tips
      </span>
      <p
        key={index}
        className="text-caption-m text-neutral-700 animate-[tipsFadeUp_400ms_ease-out]"
      >
        {GENERATION_TIPS[index]}
      </p>
      <style>{`
        @keyframes tipsFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
