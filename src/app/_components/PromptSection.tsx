"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function SmokeReveal({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
      className="transition-all duration-[1400ms] ease-out will-change-transform"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(60px) scale(0.96)",
        filter: inView ? "blur(0px)" : "blur(12px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function PromptSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #201D1F 0%, #534B50 51%, #867982 100%)",
      }}
    >
      {/* 데코 점 */}
      <div
        className="absolute left-[373px] bottom-[160px] w-3 h-[1.76px] rounded-full max-md:hidden"
        style={{
          background: "linear-gradient(270deg, #862D8F 0%, #E6196B 100%)",
          boxShadow: "0 1px 3.5px #FFD1E3, 0 4px 3.5px #fff",
          filter: "blur(0.26px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-[223px] py-[120px] flex flex-col items-center gap-20 max-md:px-6 max-md:py-20 max-md:gap-[60px]">
        {/* 텍스트 */}
        <div className="flex flex-col items-center gap-6 w-full">
          <SmokeReveal inView={inView} delay={0}>
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-display-m text-neutral-50 text-center max-md:text-heading-l">
                프롬프트, 몰라도 됩니다
              </h2>
              <p className="text-heading-s text-neutral-50 text-center max-md:text-body-l">
                AI 광고의 진입장벽을 없앴어요
              </p>
            </div>
          </SmokeReveal>
        </div>

        {/* 프롬프트 UI 카드 */}
        <SmokeReveal inView={inView} delay={500}>
          <div
            className="w-full max-w-[994px] rounded-2xl p-px"
            style={{
              background:
                "linear-gradient(269deg, #E8E6E1 0%, #E0BBE4 50%, #FFD1DC 100%)",
            }}
          >
          <div
            className="w-full rounded-[15px] p-4 pb-5"
            style={{
              background: "rgba(251, 251, 251, 0.6)",
            }}
          >
            {/* 프롬프트 텍스트 */}
            <p className="text-[11px] font-semibold leading-[1.45] tracking-[0.88px] text-neutral-900 mb-8">
              A cheerful Asian entrepreneur in a modern startup office, soft
              afternoon sunlight streaming through large windows, (vibrant
              colors:1.1), (dynamic pose:1.2), wearing smart casual attire,
              highly detailed fabric texture, depth of field, (soft focus
              background:1.3), blurred office elements, clean composition,
              professional photography, high contrast, warm tones, golden
              hour, Fujifilm XT4, sharp features, clear expression, smiling,
              4k, post-processed, color graded, elegant, minimalist style.
            </p>

            {/* 하단 아이콘 */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="w-6 h-6 flex items-center justify-center text-neutral-500"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
                </svg>
              </button>
            </div>
          </div>
          </div>
        </SmokeReveal>
      </div>
    </section>
  );
}
