import { fetchClient, getAccessToken, API_BASE } from "@/lib/fetchClient";
import type {
  DeleteJobResponse,
  GenerateAdRequest,
  GenerateAdResponse,
  JobDto,
  ListHistoryResponse,
  RecommendMoodsRequest,
  RecommendMoodsResponse,
  ReOverlayRequest,
  UploadProductImageResponse,
} from "@/types/ad";

type ListJobsParams = {
  cursor?: string;
  limit?: number;
};

const buildJobsQuery = (params: ListJobsParams = {}): string => {
  const search = new URLSearchParams();
  if (params.cursor) search.set("cursor", params.cursor);
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
};

const parseFilenameFromContentDisposition = (
  header: string | null,
): string | null => {
  if (!header) return null;
  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(header);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1].trim());
    } catch {
      return utf8Match[1].trim();
    }
  }
  const plainMatch = /filename="?([^";]+)"?/i.exec(header);
  return plainMatch?.[1]?.trim() ?? null;
};

const triggerBlobDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

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

  listJobs: (params?: ListJobsParams) =>
    fetchClient<ListHistoryResponse>(`/ads/jobs${buildJobsQuery(params)}`),

  getJob: (jobId: string) => fetchClient<JobDto>(`/ads/jobs/${jobId}`),

  deleteJob: (jobId: string) =>
    fetchClient<DeleteJobResponse>(`/ads/jobs/${jobId}`, { method: "DELETE" }),

  reOverlay: (jobId: string, data: ReOverlayRequest) =>
    fetchClient<JobDto>(`/ads/jobs/${jobId}/re-overlay`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Binary download — fetchClient는 JSON 가정이라 직접 fetch 사용. Authorization 헤더 수동 첨부.
  downloadJob: async (jobId: string, fallbackFilename: string): Promise<void> => {
    const token = getAccessToken();
    const res = await fetch(`${API_BASE}/ads/jobs/${jobId}/download`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`다운로드 실패 (${res.status})`);
    }
    const filename =
      parseFilenameFromContentDisposition(res.headers.get("Content-Disposition")) ??
      fallbackFilename;
    const blob = await res.blob();
    triggerBlobDownload(blob, filename);
  },
};
