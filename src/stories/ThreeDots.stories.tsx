import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThreeDots } from "@/components/ThreeDots";

const meta = {
  title: "Components/ThreeDots",
  component: ThreeDots,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThreeDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: { activeIndex: 0 },
};

export const Second: Story = {
  args: { activeIndex: 1 },
};

export const Third: Story = {
  args: { activeIndex: 2 },
};

export const AllStates: Story = {
  args: { activeIndex: 0 },
  render: () => (
    <div className="flex items-center gap-4 bg-neutral-200 p-4 rounded-lg">
      <ThreeDots activeIndex={0} />
      <ThreeDots activeIndex={1} />
      <ThreeDots activeIndex={2} />
    </div>
  ),
};
