type Step = {
  index: 1 | 2 | 3;
  label: string;
};

type StepIndex = 1 | 2 | 3;

type CreateStepperProps = {
  currentStep: StepIndex;
  completedSteps?: ReadonlyArray<StepIndex>;
};

const STEPS: Step[] = [
  { index: 1, label: "광고 정보 입력" },
  { index: 2, label: "제품 첨부(선택)" },
  { index: 3, label: "광고 제작 & 편집" },
];

export function CreateStepper({ currentStep, completedSteps }: CreateStepperProps) {
  const activeSet = new Set<StepIndex>(completedSteps ?? [currentStep]);
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const active = activeSet.has(step.index);
        return (
          <li key={step.index} className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-caption-m ${
                active
                  ? "border-pink-400 text-pink-500"
                  : "border-neutral-200 text-neutral-400"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-caption-s ${
                  active
                    ? "bg-pink-500 text-neutral-50"
                    : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {step.index}
              </span>
              <span className="whitespace-nowrap">{step.label}</span>
            </span>
            {i < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="hidden sm:inline-block w-4 h-px bg-neutral-200"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
