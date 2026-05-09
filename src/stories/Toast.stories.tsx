import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Toast } from "@/components/Toast";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "error"],
      description: "토스트 종류",
    },
    open: {
      control: "boolean",
      description: "표시 여부",
    },
    durationMs: {
      control: "number",
      description: "자동 닫힘까지의 시간(ms)",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    open: true,
    message: "저장되었어요.",
    variant: "info",
    durationMs: 2500,
    onClose: () => {},
  },
};

export const ErrorVariant: Story = {
  args: {
    open: true,
    message: "인증 시간이 만료됐어요. 다시 구글 로그인을 해주세요.",
    variant: "error",
    durationMs: 2500,
    onClose: () => {},
  },
};

function InteractiveExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-neutral-900 text-neutral-50 rounded-full text-label-m"
      >
        토스트 띄우기
      </button>
      <Toast
        open={open}
        onClose={() => setOpen(false)}
        message="2.5초 후 자동으로 사라져요"
        variant="info"
      />
    </div>
  );
}

export const Interactive: Story = {
  args: {
    open: false,
    message: "",
    onClose: () => {},
  },
  render: () => <InteractiveExample />,
};
