"use client";

import Image from "next/image";

const FACES = [
  { src: "/images/login/face-01.png", alt: "모델 인상 1" },
  { src: "/images/login/face-02.png", alt: "모델 인상 2" },
  { src: "/images/login/face-03.png", alt: "모델 인상 3" },
  { src: "/images/login/face-04.png", alt: "모델 인상 4" },
  { src: "/images/login/face-05.png", alt: "모델 인상 5" },
  { src: "/images/login/face-06.png", alt: "모델 인상 6" },
  { src: "/images/login/face-07.png", alt: "모델 인상 7" },
  { src: "/images/login/face-08.png", alt: "모델 인상 8" },
  { src: "/images/login/face-09.png", alt: "모델 인상 9" },
];

export function ImageGrid() {
  return (
    <div className="w-136 h-137 shrink-0">
      <div className="grid grid-cols-3 gap-x-2 gap-y-2.5 w-full h-full">
        {FACES.map((face) => (
          <div
            key={face.src}
            className="relative w-44 h-44 rounded-lg overflow-hidden bg-neutral-100"
          >
            <Image
              src={face.src}
              alt={face.alt}
              fill
              sizes="176px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
