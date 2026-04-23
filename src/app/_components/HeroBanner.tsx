"use client";

const SCALLOP_POSITIONS = [20, 34, 48, 62, 76, 90, 104];

function TicketShape() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 213 124"
      preserveAspectRatio="none"
    >
      <defs>
        <mask id="ticket-mask">
          <rect width="213" height="124" rx="12" fill="white" />
          {SCALLOP_POSITIONS.map((y) => (
            <g key={y}>
              <circle cx="0" cy={y} r="6.5" fill="black" />
              <circle cx="213" cy={y} r="6.5" fill="black" />
            </g>
          ))}
        </mask>
        <linearGradient id="ticket-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#201D1F" />
          <stop offset="1" stopColor="#514B4F" />
        </linearGradient>
      </defs>
      <g mask="url(#ticket-mask)">
        <rect width="213" height="124" fill="#FFD1E3" />
        <rect width="213" height="124" fill="url(#ticket-grad)" opacity="0.55" />
        <rect width="213" height="124" fill="#E8E3E6" opacity="0.2" />
      </g>
    </svg>
  );
}

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
          <div
            className="relative w-[213px] h-[124px]"
            style={{ filter: "drop-shadow(0 1.5px 2.66px rgba(0,0,0,0.25))" }}
          >
            {/* 카드 배경 — 티켓 모양 */}
            <TicketShape />
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
