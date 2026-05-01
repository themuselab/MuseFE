"use client";

import { useRef } from "react";
import { COLOR_SWATCHES } from "../_constants";

type ColorSwatchesProps = {
  value: string;
  onChange: (color: string) => void;
};

export function ColorSwatches({ value, onChange }: ColorSwatchesProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-label-l text-neutral-900">색상</span>
      <div className="flex gap-2.5 items-center">
        {COLOR_SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-label={`색상 ${c}`}
            className={[
              "w-10 h-10 rounded-full border cursor-pointer",
              value.toLowerCase() === c.toLowerCase()
                ? "border-pink-400 ring-2 ring-pink-100"
                : "border-neutral-200",
            ].join(" ")}
            style={{ backgroundColor: c }}
          />
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="색상 직접 선택"
          className="w-10 h-10 rounded-full border border-neutral-200 cursor-pointer"
          style={{
            background:
              "conic-gradient(from 0deg, #fe0005, #ff5e00, #ffc507, #90ff00, #00ff08, #00ff8c, #00ffea, #00ccff, #0000ff, #6400b6, #db00db, #ec007e, #fe0005)",
          }}
        />
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
