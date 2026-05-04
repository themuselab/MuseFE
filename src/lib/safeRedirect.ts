// 로그인 후 복귀할 from 경로 정제. 내부 절대 경로(/...)만 허용해 외부 URL·프로토콜 인젝션 차단.
export const safeRedirectPath = (from: string | null | undefined): string => {
  if (!from) return "/";
  if (!from.startsWith("/")) return "/";
  if (from.startsWith("//")) return "/";
  return from;
};
