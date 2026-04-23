"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { BasicInfoSection } from "./BasicInfoSection";
import { BusinessInfoSection } from "./BusinessInfoSection";
import { LeaveConfirmModal } from "./LeaveConfirmModal";
import { SaveConfirmModal } from "./SaveConfirmModal";
import { useAccountForm } from "../_hooks/useAccountForm";
import { useUpdateMe } from "@/hooks/useUpdateMe";
import type { UserProfile } from "@/types/auth";

type AccountFormProps = {
  user: UserProfile;
};

export function AccountForm({ user }: AccountFormProps) {
  const router = useRouter();
  const { values, dirty, setField, diffPayload } = useAccountForm(user);
  const updateMutation = useUpdateMe();
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);

  const handleCancel = () => {
    if (dirty) {
      setLeaveOpen(true);
    } else {
      router.push("/catalog");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = diffPayload();
    if (Object.keys(payload).length === 0) {
      router.push("/catalog");
      return;
    }
    setSaveOpen(true);
  };

  const handleSaveConfirm = () => {
    const payload = diffPayload();
    updateMutation.mutate(payload, {
      onSuccess: () => {
        setSaveOpen(false);
        router.push("/catalog");
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <BasicInfoSection
          email={user.email}
          ageGroup={values.ageGroup}
          onAgeGroupChange={(v) => setField("ageGroup", v)}
        />
        <BusinessInfoSection
          industryMain={values.industryMain}
          businessName={values.businessName}
          businessDuration={values.businessDuration}
          onIndustryMainChange={(v) => setField("industryMain", v)}
          onBusinessNameChange={(v) => setField("businessName", v)}
          onBusinessDurationChange={(v) => setField("businessDuration", v)}
        />
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            hierarchy="secondary"
            size="large"
            onClick={handleCancel}
            className="min-w-32"
          >
            취소
          </Button>
          <Button
            type="submit"
            hierarchy="primary"
            size="large"
            disabled={updateMutation.isPending}
            className="min-w-32"
          >
            수정 완료
          </Button>
        </div>
      </form>

      <LeaveConfirmModal
        open={leaveOpen}
        onClose={() => setLeaveOpen(false)}
        onLeave={() => {
          setLeaveOpen(false);
          router.push("/catalog");
        }}
      />

      <SaveConfirmModal
        open={saveOpen}
        loading={updateMutation.isPending}
        onClose={() => setSaveOpen(false)}
        onConfirm={handleSaveConfirm}
      />
    </>
  );
}
