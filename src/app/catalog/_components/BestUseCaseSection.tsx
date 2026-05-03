import { BestUseCaseCard } from "./BestUseCaseCard";
import { USE_CASES } from "../_data";

export function BestUseCaseSection() {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <span className="text-heading-xs md:text-caption-m text-neutral-700 md:text-neutral-500">
          실제 광고 결과를 확인하세요
        </span>
        <h2 className="text-heading-m md:text-heading-l text-neutral-900">
          Best Use Case ✨
        </h2>
      </header>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
        {USE_CASES.map((useCase) => (
          <BestUseCaseCard key={useCase.id} useCase={useCase} />
        ))}
      </div>
    </section>
  );
}
