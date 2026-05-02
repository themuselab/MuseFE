import { fetchClient } from "@/lib/fetchClient";
import type {
  CatalogFilter,
  ListCatalogModelsResponse,
  ListTopCatalogModelsResponse,
} from "@/types/ad";

const buildQuery = (filter?: CatalogFilter): string => {
  if (!filter) return "";
  const params = new URLSearchParams();
  if (filter.gender && filter.gender !== "all") params.set("gender", filter.gender);
  if (filter.age && filter.age !== "all") params.set("age", filter.age);
  if (filter.primaryLabel && filter.primaryLabel !== "all") {
    params.set("primaryLabel", filter.primaryLabel);
  }
  if (filter.keyword && filter.keyword.trim().length > 0) {
    params.set("keyword", filter.keyword.trim());
  }
  const q = params.toString();
  return q ? `?${q}` : "";
};

export const catalogModelsApi = {
  list: (filter?: CatalogFilter) =>
    fetchClient<ListCatalogModelsResponse>(`/catalog-models${buildQuery(filter)}`),

  top: () => fetchClient<ListTopCatalogModelsResponse>("/catalog-models/top"),
};
