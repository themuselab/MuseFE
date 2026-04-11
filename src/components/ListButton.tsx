"use client";

type ListButtonProps = {
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

function RadioCircle({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <div className="w-6 h-6 rounded-full bg-pink-100 grid place-items-center shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.333 8.667L6.333 11.333L12.667 5.333"
            stroke="#f3498d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-full border border-neutral-200 shrink-0" />
  );
}

export function ListButton({
  title,
  description,
  selected = false,
  onClick,
  className = "",
}: ListButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-[457px] flex items-center gap-5 rounded-full cursor-pointer transition-colors",
        "pt-3 pr-7 pb-3 pl-5",
        selected
          ? "bg-neutral-50 border border-pink-400"
          : "bg-neutral-50 border border-neutral-200 hover:bg-pink-50",
        className,
      ].join(" ")}
    >
      <RadioCircle selected={selected} />
      <span className="text-[20px] font-semibold leading-[1.6] text-neutral-900 w-[60px] text-left shrink-0">
        {title}
      </span>
      <span className="text-[16px] font-medium leading-[1.75] text-neutral-700 flex-1 text-left">
        {description}
      </span>
    </button>
  );
}
