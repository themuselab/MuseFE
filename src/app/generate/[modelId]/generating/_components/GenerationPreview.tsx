import { DotGridBackdrop } from "./DotGridBackdrop";
import { TipsCard } from "./TipsCard";

export function GenerationPreview() {
  return (
    <div className="relative w-full h-[528px] rounded-xl overflow-hidden bg-neutral-50">
      <DotGridBackdrop />
      <span className="absolute top-5 left-5 text-caption-m text-neutral-500">
        이미지 생성 중
      </span>
      <div className="absolute bottom-5 inset-x-5">
        <TipsCard />
      </div>
    </div>
  );
}
