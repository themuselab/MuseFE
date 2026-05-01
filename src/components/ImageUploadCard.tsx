"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  type HTMLAttributes,
  useEffect,
  useId,
  useState,
} from "react";
import { ThreeDots } from "@/components/ThreeDots";

type ImageUploadCardSize = "sm" | "lg";

type ImageUploadCardProps = {
  size?: ImageUploadCardSize;
  title?: string;
  description?: string;
  imageUrl?: string | null;
  loading?: boolean;
  reuploadLabel?: string;
  onSelectFile?: (file: File) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

function UploadIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          transform="translate(1.16667 2.33333)"
          d="M5 6c0-2 0-6 6-6 6 0 6 4 6 6 1.66667 0 5 1 5 5m-17-5c-1.66667 0-5 1-5 5m19 4.60725c1.49372-0.58512 3-1.91836 3-4.60725m-22 0c0 2.68889 1.50628 4.02213 3 4.60725"
        />
        <path
          transform="translate(9.91667 15.16667)"
          d="M3.5 9l0-9 3.5 3.5m-7 0l3.5-3.5"
        />
      </g>
    </svg>
  );
}

function LoadingDots() {
  const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 350);
    return () => clearInterval(id);
  }, []);

  return <ThreeDots activeIndex={activeIndex} />;
}

export function ImageUploadCard({
  size = "lg",
  title = "이미지 업로드",
  description = "PNG, JPG (최대 10MB) · 배경이 투명한 이미지 권장",
  imageUrl,
  loading = false,
  reuploadLabel = "재업로드",
  onSelectFile,
  className = "",
  ...rest
}: ImageUploadCardProps) {
  const inputId = useId();
  const dimensions =
    size === "sm"
      ? { width: 696, height: 250 }
      : { width: 660, height: 350 };

  const hasImage = Boolean(imageUrl);
  const isLoading = hasImage && loading;
  const isDone = hasImage && !loading;
  const isIdle = !hasImage;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSelectFile) onSelectFile(file);
    e.target.value = "";
  };

  return (
    <div
      style={dimensions}
      className={`relative group rounded-xl overflow-hidden border border-neutral-200 ${className}`}
      {...rest}
    >
      {onSelectFile ? (
        <input
          id={inputId}
          type="file"
          accept="image/png,image/jpeg"
          className="sr-only"
          onChange={handleFileChange}
          tabIndex={-1}
          aria-hidden="true"
        />
      ) : null}

      {hasImage ? (
        <Image
          src={imageUrl ?? ""}
          alt={title}
          fill
          className="object-contain bg-neutral-50"
          sizes="(min-width: 1024px) 696px, 100vw"
        />
      ) : null}

      {isIdle ? (
        <label
          htmlFor={onSelectFile ? inputId : undefined}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-neutral-50 hover:bg-neutral-100 transition-colors text-neutral-700 cursor-pointer"
        >
          <UploadIcon />
          <div className="flex flex-col items-center text-center">
            <span className="text-heading-xs text-neutral-700">{title}</span>
            <span className="text-body-l text-neutral-500">{description}</span>
          </div>
        </label>
      ) : null}

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/20">
          <LoadingDots />
        </div>
      ) : null}

      {isDone ? (
        <label
          htmlFor={onSelectFile ? inputId : undefined}
          aria-label={reuploadLabel}
          className="absolute inset-0 flex items-center justify-center bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors cursor-pointer"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex h-12 items-center px-7 rounded-full bg-neutral-50 border border-neutral-200 text-label-l text-neutral-900">
            {reuploadLabel}
          </span>
        </label>
      ) : null}
    </div>
  );
}
