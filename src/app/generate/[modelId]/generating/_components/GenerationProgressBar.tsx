type GenerationProgressBarProps = {
  progress: number;
};

export function GenerationProgressBar({ progress }: GenerationProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const label = `${String(clamped).padStart(2, "0")}%`;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="광고 이미지 생성 진행률"
      >
        <div
          className="h-full rounded-full transition-[width] duration-200 ease-linear"
          style={{
            width: `${clamped}%`,
            backgroundImage: "var(--gradient-bold)",
          }}
        />
      </div>
      <span className="text-body-l text-pink-500 text-right">{label}</span>
    </div>
  );
}
