import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GhostButton } from "@/components/GhostButton";

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M15 6.667a5 5 0 0 0-10 0c0 5.833-2.5 7.5-2.5 7.5h15S15 12.5 15 6.667M11.442 17.5a1.667 1.667 0 0 1-2.884 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const meta = {
  title: "Components/GhostButton",
  component: GhostButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["lg", "sm"],
      description: "버튼 크기",
    },
    label: {
      control: "text",
      description: "버튼 텍스트",
    },
  },
} satisfies Meta<typeof GhostButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLg: Story = {
  args: {
    label: "랜덤설정",
    size: "lg",
    leftIcon: <BellIcon />,
  },
};

export const DefaultSm: Story = {
  args: {
    label: "랜덤설정",
    size: "sm",
    leftIcon: <BellIcon />,
  },
};

export const AllStates: Story = {
  args: { label: "랜덤설정" },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-caption-s text-neutral-500 w-16">Large</span>
        <GhostButton label="랜덤설정" size="lg" leftIcon={<BellIcon />} />
        <GhostButton label="랜덤설정" size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-caption-s text-neutral-500 w-16">Small</span>
        <GhostButton label="랜덤설정" size="sm" leftIcon={<BellIcon />} />
        <GhostButton label="랜덤설정" size="sm" />
      </div>
    </div>
  ),
};
