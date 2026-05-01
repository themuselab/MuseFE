export type RadarAxis =
  | "trust"
  | "sophisticated"
  | "friendly"
  | "stable"
  | "cheerful";

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

export type SortOption = "recommend" | "latest";

export type GenderFilter = "all" | "female" | "male";

export type AgeFilter = "all" | "20s" | "30s" | "40s" | "50s" | "60s_plus";

export type ImpressionFilter =
  | "all"
  | "trust"
  | "friendly"
  | "intimate"
  | "sophisticated"
  | "lively"
  | "comfortable";

export type FilterState = {
  gender: GenderFilter;
  age: AgeFilter;
  impression: ImpressionFilter;
};
