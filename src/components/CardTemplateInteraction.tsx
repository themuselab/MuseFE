import Image from "next/image";

type CardTemplateInteractionProps = {
  label: string;
  imageUrl: string | null;
  alt?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function CardTemplateInteraction({
  label,
  imageUrl,
  alt = "",
  selected = false,
  disabled = false,
  onClick,
  className = "",
}: CardTemplateInteractionProps) {
  const cardBorder = selected
    ? "border border-pink-400"
    : "border border-transparent";
  const cardShadow = selected
    ? "shadow-card-selected"
    : "hover:shadow-card-hover";
  const dimmed = disabled ? "opacity-30 pointer-events-none" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col gap-card-label-gap text-left w-full max-w-72 ${dimmed} ${className}`}
    >
      <div
        className={`relative w-full aspect-square bg-neutral-100 overflow-hidden transition-shadow ${cardBorder} ${cardShadow}`}
      >
        {imageUrl !== null && (
          <Image src={imageUrl} alt={alt} fill className="object-cover" />
        )}
      </div>
      <span className="pl-2 text-center w-full text-heading-s text-neutral-900">
        {label}
      </span>
    </button>
  );
}
