const BASE_DOTS =
  "radial-gradient(circle, var(--color-neutral-200) 1px, transparent 1.5px)";
const SWEEP_MASK =
  "linear-gradient(135deg, transparent 30%, black 50%, transparent 70%)";

export function DotGridBackdrop() {
  return (
    <>
      <style>{`
        @property --dotR {
          syntax: '<length>';
          initial-value: 1.4px;
          inherits: false;
        }
        @keyframes dotGridBreathe {
          0%, 100% { --dotR: 1.2px; }
          50%      { --dotR: 2.6px; }
        }
        @keyframes dotGridSweep {
          0%   { mask-position: 160% -60%;  -webkit-mask-position: 160% -60%; }
          100% { mask-position: -60% 160%;  -webkit-mask-position: -60% 160%; }
        }
        .dot-grid-highlight {
          background-image: radial-gradient(
            circle,
            var(--color-neutral-400) var(--dotR),
            transparent calc(var(--dotR) + 0.6px)
          );
          animation:
            dotGridBreathe 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite,
            dotGridSweep 3.6s cubic-bezier(0.6, 0, 0.4, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .dot-grid-highlight { animation: none; }
        }
      `}</style>
      <div
        aria-hidden
        className="absolute inset-0 bg-neutral-50"
        style={{
          backgroundImage: BASE_DOTS,
          backgroundSize: "16px 16px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 dot-grid-highlight"
        style={{
          backgroundSize: "16px 16px",
          maskImage: SWEEP_MASK,
          WebkitMaskImage: SWEEP_MASK,
          maskSize: "260% 260%",
          WebkitMaskSize: "260% 260%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </>
  );
}
