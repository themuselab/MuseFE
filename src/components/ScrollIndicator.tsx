type ScrollDirection = "top" | "bottom";

type ScrollIndicatorProps = {
  direction?: ScrollDirection;
  className?: string;
};

export function ScrollIndicator({
  direction = "bottom",
  className = "",
}: ScrollIndicatorProps) {
  const gradient =
    direction === "top"
      ? "from-neutral-200 to-transparent"
      : "from-transparent to-neutral-200";

  return (
    <div
      className={[
        "w-[3px] h-16 rounded-full bg-gradient-to-b",
        gradient,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
