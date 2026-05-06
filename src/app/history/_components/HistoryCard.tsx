"use client";

import { useAuthenticatedImage } from "@/hooks/useAuthenticatedImage";
import { formatHistoryDate } from "../_data";
import type { HistoryItem } from "../_types";

type HistoryCardProps = {
  item: HistoryItem;
  onEdit: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onDownload: (item: HistoryItem) => void;
};

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11.333 2.667a1.886 1.886 0 0 1 2.667 2.666L5.333 14 2 14.667l.667-3.334 8.666-8.666Z"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 4h12M6 4V2.667A1.333 1.333 0 0 1 7.333 1.333h1.334A1.333 1.333 0 0 1 10 2.667V4m2 0v9.333a1.333 1.333 0 0 1-1.333 1.334H5.333A1.333 1.333 0 0 1 4 13.333V4h8Z"
        stroke="currentColor"
        strokeWidth="1.333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HistoryCard({ item, onEdit, onDelete, onDownload }: HistoryCardProps) {
  const isCompleted = item.status === "completed";
  const displayImage = isCompleted ? item.imageUrl : item.baseImageUrl;
  const itemLabel = item.itemName ?? "이름 없음";
  const { blobUrl } = useAuthenticatedImage(displayImage);

  return (
    <div className="group flex flex-col rounded-sm bg-neutral-50 shadow-[0_1px_3.5px_#201d1f14] overflow-hidden">
      <div className="relative h-72 bg-neutral-100 overflow-hidden">
        {blobUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blobUrl}
            alt={itemLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}

        {isCompleted ? (
          <div className="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center gap-1 bg-neutral-900/40">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="flex items-center justify-center gap-1.5 rounded-full bg-neutral-50 border border-neutral-200 px-4 py-2.5 text-label-m text-neutral-900 cursor-pointer w-[83px]"
            >
              <EditIcon />
              편집
            </button>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="flex items-center justify-center gap-1.5 rounded-full bg-neutral-50 border border-error-500 px-4 py-2.5 text-label-m text-error-500 cursor-pointer w-[83px]"
            >
              <TrashIcon />
              삭제
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-card-label-gap px-2 pb-3">
        <div className="flex flex-col gap-2">
          <p className="text-heading-s text-neutral-900 truncate">{itemLabel}</p>
          <p className="text-caption-m text-neutral-700 truncate">
            {item.modelName ?? "-"}
          </p>
          <p className="text-caption-m text-neutral-700 truncate">
            {formatHistoryDate(item.createdAt)}
          </p>
        </div>

        <button
          type="button"
          disabled={!isCompleted}
          onClick={() => onDownload(item)}
          className={[
            "flex items-center justify-center rounded-full px-4 py-2.5 text-label-m w-full",
            isCompleted
              ? "bg-neutral-900 text-neutral-50 cursor-pointer"
              : "bg-neutral-300 text-neutral-400 cursor-not-allowed",
          ].join(" ")}
        >
          {isCompleted ? "다운로드" : "제작 중"}
        </button>
      </div>
    </div>
  );
}
