import { fetchClient } from "@/lib/fetchClient";
import type {
  GenerateAdRequest,
  GenerateAdResponse,
  JobDto,
  RecommendMoodsRequest,
  RecommendMoodsResponse,
  ReOverlayRequest,
  UploadProductImageResponse,
} from "@/types/ad";

export const adsApi = {
  recommendMoods: (data: RecommendMoodsRequest) =>
    fetchClient<RecommendMoodsResponse>("/ads/moods", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  uploadProduct: (file: File) => {
    const fd = new FormData();
    fd.append("productImage", file);
    return fetchClient<UploadProductImageResponse>("/ads/products", {
      method: "POST",
      body: fd,
    });
  },

  generate: (data: GenerateAdRequest) =>
    fetchClient<GenerateAdResponse>("/ads/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getJob: (jobId: string) => fetchClient<JobDto>(`/ads/jobs/${jobId}`),

  reOverlay: (jobId: string, data: ReOverlayRequest) =>
    fetchClient<JobDto>(`/ads/jobs/${jobId}/re-overlay`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
