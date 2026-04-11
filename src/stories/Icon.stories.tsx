import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, VisibilityOnIcon, VisibilityOffIcon } from "@/components/Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "아이콘 크기 (sm=16, md=20, lg=24, xl=32)",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Visibility Icons ── */

export const VisibilityOn: Story = {
  render: (args) => <VisibilityOnIcon {...args} />,
  args: {
    size: "lg",
    className: "text-neutral-500",
  },
};

export const VisibilityOff: Story = {
  render: (args) => <VisibilityOffIcon {...args} />,
  args: {
    size: "lg",
    className: "text-neutral-500",
  },
};

/* ── 크기 비교 ── */

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <VisibilityOnIcon size={size} className="text-neutral-700" />
          <span className="text-caption-s text-neutral-500">{size}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── 색상 변형 ── */

export const ColorVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <VisibilityOnIcon className="text-neutral-900" />
      <VisibilityOnIcon className="text-neutral-500" />
      <VisibilityOnIcon className="text-pink-400" />
      <VisibilityOnIcon className="text-error-500" />
      <VisibilityOnIcon className="text-success-500" />
    </div>
  ),
};
