export type UserProfile = {
  id: string;
  email: string;
  userType: string;
  ageGroup: string | null;
};

export type LoginResponse = {
  accessToken: string;
  user: UserProfile;
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
