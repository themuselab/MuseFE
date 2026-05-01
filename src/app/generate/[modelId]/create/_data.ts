import type { Mood } from "./_types";

export const MOOD_PRESETS: Mood[] = [
  {
    id: "calm",
    label: "차분한",
    subtitle: "소프트하고 부드러운 무드",
    ranking: "AI PICK",
  },
  {
    id: "fresh",
    label: "청량한",
    subtitle: "맑고 깨끗한 이미지",
    ranking: null,
  },
  {
    id: "luxury",
    label: "고급스러운",
    subtitle: "세련되고 우아한 무드",
    ranking: null,
  },
  {
    id: "playful",
    label: "활기찬",
    subtitle: "발랄하고 에너제틱한 톤",
    ranking: null,
  },
  {
    id: "minimal",
    label: "미니멀한",
    subtitle: "절제되고 단정한 분위기",
    ranking: null,
  },
];
