"use client";

import { useState } from "react";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";
import { VisibilityOnIcon, VisibilityOffIcon } from "@/components/Icon";
import { useCheckEmail } from "@/hooks/useCheckEmail";
import { signupBasicInfoSchema, PASSWORD_REGEX } from "@/lib/validation";
import { AGE_GROUPS } from "@/constants/app";
import type { SignupFormData } from "../_types";

type StepBasicInfoProps = {
  formData: SignupFormData;
  onUpdate: <K extends keyof SignupFormData>(key: K, value: SignupFormData[K]) => void;
  onNext: () => void;
  onPrev: () => void;
  isGoogleFlow?: boolean;
  googleEmail?: string | null;
};

export function StepBasicInfo({ formData, onUpdate, onNext, onPrev, isGoogleFlow, googleEmail }: StepBasicInfoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAgeTooltip, setShowAgeTooltip] = useState(false);

  const checkEmailMutation = useCheckEmail();

  const handleCheckEmail = () => {
    if (!formData.email) return;
    checkEmailMutation.mutate(formData.email, {
      onSuccess: (res) => {
        setEmailChecked(true);
        if (res.success && res.data.available) {
          setEmailAvailable(true);
          setErrors((prev) => ({ ...prev, email: "" }));
        } else {
          setEmailAvailable(false);
          setErrors((prev) => ({ ...prev, email: "이미 사용 중인 이메일입니다" }));
        }
      },
    });
  };

  const handleNext = () => {
    if (isGoogleFlow) {
      if (!formData.ageGroup) {
        setErrors({ ageGroup: "연령대를 선택해주세요" });
        return;
      }
      setErrors({});
      onNext();
      return;
    }

    const result = signupBasicInfoSchema.safeParse({
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      ageGroup: formData.ageGroup,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    if (!emailChecked || !emailAvailable) {
      setErrors((prev) => ({ ...prev, email: "이메일 중복 확인을 해주세요" }));
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-10">
        {/* Title */}
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-heading-l text-neutral-900 text-center">
            기본 정보를 입력해주세요
          </h2>
          <p className="text-heading-xs text-neutral-700 text-center">
            입력하신 정보로 계정이 생성됩니다.
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-4 w-full">
          {isGoogleFlow ? (
            <>
              {/* Google flow: email pre-filled, disabled */}
              <TextField
                label="이메일"
                type="email"
                value={googleEmail ?? ""}
                state="disabled"
                disabled
              />
              {/* Google flow: password disabled */}
              <TextField
                label="비밀번호"
                type="password"
                value="••••••••"
                state="disabled"
                disabled
              />
            </>
          ) : (
            <>
              {/* Email with check button */}
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1">
                  <TextField
                    label="이메일"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      onUpdate("email", e.target.value);
                      setEmailChecked(false);
                      setEmailAvailable(false);
                    }}
                    state={errors.email ? "error" : emailAvailable ? "success" : "default"}
                    helperText={errors.email || (emailAvailable ? "사용 가능한 이메일입니다" : undefined)}
                  />
                </div>
                <Button
                  hierarchy="secondary"
                  size="medium"
                  onClick={handleCheckEmail}
                  disabled={!formData.email || checkEmailMutation.isPending}
                  className="shrink-0"
                >
                  중복 확인
                </Button>
              </div>

              {/* Password */}
              <TextField
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => onUpdate("password", e.target.value)}
                state={
                  errors.password ? "error"
                    : formData.password && PASSWORD_REGEX.test(formData.password) ? "success"
                    : "default"
                }
                helperText={
                  errors.password
                    || (formData.password && PASSWORD_REGEX.test(formData.password)
                      ? "사용 가능한 비밀번호입니다"
                      : "비밀번호는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다")
                }
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-neutral-500"
                  >
                    {showPassword ? <VisibilityOnIcon size="lg" /> : <VisibilityOffIcon size="lg" />}
                  </button>
                }
              />

              {/* Password confirm */}
              <TextField
                label="비밀번호 확인"
                type={showPasswordConfirm ? "text" : "password"}
                value={formData.passwordConfirm}
                onChange={(e) => onUpdate("passwordConfirm", e.target.value)}
                state={
                  errors.passwordConfirm ? "error"
                    : formData.passwordConfirm && formData.password === formData.passwordConfirm ? "success"
                    : formData.passwordConfirm && formData.password !== formData.passwordConfirm ? "error"
                    : "default"
                }
                helperText={
                  errors.passwordConfirm
                    || (formData.passwordConfirm && formData.password === formData.passwordConfirm
                      ? "비밀번호가 일치합니다"
                      : formData.passwordConfirm && formData.password !== formData.passwordConfirm
                        ? "비밀번호가 일치하지 않습니다"
                        : undefined)
                }
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="cursor-pointer text-neutral-500"
                  >
                    {showPasswordConfirm ? <VisibilityOnIcon size="lg" /> : <VisibilityOffIcon size="lg" />}
                  </button>
                }
              />
            </>
          )}
        </div>

        {/* Age group */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-1">
            <span className="text-caption-m text-neutral-700">연령대</span>
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowAgeTooltip((prev) => !prev)}
                className="cursor-pointer block"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#534B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.75 6.75C6.75 5.50736 7.75736 4.5 9 4.5C10.2426 4.5 11.25 5.50736 11.25 6.75C11.25 7.99264 10.2426 9 9 9V10.5" stroke="#534B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="13.5" r="0.5" fill="#534B4F" />
                </svg>
              </button>
              {showAgeTooltip && (
                <div
                  className="absolute top-full mt-1.5 z-10 w-72.75 h-16.75"
                  style={{ left: "calc(50% - 34px)" }}
                >
                  <svg width="291" height="67" viewBox="0 0 291 67" fill="none" className="absolute inset-0">
                    <path
                      d="M0 14H26.22L34 0L41.78 14H291V67H0V14Z"
                      fill="#201D1F"
                    />
                  </svg>
                  <div className="absolute left-0 right-0 top-3.5 bottom-0 flex items-center px-3.5">
                    <span className="text-[14px] font-medium leading-[1.14] text-neutral-50">
                      연령대에 맞는 맞춤형 콘텐츠를 추천해 드릴게요.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {AGE_GROUPS.map((group) => {
              const isSelected = formData.ageGroup === group.value;
              return (
                <button
                  key={group.value}
                  type="button"
                  onClick={() => onUpdate("ageGroup", group.value)}
                  className={[
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-2 cursor-pointer transition-colors border",
                    "bg-neutral-50",
                    isSelected ? "border-pink-400" : "border-neutral-200",
                  ].join(" ")}
                >
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="#F3498D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border border-neutral-200 bg-neutral-50 shrink-0" />
                  )}
                  <span className="text-[16px] font-semibold tracking-[0.032em] leading-none text-neutral-900">
                    {group.label}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.ageGroup && (
            <span className="text-[14px] font-normal leading-none text-error-500 pl-3">
              {errors.ageGroup}
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between w-full gap-2">
        <Button
          hierarchy="secondary"
          size="large"
          onClick={onPrev}
        >
          이전
        </Button>
        <Button
          hierarchy="primary"
          size="large"
          onClick={handleNext}
        >
          다음 단계로
        </Button>
      </div>
    </>
  );
}
