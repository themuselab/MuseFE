export type UserType = "advertiser" | "model";

export type SignupFormData = {
  userType: UserType;
  terms: {
    service: boolean;
    privacy: boolean;
    overseas: boolean;
    adid: boolean;
  };
  email: string;
  password: string;
  passwordConfirm: string;
  ageGroup: string;
  business: {
    industryMain: string;
    industrySub: string;
    businessName: string;
    businessDuration: string;
  };
};

export type SignupStep = 1 | 2 | 3 | 4;
