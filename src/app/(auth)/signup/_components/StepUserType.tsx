"use client";

import { useState } from "react";
import { ListButton } from "@/components/ListButton";
import { Button } from "@/components/Button";
import { PreRegistrationModal } from "./PreRegistrationModal";
import type { UserType } from "../_types";

type StepUserTypeProps = {
  userType: UserType;
  onSelect: (type: UserType) => void;
  onNext: () => void;
};

export function StepUserType({ userType, onSelect, onNext }: StepUserTypeProps) {
  const [showModal, setShowModal] = useState(false);

  const handleModelClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-10">
        {/* Title */}
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-heading-l text-neutral-900 text-center">
            어떤 목적으로 사용하시나요?
          </h2>
          <p className="text-heading-xs text-neutral-700 text-center">
            유형에 따라 필요한 약관과 혜택이 달라집니다.
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 w-full">
          <ListButton
            title="광고주"
            description="AI 모델로 광고 이미지/영상 만들기"
            selected={userType === "advertiser"}
            onClick={() => onSelect("advertiser")}
          />
          <ListButton
            title="모델"
            description="나만의 AI 모델로 수익 창출하기 (오픈 예정)"
            selected={userType === "model"}
            onClick={handleModelClick}
          />
        </div>
      </div>

      {/* Next button */}
      <Button
        hierarchy="primary"
        size="large"
        className="w-full"
        onClick={onNext}
      >
        다음 단계로
      </Button>

      <PreRegistrationModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
