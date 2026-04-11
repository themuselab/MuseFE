type ThreeDotsProps = {
  activeIndex: 0 | 1 | 2;
  className?: string;
};

export function ThreeDots({ activeIndex, className = "" }: ThreeDotsProps) {
  return (
    <div
      className={[
        "inline-flex items-center justify-center w-12 h-12 gap-1.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {([0, 1, 2] as const).map((i) => (
        <span
          key={i}
          className={[
            "w-2 h-2 rounded-full",
            i === activeIndex ? "bg-pink-400" : "bg-neutral-50",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
