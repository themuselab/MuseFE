"use client";

import Image from "next/image";

type ResultCardProps = {
  src: string;
  alt: string;
  showEditOverlay?: boolean;
  onEdit?: () => void;
};

function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11.333 2.667a1.886 1.886 0 1 1 2.667 2.667L5.333 14H2.667v-2.667l8.666-8.666Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResultCard({
  src,
  alt,
  showEditOverlay = false,
  onEdit,
}: ResultCardProps) {
  return (
    <div className="relative w-full max-w-[396px] aspect-2/3 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
      {src.startsWith("data:") || src.startsWith("blob:") ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 396px, (min-width: 640px) 50vw, 100vw"
        />
      )}
      {showEditOverlay ? (
        <button
          type="button"
          onClick={onEdit}
          className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded bg-neutral-900/40 px-2 py-1.5 text-neutral-50 cursor-pointer"
        >
          <PencilIcon />
          <span className="text-body-m">텍스트 편집</span>
        </button>
      ) : null}
    </div>
  );
}
