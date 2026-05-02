import { ResultCard } from "./ResultCard";

type ResultGalleryProps = {
  src: string;
  alt: string;
  onEditText: () => void;
  editedSecondSrc?: string | null;
};

// 같은 이미지를 2번 표시: 1번 원본, 2번 편집 가능
export function ResultGallery({
  src,
  alt,
  onEditText,
  editedSecondSrc,
}: ResultGalleryProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 items-center justify-center">
      <ResultCard src={src} alt={alt} showEditOverlay={false} />
      <ResultCard
        src={editedSecondSrc ?? src}
        alt={`${alt} (편집)`}
        showEditOverlay
        onEdit={onEditText}
      />
    </div>
  );
}
