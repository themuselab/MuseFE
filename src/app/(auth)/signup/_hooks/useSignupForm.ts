"use client";

import { useState, useCallback } from "react";
import type { SignupFormData, SignupStep } from "../_types";

const INITIAL_FORM: SignupFormData = {
  userType: "advertiser",
  terms: {
    service: false,
    privacy: false,
    overseas: false,
    adid: false,
  },
  email: "",
  password: "",
  passwordConfirm: "",
  ageGroup: "",
  business: {
    industryMain: "",
    industrySub: "",
    businessName: "",
    businessDuration: "",
  },
};

export function useSignupForm() {
  const [step, setStep] = useState<SignupStep>(1);
  const [formData, setFormData] = useState<SignupFormData>(INITIAL_FORM);

  const updateForm = useCallback(<K extends keyof SignupFormData>(
    key: K,
    value: SignupFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateTerms = useCallback((key: keyof SignupFormData["terms"], value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      terms: { ...prev.terms, [key]: value },
    }));
  }, []);

  const updateBusiness = useCallback((key: keyof SignupFormData["business"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      business: { ...prev.business, [key]: value },
    }));
  }, []);

  const toggleAllTerms = useCallback((checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      terms: {
        service: checked,
        privacy: checked,
        overseas: checked,
        adid: checked,
      },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setStep((prev) => (prev < 4 ? ((prev + 1) as SignupStep) : prev));
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as SignupStep) : prev));
  }, []);

  const requiredTermsAgreed = formData.terms.service && formData.terms.privacy && formData.terms.overseas;
  const allTermsAgreed = requiredTermsAgreed && formData.terms.adid;

  return {
    step,
    setStep,
    formData,
    updateForm,
    updateTerms,
    updateBusiness,
    toggleAllTerms,
    nextStep,
    prevStep,
    requiredTermsAgreed,
    allTermsAgreed,
  };
}
