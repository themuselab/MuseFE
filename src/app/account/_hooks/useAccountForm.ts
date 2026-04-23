"use client";

import { useMemo, useState } from "react";
import type { UserProfile } from "@/types/auth";
import type { AccountFormValues } from "../_types";

const fromProfile = (user: UserProfile): AccountFormValues => ({
  ageGroup: user.ageGroup ?? "",
  industryMain: user.business?.industryMain ?? "",
  businessName: user.business?.businessName ?? "",
  businessDuration: user.business?.businessDuration ?? "",
});

export const useAccountForm = (user: UserProfile) => {
  const initial = useMemo<AccountFormValues>(() => fromProfile(user), [user]);
  const [values, setValues] = useState<AccountFormValues>(initial);

  const dirty = (Object.keys(values) as (keyof AccountFormValues)[]).some(
    (k) => values[k] !== initial[k],
  );

  const setField = <K extends keyof AccountFormValues>(key: K, value: AccountFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setValues(initial);

  const diffPayload = () => {
    const payload: {
      ageGroup?: string;
      business?: {
        industryMain?: string;
        businessName?: string;
        businessDuration?: string;
      };
    } = {};
    if (values.ageGroup !== initial.ageGroup) payload.ageGroup = values.ageGroup;

    const business: NonNullable<typeof payload.business> = {};
    if (values.industryMain !== initial.industryMain) business.industryMain = values.industryMain;
    if (values.businessName !== initial.businessName) business.businessName = values.businessName;
    if (values.businessDuration !== initial.businessDuration)
      business.businessDuration = values.businessDuration;

    if (Object.keys(business).length > 0) payload.business = business;
    return payload;
  };

  return { values, dirty, setField, reset, diffPayload };
};
