import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FilterButton } from "@/components/FilterButton";

const meta = {
  title: "Components/FilterButton",
  component: FilterButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: "boolean",
      description: "선택 상태 (배경 neutral-100)",
    },
    onClick: {
      action: "clicked",
    },
  },
} satisfies Meta<typeof FilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 (마우스 오버 시 hover 배경 확인) ── */

export const Default: Story = {
  args: {
    selected: false,
  },
};

/* ── 선택 상태 ── */

export const Selected: Story = {
  args: {
    selected: true,
  },
};

/* ── 모든 상태 한눈에 ── */

export const AllStates: Story = {
  args: { selected: false },
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <FilterButton selected={false} />
        <span className="text-caption-s text-neutral-500">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FilterButton selected />
        <span className="text-caption-s text-neutral-500">Selected</span>
      </div>
    </div>
  ),
};
