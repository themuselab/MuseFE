"use client";

import { RadarChart } from "./RadarChart";

type FeatureCardProps = {
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function TrendUpIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path
        d="M12 56L36 32L48 44L68 24"
        stroke="url(#trend-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="drop-shadow(0 1px 3.5px #F3498D)"
      />
      <path
        d="M52 24H68V40"
        stroke="url(#trend-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="trend-grad" x1="12" y1="40" x2="68" y2="40">
          <stop stopColor="#862D8F" />
          <stop offset="1" stopColor="#E6196B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path
        d="M20 20H60V60H20V20Z"
        stroke="url(#wf-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="drop-shadow(0 1px 3.5px #F3498D)"
      />
      <path
        d="M20 40H60M40 20V60"
        stroke="url(#wf-grad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="30" cy="30" r="4" fill="#FBFBFB" stroke="url(#wf-grad)" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="4" fill="#FBFBFB" stroke="url(#wf-grad)" strokeWidth="1.5" />
      <defs>
        <linearGradient id="wf-grad" x1="20" y1="40" x2="60" y2="40">
          <stop stopColor="#862D8F" />
          <stop offset="1" stopColor="#E6196B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function InfinityIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path
        d="M16 40C16 32 22 24 30 24C38 24 40 32 40 40C40 48 42 56 50 56C58 56 64 48 64 40C64 32 58 24 50 24C42 24 40 32 40 40C40 48 38 56 30 56C22 56 16 48 16 40Z"
        stroke="url(#inf-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="drop-shadow(0 1px 3.5px #F3498D)"
      />
      <defs>
        <linearGradient id="inf-grad" x1="16" y1="40" x2="64" y2="40">
          <stop stopColor="#862D8F" />
          <stop offset="1" stopColor="#E6196B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FeatureCard({ tag, title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-9 p-5 rounded-xl border border-neutral-200 shadow-[0_1px_3.5px_rgba(0,0,0,0.13)] bg-neutral-50/20">
      {/* 상단: 텍스트 + 아이콘 */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <span className="text-label-l text-pink-400 tracking-[0.032em]">
            {tag}
          </span>
          <span className="text-heading-s text-neutral-900">{title}</span>
        </div>
        <div className="w-20 h-20 shrink-0">{icon}</div>
      </div>
      {/* 설명 */}
      <p className="text-body-l text-neutral-700 whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}

export function FeatureSection() {
  return (
    <section className="relative w-full bg-neutral-50 overflow-hidden">
      {/* 배경 레이더차트 */}
      <RadarChart className="absolute -left-[189px] -top-[486px] w-[717px] h-[664px] opacity-30 pointer-events-none max-md:hidden" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-[120px] py-[120px] flex flex-col items-center gap-20 max-md:px-6 max-md:py-20 max-md:gap-[60px]">
        {/* 헤더 */}
        <div className="flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-400 text-heading-xs text-pink-400">
            Why muse
          </span>
          <h2 className="text-display-m text-neutral-900 text-center max-md:text-heading-l">
            기존 방식과는 다릅니다
          </h2>
        </div>

        {/* 카드 3개 */}
        <div className="flex gap-3 w-full max-md:flex-col">
          <FeatureCard
            tag="speed"
            title="120시간이 40초로"
            description={`모델 섭외, 스케줄 조율, 촬영, 보정까지 평균 120시간.\n뮤즈는 40초입니다.`}
            icon={<TrendUpIcon />}
          />
          <FeatureCard
            tag="simplicity"
            title="딸깍 고르면 끝"
            description={`인상·직업·분위기별로 정리된 카탈로그.\n프롬프트도, 발품도 필요 없어요.`}
            icon={<WorkflowIcon />}
          />
          <FeatureCard
            tag="boundless"
            title="한 번 만든 모델, 평생 자산"
            description={`초상권 걱정 없이. 어떤 씬에도.\n브랜드와 함께 성장하는 전속 모델.`}
            icon={<InfinityIcon />}
          />
        </div>
      </div>
    </section>
  );
}
