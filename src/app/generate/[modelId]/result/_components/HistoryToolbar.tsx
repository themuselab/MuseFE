"use client";

type HistoryToolbarProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

function UndoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M7 8H13.5a3.5 3.5 0 010 7H10M7 8l3-3M7 8l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M13 8H6.5a3.5 3.5 0 100 7H10M13 8l-3-3M13 8l-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HistoryToolbar({ canUndo, canRedo, onUndo, onRedo }: HistoryToolbarProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-neutral-200 pb-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="되돌리기"
          className="p-2 rounded text-neutral-700 disabled:text-neutral-300 cursor-pointer disabled:cursor-not-allowed hover:bg-neutral-100 disabled:hover:bg-transparent"
        >
          <UndoIcon />
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          aria-label="다시 실행"
          className="p-2 rounded text-neutral-700 disabled:text-neutral-300 cursor-pointer disabled:cursor-not-allowed hover:bg-neutral-100 disabled:hover:bg-transparent"
        >
          <RedoIcon />
        </button>
      </div>
    </div>
  );
}
