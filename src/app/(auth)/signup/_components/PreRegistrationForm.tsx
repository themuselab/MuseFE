"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { PreRegistrationInput } from "./PreRegistrationInput";
import { PreRegistrationAgreement } from "./PreRegistrationAgreement";
import {
  PRE_REGISTRATION_PRIVACY_AGREEMENT,
  PRE_REGISTRATION_MARKETING_AGREEMENT,
} from "@/constants/app";
import { usePreRegistration } from "@/hooks/usePreRegistration";
import type { PreRegistrationResponse } from "@/api/preRegistration";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^01[016789]-\d{3,4}-\d{4}$/;

type AccordionKey = "privacy" | "marketing" | null;

type PreRegistrationFormProps = {
  onSuccess: (data: PreRegistrationResponse) => void;
};

function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function PreRegistrationForm({ onSuccess }: PreRegistrationFormProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [openedAccordion, setOpenedAccordion] = useState<AccordionKey>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const mutation = usePreRegistration({
    onSuccess,
    onError: (error) => {
      setEmailError(error.message);
    },
  });

  const emailValid = EMAIL_REGEX.test(email);
  const phoneValid = phone.length === 0 || PHONE_REGEX.test(phone);
  const canSubmit =
    emailValid && phoneValid && privacyAgreed && !mutation.isPending;

  const handleToggleAccordion = (key: Exclude<AccordionKey, null>) => {
    setOpenedAccordion((prev) => (prev === key ? null : key));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setEmailError(null);
    setPhoneError(null);
    mutation.mutate({
      email,
      phone: phone.length > 0 ? phone : undefined,
      privacyAgreed: true,
      marketingAgreed,
    });
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 w-full">
        <h2 className="text-[24px] font-semibold leading-[1.333] tracking-[-0.48px] text-neutral-900 text-center">
          🔔 사전 알림 신청
        </h2>
        <p className="text-heading-xs text-neutral-700 text-center">
          뮤즈 모델 등록 서비스 출시 시점을 가장 먼저 알려드립니다.
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 w-full">
        {/* Inputs */}
        <div className="flex flex-col gap-2 w-full">
          <PreRegistrationInput
            label="이메일"
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            onBlur={() => {
              if (email.length > 0 && !EMAIL_REGEX.test(email)) {
                setEmailError("유효한 이메일 주소를 입력해주세요");
              }
            }}
            error={emailError ?? undefined}
          />
          <PreRegistrationInput
            label="휴대전화 번호 (선택)"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              if (phoneError) setPhoneError(null);
            }}
            onBlur={() => {
              if (phone.length > 0 && !PHONE_REGEX.test(phone)) {
                setPhoneError("유효한 휴대전화 번호를 입력해주세요");
              }
            }}
            error={phoneError ?? undefined}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-200 w-full" />

        {/* Agreements */}
        <div className="flex flex-col gap-1 w-full">
          <PreRegistrationAgreement
            label="개인정보 수집 및 이용 동의"
            required
            checked={privacyAgreed}
            onChange={setPrivacyAgreed}
            expanded={openedAccordion === "privacy"}
            onToggleExpand={() => handleToggleAccordion("privacy")}
            content={PRE_REGISTRATION_PRIVACY_AGREEMENT}
          />
          <PreRegistrationAgreement
            label="마케팅 정보 수신 동의 (선택)"
            required={false}
            checked={marketingAgreed}
            onChange={setMarketingAgreed}
            expanded={openedAccordion === "marketing"}
            onToggleExpand={() => handleToggleAccordion("marketing")}
            content={PRE_REGISTRATION_MARKETING_AGREEMENT}
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        hierarchy="accent"
        size="large"
        className="w-full"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        알림 신청하기
      </Button>
    </div>
  );
}
