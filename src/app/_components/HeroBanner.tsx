"use client";

export function HeroBanner() {
  return (
    <div className="w-full bg-neutral-900 h-[136px] relative overflow-hidden">
      {/* 좌측 텍스트 — 1440px 컨테이너 기준 */}
      <div className="max-w-[1440px] mx-auto relative h-full">
        <div className="absolute left-[240px] top-8 flex flex-col gap-2 max-md:left-6">
          <p className="text-heading-m text-neutral-50">
            🎁 신규 가입자를 위한 혜택!
          </p>
          <p className="text-heading-xs text-neutral-50">
            오늘 가입시 5개의 AI 모델 생성권 무료 증정
          </p>
        </div>

        {/* 우측 쿠폰 카드 */}
        <div
          className="absolute right-[220px] -top-[25px] max-md:right-6"
          style={{ transform: "rotate(-13deg)" }}
        >
          <div className="relative w-[213px] h-[124px]">
            {/* 카드 배경 — 티켓 모양 */}
            <div
              className="absolute inset-0 rounded-[12px] overflow-hidden shadow-[0_1.5px_2.66px_rgba(0,0,0,0.25)]"
              style={{
                background: "#FFD1E3",
              }}
            >
              {/* 노이즈/그라디언트 오버레이 */}
              <div
                className="absolute inset-0 opacity-55"
                style={{
                  background:
                    "linear-gradient(180deg, #201D1F 0%, #514B4F 100%)",
                }}
              />
              <div className="absolute inset-0 opacity-20 bg-neutral-200" />
            </div>
            {/* 카드 내용 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[10px]">
              <span className="text-[20px] font-semibold leading-[1.56] text-neutral-500 text-center">
                얼리버드
              </span>
              <div className="flex items-center gap-[10px]">
                <span className="text-[20px] font-semibold leading-[1.56] text-neutral-500">
                  최대
                </span>
                <span className="text-[36px] font-semibold leading-[1.5] tracking-[-0.18px] text-pink-400">
                  00%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
