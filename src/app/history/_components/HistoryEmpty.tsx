"use client";

type HistoryEmptyProps = {
  onGoToCatalog: () => void;
};

export function HistoryEmpty({ onGoToCatalog }: HistoryEmptyProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-10">
      <div className="flex flex-col items-center gap-1 w-full">
        <p className="text-heading-m text-neutral-700 text-center">
          아직 제작한 이미지가 없어요.
        </p>
        <p className="text-body-l text-neutral-500 text-center">
          원하는 인상의 모델을 골라 첫 광고를 만들어보세요.
        </p>
      </div>
      <button
        type="button"
        onClick={onGoToCatalog}
        className="h-[60px] flex items-center justify-center rounded-full bg-neutral-900 text-neutral-50 text-heading-s px-[30px] cursor-pointer"
      >
        모델 보러 가기
      </button>
    </div>
  );
}
