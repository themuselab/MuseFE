import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextField } from "@/components/TextField";
import { VisibilityOffIcon } from "@/components/Icon";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "플로팅 라벨 텍스트",
    },
    helperText: {
      control: "text",
      description: "하단 도움말/에러 메시지",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "disabled"],
      description: "인풋 상태",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[456px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 상태 ── */

export const Default: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일",
    helperText: "에러 메시지",
    state: "default",
  },
};

export const Error: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일",
    helperText: "올바른 이메일 형식이 아닙니다",
    state: "error",
  },
};

export const Success: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일",
    helperText: "사용 가능한 이메일입니다",
    state: "success",
  },
};

export const Disabled: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일",
    helperText: "에러 메시지",
    state: "disabled",
  },
};

/* ── 아이콘 포함 ── */

export const WithRightIcon: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호",
    type: "password",
    rightIcon: <VisibilityOffIcon size="md" />,
  },
};

/* ── 전체 Variants 한눈에 보기 ── */

export const AllVariants: Story = {
  args: { label: "이메일" },
  render: () => (
    <div className="flex flex-col gap-6 w-[456px]">
      <TextField label="이메일" placeholder="이메일" helperText="에러 메시지" />
      <TextField label="이메일" placeholder="이메일" state="error" helperText="올바른 이메일 형식이 아닙니다" />
      <TextField label="이메일" placeholder="이메일" state="success" helperText="사용 가능한 이메일입니다" />
      <TextField label="이메일" placeholder="이메일" state="disabled" helperText="에러 메시지" />
      <TextField
        label="비밀번호"
        placeholder="비밀번호"
        type="password"
        rightIcon={<VisibilityOffIcon size="md" />}
      />
    </div>
  ),
};
