export type UserBusiness = {
  industryMain: string;
  industrySub: string | null;
  businessName: string | null;
  businessDuration: string | null;
};

/** /auth/login 응답에 포함되는 기본 사용자 정보 (BE UserResponse와 동일 스키마) */
export type AuthUser = {
  id: string;
  email: string;
  userType: string;
  ageGroup: string | null;
};

/** /users/me 전체 프로필 응답 */
export type UserProfile = {
  id: string;
  email: string;
  userType: string;
  ageGroup: string | null;
  business: UserBusiness | null;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type SignupRequest = {
  email: string;
  password: string;
  userType: "advertiser";
  ageGroup: string;
  terms: {
    service: true;
    privacy: true;
    overseas: true;
    adid: boolean;
  };
  business: {
    industryMain: string;
    industrySub?: string;
    businessName?: string;
    businessDuration?: string;
  };
};

export type GoogleSignupRequest = {
  pendingCode: string;
  userType: "advertiser";
  ageGroup: string;
  terms: {
    service: true;
    privacy: true;
    overseas: true;
    adid: boolean;
  };
  business: {
    industryMain: string;
    industrySub?: string;
    businessName?: string;
    businessDuration?: string;
  };
};
