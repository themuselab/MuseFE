import { MOCK_RESULTS } from "../_constants";
import { ResultCard } from "./ResultCard";

type ResultGalleryProps = {
  onEditText: () => void;
  editedSecondSrc?: string | null;
};

export function ResultGallery({ onEditText, editedSecondSrc }: ResultGalleryProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 items-center justify-center">
      {MOCK_RESULTS.map((r, i) => (
        <ResultCard
          key={r.id}
          src={i === 1 && editedSecondSrc ? editedSecondSrc : r.src}
          alt={r.alt}
          showEditOverlay={i === 1}
          onEdit={onEditText}
        />
      ))}
    </div>
  );
}
