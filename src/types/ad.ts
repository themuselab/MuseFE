import type {
  AgeFilter,
  Gender,
  GenderFilter,
  ImpressionFilter,
  RadarScores,
} from "@/app/generate/_types";

// ─────────────────────────── Catalog ───────────────────────────

export type CatalogModelDto = {
  id: string;
  name: string;
  gender: Gender;
  age: string;
  primaryLabel: Exclude<ImpressionFilter, "all">;
  imageUrl: string;
  imageUrls: string[];
  scores: RadarScores;
  tags: string[];
  recommendedIndustries: string[];
  rank: number | null;
};

export type CatalogTopModelDto = CatalogModelDto & {
  rank: number;
  usageCount: number;
};

export type ListCatalogModelsResponse = {
  items: CatalogModelDto[];
  total: number;
};

export type ListTopCatalogModelsResponse = {
  items: CatalogTopModelDto[];
};

export type CatalogFilter = {
  gender?: GenderFilter;
  age?: AgeFilter;
  primaryLabel?: ImpressionFilter;
  keyword?: string;
};

// ─────────────────────────── Mood ───────────────────────────

export type MoodRanking = "AI PICK" | null;

export type Mood = {
  id: string;
  label: string;
  subtitle: string;
  ranking: MoodRanking;
};

export type RecommendMoodsRequest = {
  industry: string;
  item: string;
  extraDescription?: string;
};

export type RecommendMoodsResponse = {
  moods: Mood[];
};

// ─────────────────────────── Products / Generate / Job ───────────────────────────

export type UploadProductImageResponse = {
  productImagePath: string;
  filename: string;
  size: number;
};

export type GenerateAdRequest = {
  catalogModelId: string;
  productImagePath: string;
  prompt: string;
  headline?: string;
  subhead?: string;
  industry?: string;
  item?: string;
  extraDescription?: string;
  mood?: string;
  preferredLabel?: string;
  aspectRatio?: "9:16" | "1:1" | "16:9";
};

export type ReOverlayRequest = {
  headline: string;
  subhead?: string;
  cta?: string;
};

export type GenerateAdResponse = {
  jobId: string;
  status: JobStatus;
  estimatedSeconds: number;
  pollUrl: string;
};

export type JobStatus = "queued" | "processing" | "completed" | "failed";

export type TextOverlayDto = {
  id: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: "normal" | "bold";
  color: string;
  textAlign: "left" | "center" | "right";
};

export type JobDto = {
  id: string;
  status: JobStatus;
  progress: number;
  resultUrl: string | null;
  originalResultUrl: string | null;
  baseImageUrl: string | null;
  intermediateUrls: Record<string, string> | null;
  textOverlays: TextOverlayDto[] | null;
  errorMessage: string | null;
  costCents: number | null;
  catalogModelId: string | null;
  prompt: string;
  headline: string | null;
  subhead: string | null;
  cta: string | null;
  industry: string | null;
  item: string | null;
  extraDescription: string | null;
  mood: string | null;
  productImagePath: string | null;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
};

export type ListJobsResponse = {
  items: JobDto[];
  nextCursor: string | null;
};
