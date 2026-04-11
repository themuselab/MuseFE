import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowIcon } from "@/components/ArrowIcon";

const meta = {
  title: "Components/ArrowIcon",
  component: ArrowIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArrowIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallAllDirections: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ArrowIcon size="sm" direction="up" />
      <ArrowIcon size="sm" direction="down" />
      <ArrowIcon size="sm" direction="left" />
      <ArrowIcon size="sm" direction="right" />
    </div>
  ),
};

export const MediumAllDirections: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ArrowIcon size="md" direction="up" />
      <ArrowIcon size="md" direction="down" />
      <ArrowIcon size="md" direction="left" />
      <ArrowIcon size="md" direction="right" />
    </div>
  ),
};

export const LargeAllDirections: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ArrowIcon size="lg" direction="up" />
      <ArrowIcon size="lg" direction="down" />
      <ArrowIcon size="lg" direction="left" />
      <ArrowIcon size="lg" direction="right" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">sm (17px)</span>
        <ArrowIcon size="sm" direction="down" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">md (20px)</span>
        <ArrowIcon size="md" direction="down" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">lg (32px)</span>
        <ArrowIcon size="lg" direction="down" />
      </div>
    </div>
  ),
};
