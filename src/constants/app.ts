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

export const BUSINESS_DURATION_OPTIONS = [
  { label: "1년 미만", value: "under_1y" },
  { label: "1년 이상~3년 미만", value: "1y_to_3y" },
  { label: "3년 이상~5년 미만", value: "3y_to_5y" },
  { label: "5년 이상~10년 미만", value: "5y_to_10y" },
  { label: "10년 이상", value: "over_10y" },
] as const;
