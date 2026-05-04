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

function SparkleIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <g transform="translate(13, 12)">
        <path
          d="M25.19897 1.96766c0.95373-2.58473 4.57422-2.63351 5.60059-0.08398l7.59277 18.10937c0.21337 0.50924-0.02697 1.09504-0.53613 1.30859-0.50922 0.21339-1.095-0.02604-1.30859-0.53515l-7.5918-18.10938c-0.00257-0.00613-0.00537-0.01238-0.00781-0.01855-0.34041-0.86138-1.55099-0.84822-1.87207 0.02148-0.00239 0.00647-0.0053 0.01312-0.00782 0.01953l-6.70019 17.06055 0.00097 0.00098c-0.3399 0.92147-1.10707 1.62173-2.05761 1.87109l-15.55957 4.0791c-0.92118 0.24178-1.02559 1.5279-0.14649 1.91309l16.667 7.30371c0.73588 0.32252 1.31198 0.9272 1.60058 1.67676l6.07129 15.76855c0.33667 0.87322 1.56516 0.85834 1.87988-0.02441l7.22852-20.27539c0.42651-1.19638 1.55648-2 2.82812-2l12.26856 0-3.27344-5.00098c-0.30236-0.46205-0.17295-1.08132 0.28906-1.38379 0.46205-0.30241 1.08131-0.17297 1.38379 0.28906l4.28809 6.54883c0.22654 0.34656 0.21606 0.79712-0.02637 1.13281l-4.28711 5.93653c-0.32333 0.44758-0.94881 0.54776-1.39648 0.22461-0.44753-0.3234-0.54789-0.94786-0.22461-1.39551l3.14258-4.35156-12.16407 0c-0.42014 0-0.79974 0.26597-0.94433 0.6709l-7.22852 20.27636c-0.9375 2.62943-4.62608 2.67674-5.62988 0.07129l-6.07227-15.76953c-0.09771-0.2534-0.29153-0.45524-0.53613-0.5625l-16.66699-7.30371c-2.61001-1.14362-2.31911-4.95572 0.44238-5.67969l15.55859-4.0791c0.31517-0.0827 0.57333-0.31615 0.68848-0.62793l0.00781-0.01953 6.69922-17.0625z"
          fill="#FBFBFB"
          stroke="url(#wf-grad)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="drop-shadow(0 1px 3.5px #F3498D)"
        />
      </g>
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
      <RadarChart
        showLabels={false}
        className="absolute -left-[189px] -top-[486px] w-[717px] h-[664px] opacity-30 pointer-events-none max-md:hidden"
      />

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
            icon={<SparkleIcon />}
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
