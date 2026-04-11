import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";

const sampleItems = [
  { label: "리스트 1", value: "1" },
  { label: "리스트 2", value: "2" },
  { label: "리스트 3", value: "3" },
  { label: "리스트 4", value: "4" },
  { label: "리스트 5", value: "5" },
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["large", "small"],
      description: "드롭다운 크기",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 ── */

export const DefaultLarge: Story = {
  args: {
    items: sampleItems,
    size: "large",
    placeholder: "선택하세요",
  },
};

export const DefaultSmall: Story = {
  args: {
    items: sampleItems,
    size: "small",
    placeholder: "선택",
  },
};

/* ── 선택된 상태 ── */

export const WithSelection: Story = {
  args: {
    items: sampleItems,
    value: "2",
    size: "large",
  },
};

/* ── 인터랙티브 ── */

function InteractiveDropdown() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-caption-s text-neutral-500">Large</span>
        <Dropdown
          items={sampleItems}
          value={value}
          onChange={setValue}
          size="large"
          placeholder="선택하세요"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption-s text-neutral-500">Small</span>
        <Dropdown
          items={sampleItems}
          value={value}
          onChange={setValue}
          size="small"
          placeholder="선택"
        />
      </div>
      <p className="text-body-m text-neutral-500">
        선택된 값: {value ?? "없음"}
      </p>
    </div>
  );
}

export const Interactive: Story = {
  args: { items: sampleItems },
  render: () => <InteractiveDropdown />,
};
