"use client";

type RadarChartProps = {
  className?: string;
};

const LABELS = [
  { text: "신뢰감", angle: -90 },
  { text: "세련됨", angle: -18 },
  { text: "친근함", angle: 54 },
  { text: "편안함", angle: 126 },
  { text: "전문성", angle: 198 },
  { text: "활발함", angle: 270 - 360 + 360 },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function polygonPoints(cx: number, cy: number, r: number, sides: number) {
  return Array.from({ length: sides }, (_, i) => {
    const angle = (360 / sides) * i;
    const p = polarToCartesian(cx, cy, r, angle);
    return `${p.x},${p.y}`;
  }).join(" ");
}

export function RadarChart({ className = "" }: RadarChartProps) {
  const cx = 356;
  const cy = 330;
  const radii = [50, 100, 150, 200, 250];
  const sides = 6;
  const highlightRadii = [0.8, 0.9];
  const normalRadii = [0.55, 0.6, 0.4, 0.3];

  const highlightPoints = [0, 1].map((i) => {
    const r = highlightRadii[i] * 250;
    return polarToCartesian(cx, cy, r, (360 / sides) * i);
  });

  const dataPoints = [
    ...highlightPoints,
    ...[2, 3, 4, 5].map((i, idx) => {
      const r = normalRadii[idx] * 250;
      return polarToCartesian(cx, cy, r, (360 / sides) * i);
    }),
  ];

  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      viewBox="0 0 712 660"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* 동심원 오각형 */}
      {radii.map((r) => (
        <polygon
          key={r}
          points={polygonPoints(cx, cy, r, sides)}
          stroke="#B6AFB3"
          strokeWidth="0.72"
          fill="none"
        />
      ))}

      {/* 방사선 */}
      {Array.from({ length: sides }, (_, i) => {
        const outer = polarToCartesian(cx, cy, 250, (360 / sides) * i);
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="#B6AFB3"
            strokeWidth="1.43"
          />
        );
      })}

      {/* 데이터 영역 */}
      <polygon
        points={dataPolygon}
        fill="#F3498D"
        fillOpacity="0.25"
        stroke="#F3498D"
        strokeWidth="2.86"
        opacity="0.4"
      />

      {/* 라벨 */}
      {LABELS.map((label, i) => {
        const pos = polarToCartesian(cx, cy, 280, (360 / sides) * i);
        const isHighlight = i < 2;
        return (
          <text
            key={label.text}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isHighlight ? "#F3498D" : "#92878C"}
            fontSize="17"
            fontFamily="Pretendard"
          >
            {label.text}
          </text>
        );
      })}
    </svg>
  );
}
