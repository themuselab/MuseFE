import type { Model, RadarAxis, SortOption } from "./_types";

export const RADAR_AXES: { key: RadarAxis; label: string }[] = [
  { key: "trust", label: "신뢰감" },
  { key: "sophisticated", label: "세련미" },
  { key: "friendly", label: "친근감" },
  { key: "stable", label: "안정감" },
  { key: "cheerful", label: "유쾌함" },
];

const DEFAULT_SCORES = {
  trust: 80,
  sophisticated: 65,
  friendly: 70,
  stable: 60,
  cheerful: 75,
} as const;

const DEFAULT_INDUSTRIES = ["chemistry_bio", "textile_clothing"];

const buildImageUrls = (count: number): string[] =>
  Array.from({ length: count }, () => "");

export const TOP_5_MODELS: Model[] = [
  {
    id: "tm1",
    rank: 1,
    name: "홍길동",
    age: "20대",
    gender: "여",
    tags: ["신뢰감", "세련미"],
    imageUrl: null,
    imageUrls: buildImageUrls(6),
    scores: DEFAULT_SCORES,
    recommendedIndustries: DEFAULT_INDUSTRIES,
  },
  {
    id: "tm2",
    rank: 2,
    name: "홍길동",
    age: "20대",
    gender: "여",
    tags: ["신뢰감", "세련미"],
    imageUrl: null,
    imageUrls: buildImageUrls(6),
    scores: DEFAULT_SCORES,
    recommendedIndustries: DEFAULT_INDUSTRIES,
  },
  {
    id: "tm3",
    rank: 3,
    name: "홍길동",
    age: "20대",
    gender: "여",
    tags: ["신뢰감", "세련미"],
    imageUrl: null,
    imageUrls: buildImageUrls(6),
    scores: DEFAULT_SCORES,
    recommendedIndustries: DEFAULT_INDUSTRIES,
  },
  {
    id: "tm4",
    rank: 4,
    name: "홍길동",
    age: "20대",
    gender: "여",
    tags: ["신뢰감", "세련미"],
    imageUrl: null,
    imageUrls: buildImageUrls(6),
    scores: DEFAULT_SCORES,
    recommendedIndustries: DEFAULT_INDUSTRIES,
  },
  {
    id: "tm5",
    rank: 5,
    name: "홍길동",
    age: "20대",
    gender: "여",
    tags: ["신뢰감", "세련미"],
    imageUrl: null,
    imageUrls: buildImageUrls(6),
    scores: DEFAULT_SCORES,
    recommendedIndustries: DEFAULT_INDUSTRIES,
  },
];

export const ALL_MODELS: Model[] = Array.from({ length: 12 }, (_, i) => ({
  id: `am${i + 1}`,
  name: "홍길동",
  age: "20대",
  gender: "여",
  tags: ["신뢰감", "세련미"],
  imageUrl: null,
  imageUrls: buildImageUrls(6),
  scores: DEFAULT_SCORES,
  recommendedIndustries: DEFAULT_INDUSTRIES,
}));

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "추천순", value: "recommend" },
  { label: "최신순", value: "latest" },
];

export const IMPRESSION_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "신뢰감", value: "trust" },
  { label: "친근함", value: "friendly" },
  { label: "친한형", value: "intimate" },
  { label: "세련됨", value: "sophisticated" },
  { label: "활달함", value: "lively" },
  { label: "편안함", value: "comfortable" },
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
