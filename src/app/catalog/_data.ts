import type { TopModel, UseCase } from "./_types";

export const TOP_MODELS: TopModel[] = [
  { id: "m1", rank: 1, name: "홍길동", tags: ["신뢰감", "세련미"], imageUrl: null },
  { id: "m2", rank: 2, name: "홍길동", tags: ["신뢰감", "세련미"], imageUrl: null },
  { id: "m3", rank: 3, name: "홍길동", tags: ["신뢰감", "세련미"], imageUrl: null },
  { id: "m4", rank: 4, name: "홍길동", tags: ["신뢰감", "세련미"], imageUrl: null },
  { id: "m5", rank: 5, name: "홍길동", tags: ["신뢰감", "세련미"], imageUrl: null },
];

export const USE_CASES: UseCase[] = [
  {
    id: "u1",
    category: "주류 & 식품",
    title: "모델 김철수 X A사 주류 광고",
    description: "친근하고 신뢰할 수 있는 이미지로 브랜드 가치 UP",
    beforeImageUrl: null,
    afterImageUrl: null,
  },
  {
    id: "u2",
    category: "주류 & 식품",
    title: "모델 김철수 X A사 주류 광고",
    description: "친근하고 신뢰할 수 있는 이미지로 브랜드 가치 UP",
    beforeImageUrl: null,
    afterImageUrl: null,
  },
];
