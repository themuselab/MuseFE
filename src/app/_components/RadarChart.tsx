"use client";

type RadarChartProps = {
  className?: string;
  showLabels?: boolean;
  highlights?: string[];
};

const LABELS = ["신뢰감", "세련됨", "친근함", "편안함", "전문성", "활발함"];

const HIGHLIGHT_RADIUS = 0.85;
const NORMAL_RADIUS = 0.4;

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

export function RadarChart({
  className = "",
  showLabels = true,
  highlights = ["신뢰감", "세련됨"],
}: RadarChartProps) {
  const cx = 356;
  const cy = 330;
  const radii = [50, 100, 150, 200, 250];
  const sides = LABELS.length;

  const dataPoints = LABELS.map((label, i) => {
    const ratio = highlights.includes(label) ? HIGHLIGHT_RADIUS : NORMAL_RADIUS;
    return polarToCartesian(cx, cy, ratio * 250, (360 / sides) * i);
  });

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
      {showLabels &&
        LABELS.map((label, i) => {
          const pos = polarToCartesian(cx, cy, 280, (360 / sides) * i);
          const isHighlight = highlights.includes(label);
          return (
            <text
              key={label}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isHighlight ? "#F3498D" : "#92878C"}
              fontSize="17"
              fontFamily="Pretendard"
            >
              {label}
            </text>
          );
        })}
    </svg>
  );
}
