import { z } from "zod/v4";

export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const loginSchema = z.object({
  email: z.email("유효한 이메일 주소를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export const signupBasicInfoSchema = z.object({
  email: z.email("유효한 이메일 주소를 입력해주세요"),
  password: z.string().regex(PASSWORD_REGEX, "8자 이상, 영문+숫자+특수문자를 포함해야 합니다"),
  passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  ageGroup: z.enum(["20s", "30s", "40s", "50s", "60s_plus"], { error: "연령대를 선택해주세요" }),
}).refine(
  (data) => data.password === data.passwordConfirm,
  { message: "비밀번호가 일치하지 않습니다", path: ["passwordConfirm"] },
);

export const signupBusinessSchema = z.object({
  industryMain: z.string().min(1, "업종을 선택해주세요"),
  industrySub: z.string().optional(),
  businessName: z.string().optional(),
  businessDuration: z.string().optional(),
});
