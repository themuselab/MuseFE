import type { HistoryJobDto } from "@/types/ad";
import type { HistoryItem } from "./_types";

export const formatHistoryDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}. ${mm}. ${dd}.`;
};

export const dtoToHistoryItem = (dto: HistoryJobDto): HistoryItem => ({
  id: dto.id,
  modelName: dto.modelName,
  catalogModelId: dto.catalogModelId,
  itemName: dto.item,
  createdAt: dto.createdAt,
  imageUrl: dto.resultUrl,
  baseImageUrl: dto.baseImageUrl,
  status: dto.status === "completed" ? "completed" : "in_progress",
});
