export type HistoryItemStatus = "completed" | "in_progress";

export type HistoryItem = {
  id: string;
  modelName: string | null;
  catalogModelId: string | null;
  itemName: string | null;
  createdAt: string;
  imageUrl: string | null;
  baseImageUrl: string | null;
  status: HistoryItemStatus;
};
