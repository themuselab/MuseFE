"use client";

type GNBTabButtonSize = "large" | "small";

type GNBTabButtonProps = {
  label: string;
  size?: GNBTabButtonSize;
  active?: boolean;
  badge?: number;
  className?: string;
  onClick?: () => void;
};

const sizeStyles: Record<GNBTabButtonSize, {
  padding: string;
  gap: string;
  font: string;
  hoverBg: string;
}> = {
  large: {
    padding: "p-4",
    gap: "gap-1",
    font: "text-[16px] font-semibold tracking-[0.032em] leading-none",
    hoverBg: "hover:bg-neutral-100 hover:rounded-[4px]",
  },
  small: {
    padding: "p-2",
    gap: "gap-0.5",
    font: "text-[12px] font-semibold tracking-[0.036em] leading-none",
    hoverBg: "hover:bg-neutral-100 hover:rounded-lg",
  },
};

export function GNBTabButton({
  label,
  size = "large",
  active = false,
  badge,
  className = "",
  onClick,
}: GNBTabButtonProps) {
  const styles = sizeStyles[size];
  const textColor = active ? "text-neutral-900" : "text-neutral-500";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center cursor-pointer transition-colors",
        styles.padding,
        styles.gap,
        styles.font,
        textColor,
        !active && styles.hoverBg,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{label}</span>
      {badge !== undefined && (
        size === "large" ? (
          <span className="inline-flex items-center justify-center rounded-full bg-[#00D7A0] px-1.75 min-w-5 h-4 text-[10px] font-bold text-white leading-none">
            {badge}
          </span>
        ) : (
          <span className="w-3 h-3 rounded-full bg-[#00D7A0] shrink-0" />
        )
      )}
    </button>
  );
}
