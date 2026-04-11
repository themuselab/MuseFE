import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GNBTabButton } from "@/components/GNBTabButton";

const meta = {
  title: "Components/GNBTabButton",
  component: GNBTabButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["large", "small"],
      description: "버튼 크기",
    },
    active: {
      control: "boolean",
      description: "현재 활성 탭 여부",
    },
    badge: {
      control: "number",
      description: "뱃지 숫자 (undefined면 숨김)",
    },
  },
} satisfies Meta<typeof GNBTabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 상태 ── */

export const Default: Story = {
  args: {
    label: "모델",
    size: "large",
  },
};

export const Active: Story = {
  args: {
    label: "모델",
    size: "large",
    active: true,
  },
};

export const WithBadge: Story = {
  args: {
    label: "알림",
    size: "large",
    badge: 3,
  },
};

export const SmallSize: Story = {
  args: {
    label: "모델",
    size: "small",
  },
};

export const SmallWithBadge: Story = {
  args: {
    label: "알림",
    size: "small",
    badge: 0,
  },
};

/* ── 전체 변형 ── */

export const AllVariants: Story = {
  args: { label: "모델" },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-caption-s text-neutral-500">Large</span>
        <div className="flex items-center gap-2">
          <GNBTabButton label="모델" size="large" />
          <GNBTabButton label="모델" size="large" active />
          <GNBTabButton label="알림" size="large" badge={3} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption-s text-neutral-500">Small</span>
        <div className="flex items-center gap-2">
          <GNBTabButton label="모델" size="small" />
          <GNBTabButton label="모델" size="small" active />
          <GNBTabButton label="알림" size="small" badge={0} />
        </div>
      </div>
    </div>
  ),
};
