import type { FontKey } from "./_types";

export type MockResult = {
  id: string;
  src: string;
  alt: string;
};

export const MOCK_RESULTS: ReadonlyArray<MockResult> = [
  { id: "result-1", src: "/images/result/sample-1.svg", alt: "광고 결과 1" },
  { id: "result-2", src: "/images/result/sample-2.svg", alt: "광고 결과 2" },
];

export const FONTS: ReadonlyArray<{ key: FontKey; label: string; cssVar: string }> = [
  { key: "pretendard", label: "Pretendard", cssVar: "--font-pretendard" },
  { key: "nanum-myeongjo", label: "나눔명조", cssVar: "--font-nanum-myeongjo" },
  { key: "nanum-gothic", label: "나눔고딕", cssVar: "--font-nanum-gothic" },
  { key: "nanum-pen", label: "나눔손글씨", cssVar: "--font-nanum-pen" },
];

export const FONT_VAR_BY_KEY: Record<FontKey, string> = {
  pretendard: "var(--font-pretendard)",
  "nanum-myeongjo": "var(--font-nanum-myeongjo)",
  "nanum-gothic": "var(--font-nanum-gothic)",
  "nanum-pen": "var(--font-nanum-pen)",
};

export const FONT_SIZES: ReadonlyArray<number> = [11, 13, 16, 20, 24, 32, 40, 48, 64];

export const COLOR_SWATCHES: ReadonlyArray<string> = [
  "#504a45",
  "#000000",
  "#ffffff",
  "#947d5a",
];

export const MAX_HISTORY = 50;

export const CANVAS_ASPECT = "396/528";

