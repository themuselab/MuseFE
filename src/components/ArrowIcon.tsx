type ArrowSize = "sm" | "md" | "lg";
type ArrowDirection = "up" | "down" | "left" | "right";

type ArrowIconProps = {
  size?: ArrowSize;
  direction?: ArrowDirection;
  className?: string;
};

const sizeConfig: Record<
  ArrowSize,
  { size: number; strokeWidth: number; d: string }
> = {
  sm: { size: 17, strokeWidth: 1, d: "M4.25 6.375L8.5 10.625L12.75 6.375" },
  md: { size: 20, strokeWidth: 2, d: "M5 8L10 13L15 8" },
  lg: { size: 32, strokeWidth: 3.2, d: "M8 12L16 20L24 12" },
};

const rotationMap: Record<ArrowDirection, string> = {
  down: "rotate(0deg)",
  up: "rotate(180deg)",
  left: "rotate(90deg)",
  right: "rotate(-90deg)",
};

export function ArrowIcon({
  size = "md",
  direction = "down",
  className = "",
}: ArrowIconProps) {
  const config = sizeConfig[size];

  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox={`0 0 ${config.size} ${config.size}`}
      fill="none"
      className={className}
      style={{ transform: rotationMap[direction] }}
    >
      <path
        d={config.d}
        stroke="#92878c"
        strokeWidth={config.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
