import Image from "next/image";

type RankingCardProps = {
  rank: number;
  imageUrl: string | null;
  alt?: string;
  className?: string;
};

export function RankingCard({
  rank,
  imageUrl,
  alt = "",
  className = "",
}: RankingCardProps) {
  return (
    <div
      className={`relative w-full aspect-3/4 rounded-md bg-neutral-100 overflow-hidden ${className}`}
    >
      {imageUrl !== null && (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 40vw"
        />
      )}
      <span className="absolute top-0 left-0 w-7 h-7 rounded-tl-md rounded-br-md bg-neutral-900 text-neutral-50 text-label-m flex items-center justify-center">
        {rank}
      </span>
    </div>
  );
}
