import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CloseIcon } from "@/components/icons/CloseIcon";

const meta = {
  title: "Icons/CloseIcon",
  component: CloseIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: [16, 20, 24],
    },
  },
} satisfies Meta<typeof CloseIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 24 },
  render: (args) => (
    <span className="text-neutral-900">
      <CloseIcon {...args} />
    </span>
  ),
};

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-6 text-neutral-900">
      <CloseIcon size={16} />
      <CloseIcon size={20} />
      <CloseIcon size={24} />
    </div>
  ),
};

export const ColorInherit: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-6">
      <span className="text-neutral-900">
        <CloseIcon />
      </span>
      <span className="text-neutral-500">
        <CloseIcon />
      </span>
      <span className="text-pink-500">
        <CloseIcon />
      </span>
    </div>
  ),
};
