import type { RadarAxis, SortOption } from "./_types";

export const RADAR_AXES: { key: RadarAxis; label: string }[] = [
  { key: "trust", label: "신뢰감" },
  { key: "sophisticated", label: "세련됨" },
  { key: "friendly", label: "친근함" },
  { key: "comfortable", label: "편안함" },
  { key: "professional", label: "전문성" },
  { key: "lively", label: "활발함" },
];

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "최신순", value: "recommend" },
  { label: "인기순", value: "popular" },
];

export const IMPRESSION_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "신뢰감", value: "trust" },
  { label: "세련됨", value: "sophisticated" },
  { label: "친근함", value: "friendly" },
  { label: "편안함", value: "comfortable" },
  { label: "전문성", value: "professional" },
  { label: "활발함", value: "lively" },
] as const;

export const GENDER_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "여성", value: "female" },
  { label: "남성", value: "male" },
] as const;

export const AGE_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "20대", value: "20s" },
  { label: "30대", value: "30s" },
  { label: "40대", value: "40s" },
  { label: "50대", value: "50s" },
  { label: "60대 이상", value: "60s_plus" },
] as const;
