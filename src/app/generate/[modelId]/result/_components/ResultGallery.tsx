import { ResultCard } from "./ResultCard";

type ResultGalleryProps = {
  originalSrc: string;
  editedSrc?: string | null;
  alt: string;
  onEditText: () => void;
};

// 좌측: 첫 생성 결과(원본, 절대 변경 안 됨)
// 우측: 최신 편집본 (편집 안 했으면 원본과 동일)
export function ResultGallery({
  originalSrc,
  editedSrc,
  alt,
  onEditText,
}: ResultGalleryProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 items-center justify-center">
      <ResultCard src={originalSrc} alt={alt} showEditOverlay={false} />
      <ResultCard
        src={editedSrc ?? originalSrc}
        alt={`${alt} (편집)`}
        showEditOverlay
        onEdit={onEditText}
      />
    </div>
  );
}
