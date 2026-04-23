"use client";

function MuseLabLogo() {
  return (
    <div className="h-7 flex items-center">
      <svg width="120" height="28" viewBox="0 0 120 28" fill="none">
        <defs>
          <linearGradient
            id="footer-logo-grad"
            x1="0"
            y1="0"
            x2="120"
            y2="28"
          >
            <stop offset="0%" stopColor="#FFD1E3" />
            <stop offset="100%" stopColor="#DFBAE3" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="22"
          fill="url(#footer-logo-grad)"
          fontFamily="'Gmarket Sans', sans-serif"
          fontSize="22"
          fontWeight="700"
        >
          muse.lab
        </text>
      </svg>
    </div>
  );
}

function InstagramIcon() {
  return (
    <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center">
      <svg
        width="19"
        height="19"
        viewBox="0 0 20 20"
        fill="none"
        stroke="#F3F1F2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="16" height="16" rx="5" />
        <circle cx="10" cy="10" r="4" />
        <circle cx="15" cy="5" r="1" fill="#F3F1F2" stroke="none" />
      </svg>
    </div>
  );
}

function ThreadsIcon() {
  return (
    <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center">
      <svg
        width="15"
        height="18"
        viewBox="0 0 15 18"
        fill="none"
        stroke="#F3F1F2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 1C4 1 1 4 1 7.5C1 11 4 14 7.5 14C11 14 14 11 14 7.5" />
        <path d="M7.5 14V17" />
        <path d="M14 7.5C14 4 11 1 7.5 1" />
      </svg>
    </div>
  );
}

const SERVICE_LINKS = ["모델 카탈로그", "AI 광고 제작", "인상 분석 리포트"];
const SUPPORT_LINKS = [
  "자주 묻는 질문",
  "1:1 문의하기",
  "개인정보처리방침",
  "이용 약관",
];

export function LandingFooter() {
  return (
    <footer className="w-full bg-neutral-900">
      <div className="max-w-[1440px] mx-auto px-[120px] py-[60px] flex flex-col gap-[22px] max-md:px-6 max-md:py-11">
        {/* 상단 콘텐츠 */}
        <div className="flex justify-between max-md:flex-col max-md:gap-10">
          {/* 좌측: 로고 + 설명 + 연락처 */}
          <div className="flex flex-col gap-6 max-w-[500px]">
            <div className="flex flex-col gap-3">
              <MuseLabLogo />
              <p className="text-body-l text-neutral-700">
                소상공인의 마케팅 자립을 돕는 AI 기술 연구소,{"\n"}데이터로 설계된
                고효율 광고를 경험하세요.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-label-l text-neutral-500 tracking-[0.032em] w-[65px]">
                  Email
                </span>
                <span className="text-body-m text-neutral-100">
                  callmate.team@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-label-l text-neutral-500 tracking-[0.032em] w-[65px]">
                  Address
                </span>
                <span className="text-body-m text-neutral-100">
                  서울특별시 00구
                </span>
              </div>
            </div>
          </div>

          {/* 우측: Service + Support 링크 + SNS */}
          <div className="flex flex-col gap-10">
            <div className="flex gap-20">
              <div className="flex flex-col gap-3 w-[105px]">
                <h4 className="text-heading-s text-neutral-500">Service</h4>
                <ul className="flex flex-col gap-2">
                  {SERVICE_LINKS.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-body-l text-neutral-500 hover:text-neutral-300 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 w-[111px]">
                <h4 className="text-heading-s text-neutral-500">Support</h4>
                <ul className="flex flex-col gap-2">
                  {SUPPORT_LINKS.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-body-l text-neutral-500 hover:text-neutral-300 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SNS 아이콘 */}
            <div className="flex justify-end gap-3 max-md:justify-start">
              <a href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Threads">
                <ThreadsIcon />
              </a>
            </div>
          </div>
        </div>

        {/* 하단 구분선 + 저작권 */}
        <div className="flex flex-col gap-3">
          <div className="h-px bg-neutral-700 w-full" />
          <p className="text-caption-m text-neutral-700 text-center">
            © 2026 Muse Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
