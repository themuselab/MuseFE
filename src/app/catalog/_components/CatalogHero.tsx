type DottedCharProps = {
  char: string;
};

function DottedChar({ char }: DottedCharProps) {
  return (
    <span className="relative inline-block">
      <span className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-pink-400" />
      {char}
    </span>
  );
}

export function CatalogHero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
      <div className="flex flex-col gap-4 md:gap-6 pt-8 md:pt-16 pb-4 md:pb-12">
        <h1 className="text-heading-l md:text-display-l text-neutral-900">
          <DottedChar char="진" /> <DottedChar char="짜" /> <DottedChar char="사" /> <DottedChar char="람" /> 같은 AI 모델
          <br />
          여기로 모이실게요
        </h1>
        <p className="text-body-m md:text-body-l text-neutral-600 max-w-sm">
          우리 브랜드에 가장 잘 어울리는 모델을 지금 바로 한 눈에 확인해 보세요
        </p>
      </div>
      <div className="flex justify-center md:justify-end">
        <div
          className="w-full h-64 md:w-96 md:h-110 rounded-t-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 55%, var(--color-pink-50) 0%, var(--color-pink-100) 40%, var(--color-purple-100) 100%)",
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
