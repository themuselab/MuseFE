type CreditTooltipProps = {
  message?: string;
  className?: string;
};

export function CreditTooltip({
  message = "광고 생성 시 OO 크레딧~ (제품 첨부 시 + OO 크레딧)",
  className = "",
}: CreditTooltipProps) {
  return (
    <div className={`relative inline-block ${className}`} role="tooltip">
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-3 w-3 h-3 bg-neutral-900 rotate-45"
      />
      <div className="relative bg-neutral-900 text-neutral-50 text-caption-m px-3.5 py-3 rounded-md shadow-md whitespace-nowrap">
        {message}
      </div>
    </div>
  );
}
