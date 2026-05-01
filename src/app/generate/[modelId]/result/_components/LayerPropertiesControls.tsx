"use client";

import type { Layer } from "../_types";

type LayerPropertiesControlsProps = {
  layer: Layer;
  onChange: (patch: Partial<Layer>) => void;
};

type Field = {
  label: string;
  prefix: string;
  key: "x" | "y" | "width" | "height" | "rotation";
  suffix?: string;
};

function NumberField({
  prefix,
  value,
  suffix,
  onChange,
}: {
  prefix: string;
  value: number;
  suffix?: string;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 h-10 px-3 rounded border border-neutral-200 bg-neutral-50 text-body-m text-neutral-700">
      <span className="text-neutral-500 shrink-0">{prefix}</span>
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        className="w-full bg-transparent outline-none text-neutral-900"
      />
      {suffix ? <span className="text-neutral-500 shrink-0">{suffix}</span> : null}
    </div>
  );
}

export function LayerPropertiesControls({ layer, onChange }: LayerPropertiesControlsProps) {
  const groups: ReadonlyArray<{ heading: string; fields: ReadonlyArray<Field> }> = [
    {
      heading: "위치",
      fields: [
        { label: "X", prefix: "X", key: "x" },
        { label: "Y", prefix: "Y", key: "y" },
      ],
    },
    {
      heading: "크기",
      fields: [
        { label: "W", prefix: "W", key: "width" },
        { label: "H", prefix: "H", key: "height" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <span className="text-label-l text-neutral-900">레이어 속성</span>
      {groups.map((g) => (
        <div key={g.heading} className="flex flex-col gap-2">
          <span className="text-caption-m text-neutral-700">{g.heading}</span>
          <div className="grid grid-cols-2 gap-2">
            {g.fields.map((f) => (
              <NumberField
                key={f.key}
                prefix={f.prefix}
                value={layer[f.key]}
                onChange={(n) => onChange({ [f.key]: n } as Partial<Layer>)}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <span className="text-caption-m text-neutral-700">회전</span>
        <NumberField
          prefix="↻"
          suffix="°"
          value={layer.rotation}
          onChange={(n) => onChange({ rotation: n })}
        />
      </div>
    </div>
  );
}
