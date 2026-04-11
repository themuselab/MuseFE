import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Checkbox } from "@/components/Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "선택 상태",
    },
    label: {
      control: "text",
      description: "체크박스 라벨",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 상태 ── */

export const Unchecked: Story = {
  args: {
    label: "약관에 동의합니다",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "약관에 동의합니다",
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

/* ── 인터랙티브 ── */

function InteractiveCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="클릭해서 토글해 보세요"
      checked={checked}
      onChange={(e) => setChecked(e.currentTarget.checked)}
    />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveCheckbox />,
};
