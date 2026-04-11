type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  name: string;
  size?: AvatarSize;
  className?: string;
};

const sizeConfig: Record<AvatarSize, {
  dimension: string;
  fontSize: string;
  borderWidth: string;
  tracking: string;
}> = {
  sm: {
    dimension: "w-[35px] h-[35px]",
    fontSize: "text-[17.5px]",
    borderWidth: "border-[0.8px]",
    tracking: "tracking-[-0.0525em]",
  },
  md: {
    dimension: "w-[44px] h-[44px]",
    fontSize: "text-[22px]",
    borderWidth: "border",
    tracking: "tracking-[-0.066em]",
  },
  lg: {
    dimension: "w-[56px] h-[56px]",
    fontSize: "text-[28px]",
    borderWidth: "border-[1.27px]",
    tracking: "tracking-[-0.084em]",
  },
  xl: {
    dimension: "w-[120px] h-[120px]",
    fontSize: "text-[60px]",
    borderWidth: "border-[2.73px]",
    tracking: "tracking-[-0.18em]",
  },
};

export function Avatar({ name, size = "md", className = "" }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const config = sizeConfig[size];

  return (
    <div
      className={[
        "rounded-full bg-pink-50 border-neutral-200 overflow-hidden",
        "grid place-items-center",
        "select-none shrink-0",
        config.dimension,
        config.borderWidth,
        className,
      ].join(" ")}
    >
      <span
        className={[
          "font-bold leading-[1.43] text-neutral-700",
          config.fontSize,
          config.tracking,
        ].join(" ")}
      >
        {initial}
      </span>
    </div>
  );
}
