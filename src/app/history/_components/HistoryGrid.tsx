import { HistoryCard } from "./HistoryCard";
import type { HistoryItem } from "../_types";

type HistoryGridProps = {
  items: HistoryItem[];
  onEdit: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onDownload: (item: HistoryItem) => void;
};

export function HistoryGrid({ items, onEdit, onDelete, onDownload }: HistoryGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
