"use client";

const PLACEHOLDER_COUNT = 9;

export function ImageGrid() {
  return (
    <div className="w-136 h-137 shrink-0">
      <div className="grid grid-cols-3 gap-x-2 gap-y-2.5 w-full h-full">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
          <div
            key={i}
            className="w-44 h-44 rounded-lg bg-neutral-100"
          />
        ))}
      </div>
    </div>
  );
}
