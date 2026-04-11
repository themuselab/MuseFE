import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialButton } from "@/components/SocialButton";

const meta = {
  title: "Components/SocialButton",
  component: SocialButton,
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
  },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    provider: "google",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    provider: "google",
    size: "small",
  },
};

export const AllStates: Story = {
  args: { provider: "google" },
  render: () => (
    <div className="flex items-center gap-6">
      <SocialButton provider="google" size="large" />
      <SocialButton provider="google" size="small" />
    </div>
  ),
};
