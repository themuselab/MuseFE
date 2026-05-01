"use client";

import type { AlignAxis, AlignSide } from "../_types";

type AlignmentControlsProps = {
  onAlign: (axis: AlignAxis, side: AlignSide) => void;
};

type ButtonDef = {
  axis: AlignAxis;
  side: AlignSide;
  label: string;
  icon: React.ReactNode;
};

function makeIcon(rects: ReadonlyArray<[number, number, number, number]>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="0.5" fill="currentColor" />
      ))}
    </svg>
  );
}

const BUTTONS: ReadonlyArray<ButtonDef> = [
  {
    axis: "h",
    side: "start",
    label: "좌측 정렬",
    icon: makeIcon([
      [2, 3, 0.6, 14],
      [4, 5, 10, 4],
      [4, 11, 7, 4],
    ]),
  },
  {
    axis: "h",
    side: "center",
    label: "수평 가운데",
    icon: makeIcon([
      [9.7, 3, 0.6, 14],
      [4, 5, 12, 4],
      [6, 11, 8, 4],
    ]),
  },
  {
    axis: "h",
    side: "end",
    label: "우측 정렬",
    icon: makeIcon([
      [17.4, 3, 0.6, 14],
      [6, 5, 10, 4],
      [9, 11, 7, 4],
    ]),
  },
  {
    axis: "v",
    side: "start",
    label: "상단 정렬",
    icon: makeIcon([
      [3, 2, 14, 0.6],
      [5, 4, 4, 10],
      [11, 4, 4, 7],
    ]),
  },
  {
    axis: "v",
    side: "center",
    label: "수직 가운데",
    icon: makeIcon([
      [3, 9.7, 14, 0.6],
      [5, 4, 4, 12],
      [11, 6, 4, 8],
    ]),
  },
  {
    axis: "v",
    side: "end",
    label: "하단 정렬",
    icon: makeIcon([
      [3, 17.4, 14, 0.6],
      [5, 6, 4, 10],
      [11, 9, 4, 7],
    ]),
  },
];

export function AlignmentControls({ onAlign }: AlignmentControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-label-l text-neutral-900">정렬</span>
      <div className="grid grid-cols-6 gap-1">
        {BUTTONS.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAlign(b.axis, b.side)}
            aria-label={b.label}
            className="h-10 rounded text-neutral-700 hover:bg-neutral-100 cursor-pointer flex items-center justify-center"
          >
            {b.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
