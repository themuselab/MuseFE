import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ScrollIndicator } from "@/components/ScrollIndicator";

const meta = {
  title: "Components/ScrollIndicator",
  component: ScrollIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FadeTop: Story = {
  args: { direction: "top" },
};

export const FadeBottom: Story = {
  args: { direction: "bottom" },
};

export const BothDirections: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">Top fade</span>
        <ScrollIndicator direction="top" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-500">Bottom fade</span>
        <ScrollIndicator direction="bottom" />
      </div>
    </div>
  ),
};
