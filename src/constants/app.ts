export const APP_NAME = "Muse";
export const APP_SUBTITLE = "AI 모델 기반 광고 이미지 생성 서비스";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const AGE_GROUPS = [
  { label: "20대", value: "20s" },
  { label: "30대", value: "30s" },
  { label: "40대", value: "40s" },
  { label: "50대", value: "50s" },
  { label: "60대 이상", value: "60s_plus" },
] as const;

export const INDUSTRY_MAIN_OPTIONS = [
  { label: "패션·뷰티", value: "fashion_beauty" },
  { label: "사업관리", value: "business_management" },
  { label: "경영·회계·사무", value: "management_accounting" },
  { label: "금융·보험", value: "finance_insurance" },
  { label: "교육·자연·사회과학", value: "education_science" },
  { label: "법률·경찰·소방·교도·국방", value: "law_security_defense" },
  { label: "보건·의료", value: "health_medical" },
  { label: "사회복지·종교", value: "social_welfare_religion" },
  { label: "문화·예술·디자인·방송", value: "culture_art_design" },
  { label: "운전·운송", value: "transport" },
  { label: "영업판매", value: "sales" },
  { label: "경비·청소", value: "security_cleaning" },
  { label: "이용·숙박·여행·오락·스포츠", value: "hospitality_leisure" },
  { label: "음식서비스", value: "food_service" },
  { label: "건설", value: "construction" },
  { label: "기계", value: "machinery" },
  { label: "재료", value: "materials" },
  { label: "화학·바이오", value: "chemistry_bio" },
  { label: "섬유·의복", value: "textile_clothing" },
  { label: "전기·전자", value: "electrical_electronics" },
  { label: "정보통신", value: "information_communication" },
  { label: "인쇄·목재·가구·공예", value: "printing_furniture_craft" },
  { label: "환경·에너지·안전", value: "environment_energy_safety" },
  { label: "농림어업", value: "agriculture_forestry_fishery" },
] as const;

export type AgreementSection = {
  title: string;
  items: { text: string; muted?: boolean }[];
};

export type AgreementContent = {
  heading: string;
  sections: AgreementSection[];
  footer: string;
};

export const PRE_REGISTRATION_PRIVACY_AGREEMENT: AgreementContent = {
  heading: "개인정보 수집 및 이용 동의",
  sections: [
    {
      title: "수집 목적",
      items: [{ text: "Muse 서비스 정식 출시 알림 및 이벤트 정보 제공" }],
    },
    {
      title: "수집 항목",
      items: [
        { text: "이메일 주소 (필수)" },
        { text: "휴대전화 번호 (선택)" },
      ],
    },
    {
      title: "보유 기간",
      items: [{ text: "서비스 출시 알림 발송 완료 후 6개월 이내 파기" }],
    },
  ],
  footer:
    "위 동의를 거부할 수 있으며, 거부 시 사전 예약 알림 수신이 제한됩니다.",
};

export const PRE_REGISTRATION_MARKETING_AGREEMENT: AgreementContent = {
  heading: "마케팅 정보 수신 동의",
  sections: [
    {
      title: "수집 및 이용 목적",
      items: [
        { text: "Muse 서비스 정식 출시 알림 발송" },
        { text: "신규 기능 안내 및 맞춤형 마케팅 · 프로모션 정보 제공" },
        { text: "이벤트 참여 기회 및 혜택 안내" },
      ],
    },
    {
      title: "수집 항목",
      items: [
        { text: "이메일 주소 (필수)" },
        { text: "휴대전화 번호 (선택)" },
      ],
    },
    {
      title: "보유 및 이용 기간",
      items: [
        { text: "수집 시점으로부터 서비스 출시 알림 발송 완료 후 6개월까지" },
        { text: "(단, 수신 동의 철회 요청 시 즉시 파기)", muted: true },
      ],
    },
  ],
  footer:
    "마케팅 활용 동의를 거부할 수 있습니다. 단, 거부 시 사전 예약 혜택 안내 및 출시 알림 수신이 제한될 수 있습니다.",
};

export const BUSINESS_DURATION_OPTIONS = [
  { label: "1년 미만", value: "under_1y" },
  { label: "1년 이상~3년 미만", value: "1y_to_3y" },
  { label: "3년 이상~5년 미만", value: "3y_to_5y" },
  { label: "5년 이상~10년 미만", value: "5y_to_10y" },
  { label: "10년 이상", value: "over_10y" },
] as const;

// 광고 생성 도메인에서 industry 코드 → 한국어 라벨 변환에 사용
export const industryLabelOf = (code: string): string => {
  return INDUSTRY_MAIN_OPTIONS.find((o) => o.value === code)?.label ?? code;
};

// 광고 생성 플로우 sessionStorage 키
export const AD_CREATE_KEYS = {
  flow: (modelId: string) => `ad-create-flow:${modelId}`,
  product: (modelId: string) => `ad-create-product:${modelId}`,
  job: (modelId: string) => `ad-create-job:${modelId}`,
} as const;
