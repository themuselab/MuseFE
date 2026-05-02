"use client";

import { useCallback, useState } from "react";
import type { AdInfoFormState, Mood } from "../_types";

const INITIAL_STATE: AdInfoFormState = {
  industry: "",
  itemName: "",
  description: "",
  selectedMood: null,
};

export function useAdInfoForm() {
  const [form, setForm] = useState<AdInfoFormState>(INITIAL_STATE);

  const setIndustry = useCallback((industry: string) => {
    setForm((prev) => ({ ...prev, industry, selectedMood: null }));
  }, []);

  const setItemName = useCallback((itemName: string) => {
    setForm((prev) => ({ ...prev, itemName, selectedMood: null }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setForm((prev) => ({ ...prev, description }));
  }, []);

  const selectMood = useCallback((mood: Mood) => {
    setForm((prev) => ({
      ...prev,
      selectedMood: prev.selectedMood?.id === mood.id ? null : mood,
    }));
  }, []);

  const canSubmit =
    form.industry.length > 0 &&
    form.itemName.length > 0 &&
    form.selectedMood !== null;

  const isDirty =
    form.industry.length > 0 ||
    form.itemName.length > 0 ||
    form.description.length > 0 ||
    form.selectedMood !== null;

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
