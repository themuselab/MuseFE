// 인상 6축 — 필터 카테고리와 레이더 차트 축이 동일한 분류 사용
export type RadarAxis =
  | "trust"          // 신뢰감
  | "sophisticated"  // 세련됨
  | "friendly"       // 친근함
  | "comfortable"    // 편안함
  | "professional"   // 전문성
  | "lively";        // 활발함

export type RadarScores = Record<RadarAxis, number>;

export type Gender = "여" | "남";

export type Model = {
  id: string;
  rank?: number;
  name: string;
  age: string;
  gender: Gender;
  tags: string[];
  imageUrl: string | null;
  imageUrls: string[];
  scores: RadarScores;
  recommendedIndustries: string[];
};

export type SortOption = "recommend" | "popular";

export type GenderFilter = "all" | "female" | "male";

export type AgeFilter = "all" | "20s" | "30s" | "40s" | "50s" | "60s_plus";

export type ImpressionFilter = "all" | RadarAxis;

export type FilterState = {
  gender: GenderFilter;
  age: AgeFilter;
  impression: ImpressionFilter;
};
