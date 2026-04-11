import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/components/Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "아바타 크기 (sm=35, md=44, lg=56, xl=120)",
    },
    name: {
      control: "text",
      description: "이니셜 추출용 이름",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 ── */

export const Default: Story = {
  args: {
    name: "Muse",
    size: "md",
  },
};

/* ── 크기 비교 ── */

export const AllSizes: Story = {
  args: { name: "Muse" },
  render: () => (
    <div className="flex items-end gap-6">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar name="Muse" size={size} />
          <span className="text-caption-s text-neutral-500">{size}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── 다양한 이름 ── */

export const WithDifferentNames: Story = {
  args: { name: "Alice" },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Alice" size="lg" />
      <Avatar name="Bob" size="lg" />
      <Avatar name="찬영" size="lg" />
      <Avatar name="다은" size="lg" />
    </div>
  ),
};
