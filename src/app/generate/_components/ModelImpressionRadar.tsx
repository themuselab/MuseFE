import { RADAR_AXES } from "../_data";
import type { RadarScores } from "../_types";

type ModelImpressionRadarProps = {
  values: RadarScores;
  size?: number;
};

const RADIUS = 100;
const LABEL_RADIUS = 128;
const LEVELS = [25, 50, 75, 100];
const AXIS_COUNT = RADAR_AXES.length;

function angleFor(i: number) {
  return -Math.PI / 2 + (i * 2 * Math.PI) / AXIS_COUNT;
}

function pointAt(i: number, r: number): [number, number] {
  const a = angleFor(i);
  return [Math.cos(a) * r, Math.sin(a) * r];
}

function polygonPoints(values: number[]): string {
  return values
    .map((v, i) => {
      const [x, y] = pointAt(i, Math.max(0, Math.min(100, v)));
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ModelImpressionRadar({
  values,
  size = 280,
}: ModelImpressionRadarProps) {
  const dataValues = RADAR_AXES.map((axis) => values[axis.key]);
  const maxValue = Math.max(...dataValues);
  const dataPoints = polygonPoints(dataValues);

  return (
    <svg
      viewBox="-160 -160 320 320"
      width={size}
      height={size}
      role="img"
      aria-label="모델 인상 레이더 차트"
      className="block"
    >
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDAACB" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#CD92D3" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {LEVELS.map((level) => (
        <polygon
          key={level}
          points={polygonPoints(RADAR_AXES.map(() => level))}
          fill="none"
          stroke="#E8E3E6"
          strokeWidth="1"
        />
      ))}

      {RADAR_AXES.map((_, i) => {
        const [x, y] = pointAt(i, RADIUS);
        return (
          <line
            key={i}
            x1={0}
            y1={0}
            x2={x}
            y2={y}
            stroke="#E8E3E6"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={dataPoints}
        fill="url(#radar-fill)"
        stroke="#E6196B"
        strokeWidth="1.5"
      />

      {dataValues.map((value, i) => {
        const [x, y] = pointAt(i, value);
        return <circle key={i} cx={x} cy={y} r={3.5} fill="#E6196B" />;
      })}

      {RADAR_AXES.map((axis, i) => {
        const [x, y] = pointAt(i, LABEL_RADIUS);
        const isMax = values[axis.key] === maxValue;
        return (
          <text
            key={axis.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={isMax ? "#E6196B" : "#92878C"}
            fontSize="14"
            fontWeight={isMax ? 600 : 500}
            fontFamily="Pretendard"
          >
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}
