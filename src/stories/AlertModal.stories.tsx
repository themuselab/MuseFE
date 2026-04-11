import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { AlertModal } from "@/components/AlertModal";

const meta = {
  title: "Components/AlertModal",
  component: AlertModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "lg"],
      description: "모달 크기",
    },
    open: {
      control: "boolean",
      description: "모달 열림 상태",
    },
  },
} satisfies Meta<typeof AlertModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallModal: Story = {
  args: {
    open: true,
    title: "작성을 중단하시겠어요?",
    size: "sm",
    secondaryLabel: "나가기",
    primaryLabel: "계속 수정하기",
    onClose: () => {},
  },
};

export const LargeModal: Story = {
  args: {
    open: true,
    title: "수정을 중단하시겠어요?",
    size: "lg",
    secondaryLabel: "나가기",
    primaryLabel: "계속 수정하기",
    onClose: () => {},
  },
};

function InteractiveExample() {
  const [openSm, setOpenSm] = useState(false);
  const [openLg, setOpenLg] = useState(false);

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => setOpenSm(true)}
        className="px-4 py-2 bg-neutral-900 text-neutral-50 rounded-full text-[14px] font-semibold"
      >
        Small 모달 열기
      </button>
      <button
        type="button"
        onClick={() => setOpenLg(true)}
        className="px-4 py-2 bg-neutral-900 text-neutral-50 rounded-full text-[14px] font-semibold"
      >
        Large 모달 열기
      </button>

      <AlertModal
        open={openSm}
        onClose={() => setOpenSm(false)}
        title="작성을 중단하시겠어요?"
        size="sm"
        secondaryLabel="나가기"
        primaryLabel="계속 수정하기"
      />
      <AlertModal
        open={openLg}
        onClose={() => setOpenLg(false)}
        title="수정을 중단하시겠어요?"
        size="lg"
        secondaryLabel="나가기"
        primaryLabel="계속 수정하기"
      />
    </div>
  );
}

export const Interactive: Story = {
  args: {
    open: false,
    title: "모달",
    onClose: () => {},
  },
  render: () => <InteractiveExample />,
};
