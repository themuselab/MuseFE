import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    hierarchy: {
      control: "select",
      options: ["primary", "secondary", "accent", "destructive"],
      description: "버튼 스타일 계층",
    },
    size: {
      control: "select",
      options: ["large", "medium"],
      description: "버튼 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Hierarchy 변형 ── */

export const Primary: Story = {
  args: {
    hierarchy: "primary",
    size: "large",
    children: "참여하기",
  },
};

export const Secondary: Story = {
  args: {
    hierarchy: "secondary",
    size: "large",
    children: "참여하기",
  },
};

export const Accent: Story = {
  args: {
    hierarchy: "accent",
    size: "large",
    children: "참여하기",
  },
};

export const Destructive: Story = {
  args: {
    hierarchy: "destructive",
    size: "large",
    children: "삭제하기",
  },
};

/* ── Size 변형 ── */

export const Medium: Story = {
  args: {
    hierarchy: "primary",
    size: "medium",
    children: "회원가입",
  },
};

/* ── State 변형 ── */

export const Disabled: Story = {
  args: {
    hierarchy: "primary",
    size: "large",
    children: "참여하기",
    disabled: true,
  },
};

/* ── 전체 Variants 한눈에 보기 ── */

export const AllVariants: Story = {
  args: { children: "참여하기" },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-label-m text-neutral-500">Large</p>
        <div className="flex flex-wrap gap-3">
          <Button hierarchy="primary" size="large">참여하기</Button>
          <Button hierarchy="secondary" size="large">참여하기</Button>
          <Button hierarchy="accent" size="large">참여하기</Button>
          <Button hierarchy="destructive" size="large">삭제하기</Button>
          <Button hierarchy="primary" size="large" disabled>참여하기</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-label-m text-neutral-500">Medium</p>
        <div className="flex flex-wrap gap-3">
          <Button hierarchy="primary" size="medium">회원가입</Button>
          <Button hierarchy="secondary" size="medium">회원가입</Button>
          <Button hierarchy="destructive" size="medium">삭제하기</Button>
          <Button hierarchy="primary" size="medium" disabled>회원가입</Button>
        </div>
      </div>
    </div>
  ),
};
