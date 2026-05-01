"use client";

import Image from "next/image";
import { useState } from "react";

type ModelImageGalleryProps = {
  images: string[];
  alt: string;
};

export function ModelImageGallery({ images, alt }: ModelImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const total = images.length;
  const current = images[selectedIndex] ?? "";
  const hasImage = current.length > 0;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full aspect-3/4 rounded-md bg-neutral-100 overflow-hidden">
        {hasImage ? (
          <Image
            src={current}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 400px, 100vw"
          />
        ) : null}
        <span className="absolute bottom-2 right-2 inline-flex items-center px-2 py-1 rounded-sm bg-neutral-900/50 text-neutral-50 text-caption-s">
          {selectedIndex + 1} / {total}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 w-full">
        {images.map((src, i) => {
          const isSelected = i === selectedIndex;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              aria-label={`${i + 1}번째 이미지 보기`}
              aria-pressed={isSelected}
              className={`relative aspect-square rounded-sm overflow-hidden bg-neutral-100 cursor-pointer transition-all ${
                isSelected
                  ? "border-2 border-pink-400"
                  : "border border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {src ? (
                <Image
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
