"use client";

import { useCallback, useState } from "react";
import type { AdInfoFormState } from "../_types";

const INITIAL_STATE: AdInfoFormState = {
  industry: "",
  itemName: "",
  description: "",
  selectedMoodId: null,
};

export function useAdInfoForm() {
  const [form, setForm] = useState<AdInfoFormState>(INITIAL_STATE);

  const setIndustry = useCallback((industry: string) => {
    setForm((prev) => ({ ...prev, industry, selectedMoodId: null }));
  }, []);

  const setItemName = useCallback((itemName: string) => {
    setForm((prev) => ({ ...prev, itemName, selectedMoodId: null }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setForm((prev) => ({ ...prev, description }));
  }, []);

  const selectMood = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      selectedMoodId: prev.selectedMoodId === id ? null : id,
    }));
  }, []);

  const canSubmit =
    form.industry.length > 0 &&
    form.itemName.length > 0 &&
    form.selectedMoodId !== null;

  const isDirty =
    form.industry.length > 0 ||
    form.itemName.length > 0 ||
    form.description.length > 0 ||
    form.selectedMoodId !== null;

  return {
    form,
    canSubmit,
    isDirty,
    setIndustry,
    setItemName,
    setDescription,
    selectMood,
  };
}
