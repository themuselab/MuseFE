"use client";

import { FONTS, FONT_SIZES, FONT_VAR_BY_KEY } from "../_constants";
import type { FontKey, TextAlign, TextLayer } from "../_types";

type TextStyleControlsProps = {
  layer: TextLayer;
  onChange: (patch: Partial<TextLayer>) => void;
};

const ALIGN_OPTIONS: ReadonlyArray<{ value: TextAlign; label: string; icon: React.ReactNode }> = [
  {
    value: "left",
    label: "왼쪽 정렬",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M3 10h10M3 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "center",
    label: "가운데 정렬",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M5 10h10M4 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "right",
    label: "오른쪽 정렬",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5h14M7 10h10M5 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function StyleToggle({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={[
        "h-10 w-10 rounded flex items-center justify-center cursor-pointer",
        active ? "bg-neutral-900 text-neutral-50" : "text-neutral-700 hover:bg-neutral-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function TextStyleControls({ layer, onChange }: TextStyleControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-label-l text-neutral-900">텍스트 스타일</span>
      <div className="flex gap-2">
        <select
          value={layer.fontFamily}
          onChange={(e) => onChange({ fontFamily: e.target.value as FontKey })}
          style={{ fontFamily: FONT_VAR_BY_KEY[layer.fontFamily] }}
          className="flex-1 h-10 rounded border border-neutral-200 bg-neutral-50 px-3 text-body-m text-neutral-900 cursor-pointer"
        >
          {FONTS.map((f) => (
            <option
              key={f.key}
              value={f.key}
              style={{ fontFamily: FONT_VAR_BY_KEY[f.key] }}
            >
              {f.label}
            </option>
          ))}
        </select>
        <select
          value={layer.fontSize}
          onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
          className="w-23 h-10 rounded border border-neutral-200 bg-neutral-50 px-3 text-body-m text-neutral-900 cursor-pointer"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <StyleToggle
            active={layer.bold}
            onClick={() => onChange({ bold: !layer.bold })}
            label="볼드"
          >
            <span className="font-bold">B</span>
          </StyleToggle>
          <StyleToggle
            active={layer.italic}
            onClick={() => onChange({ italic: !layer.italic })}
            label="이탤릭"
          >
            <span className="italic">I</span>
          </StyleToggle>
          <StyleToggle
            active={layer.underline}
            onClick={() => onChange({ underline: !layer.underline })}
            label="밑줄"
          >
            <span className="underline">U</span>
          </StyleToggle>
        </div>
        <div className="flex gap-1">
          {ALIGN_OPTIONS.map((opt) => (
            <StyleToggle
              key={opt.value}
              active={layer.textAlign === opt.value}
              onClick={() => onChange({ textAlign: opt.value })}
              label={opt.label}
            >
              {opt.icon}
            </StyleToggle>
          ))}
        </div>
      </div>
    </div>
  );
}
