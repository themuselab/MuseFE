"use client";

type TextContentFieldProps = {
  value: string;
  onChange: (next: string) => void;
};

export function TextContentField({ value, onChange }: TextContentFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-label-l text-neutral-900">텍스트 내용</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded border border-neutral-200 bg-neutral-50 px-3 py-2 text-body-m text-neutral-900 focus:outline-none focus:border-pink-400 resize-none"
      />
    </div>
  );
}
