import type { Mood } from "../_types";

type MoodCardProps = {
  mood: Mood;
  selected: boolean;
  onClick: (id: string) => void;
};

export function MoodCard({ mood, selected, onClick }: MoodCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(mood.id)}
      aria-pressed={selected}
      className={`relative w-full flex flex-col gap-3 pt-4 px-3 pb-3 rounded-lg text-left cursor-pointer transition-colors ${
        selected
          ? "bg-pink-50 border border-pink-500"
          : "bg-neutral-50 border border-neutral-200 hover:border-neutral-300"
      }`}
    >
      {mood.ranking ? (
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 inline-flex items-center px-1.5 py-1 rounded-full bg-neutral-900 text-pink-500 text-caption-s font-semibold">
          {mood.ranking}
        </span>
      ) : null}
      <span
        className={`text-label-l ${
          selected ? "text-neutral-900" : "text-neutral-500"
        }`}
      >
        {mood.label}
      </span>
      <span
        className={`text-caption-m ${
          selected ? "text-neutral-700" : "text-neutral-500"
        }`}
      >
        {mood.subtitle}
      </span>
    </button>
  );
}
