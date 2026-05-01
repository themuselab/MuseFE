import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputTextArea } from "@/components/InputTextArea";

const meta = {
  title: "Components/InputTextArea",
  component: InputTextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["large", "small"],
      description: "크기 (large=16px / small=14px)",
    },
    label: {
      control: "text",
      description: "상단 라벨 텍스트",
    },
    required: {
      control: "boolean",
      description: "라벨 옆 빨간 별표 표시",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더",
    },
    helperText: {
      control: "text",
      description: "하단 헬퍼 텍스트",
    },
    destructive: {
      control: "boolean",
      description: "에러 상태 (border-error-500, helper-error-700)",
    },
    maxLength: {
      control: "number",
      description: "최대 글자 수 — 제공 시 카운터 표시",
    },
  },
} satisfies Meta<typeof InputTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const LARGE_WRAPPER = "w-[456px]";
const SMALL_WRAPPER = "w-[311px]";

/* ── 기본 (Large, empty) ── */

export const Default: Story = {
  args: {
    label: "아이디",
    required: true,
    placeholder: "이메일을 입력해주세요",
    helperText: "텍스트를 입력해주세요.",
    size: "large",
    maxLength: 200,
  },
  render: (args) => (
    <div className={LARGE_WRAPPER}>
      <InputTextArea {...args} />
    </div>
  ),
};

/* ── Small ── */

export const Small: Story = {
  args: {
    label: "아이디",
    required: true,
    placeholder: "이메일을 입력해주세요",
    helperText: "텍스트를 입력해주세요.",
    size: "small",
    maxLength: 200,
  },
  render: (args) => (
    <div className={SMALL_WRAPPER}>
      <InputTextArea {...args} />
    </div>
  ),
};

/* ── 값이 채워진 상태 (border-neutral-400) ── */

export const Filled: Story = {
  args: {
    label: "아이디",
    required: true,
    defaultValue: "이메일을 입력해주세요",
    helperText: "텍스트를 입력해주세요.",
    size: "large",
    maxLength: 200,
  },
  render: (args) => (
    <div className={LARGE_WRAPPER}>
      <InputTextArea {...args} />
    </div>
  ),
};

/* ── Destructive (에러) ── */

export const Destructive: Story = {
  args: {
    label: "아이디",
    required: true,
    defaultValue: "이메일을 입력해주세요",
    helperText: "텍스트를 입력해주세요.",
    destructive: true,
    size: "large",
    maxLength: 200,
  },
  render: (args) => (
    <div className={LARGE_WRAPPER}>
      <InputTextArea {...args} />
    </div>
  ),
};

/* ── 카운터 없는 변형 ── */

export const WithoutCounter: Story = {
  args: {
    label: "아이디",
    required: true,
    placeholder: "이메일을 입력해주세요",
    helperText: "텍스트를 입력해주세요.",
    size: "large",
  },
  render: (args) => (
    <div className={LARGE_WRAPPER}>
      <InputTextArea {...args} />
    </div>
  ),
};

/* ── 모든 변형 한눈에 ── */

export const AllVariants: Story = {
  args: { label: "아이디" },
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex gap-6">
        <div className={LARGE_WRAPPER}>
          <p className="text-label-m text-neutral-500 mb-2">Large / Empty</p>
          <InputTextArea
            label="아이디"
            required
            placeholder="이메일을 입력해주세요"
            helperText="텍스트를 입력해주세요."
            maxLength={200}
            size="large"
          />
        </div>
        <div className={SMALL_WRAPPER}>
          <p className="text-label-m text-neutral-500 mb-2">Small / Empty</p>
          <InputTextArea
            label="아이디"
            required
            placeholder="이메일을 입력해주세요"
            helperText="텍스트를 입력해주세요."
            maxLength={200}
            size="small"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className={LARGE_WRAPPER}>
          <p className="text-label-m text-neutral-500 mb-2">Large / Filled</p>
          <InputTextArea
            label="아이디"
            required
            defaultValue="이메일을 입력해주세요"
            helperText="텍스트를 입력해주세요."
            maxLength={200}
            size="large"
          />
        </div>
        <div className={SMALL_WRAPPER}>
          <p className="text-label-m text-neutral-500 mb-2">Small / Filled</p>
          <InputTextArea
            label="아이디"
            required
            defaultValue="이메일을 입력해주세요"
            helperText="텍스트를 입력해주세요."
            maxLength={200}
            size="small"
          />
        </div>
      </div>
      <div className="flex gap-6">
        <div className={LARGE_WRAPPER}>
          <p className="text-label-m text-neutral-500 mb-2">
            Large / Destructive
          </p>
          <InputTextArea
            label="아이디"
            required
            defaultValue="이메일을 입력해주세요"
            helperText="텍스트를 입력해주세요."
            maxLength={200}
            destructive
            size="large"
          />
        </div>
        <div className={SMALL_WRAPPER}>
          <p className="text-label-m text-neutral-500 mb-2">
            Small / Destructive
          </p>
          <InputTextArea
            label="아이디"
            required
            defaultValue="이메일을 입력해주세요"
            helperText="텍스트를 입력해주세요."
            maxLength={200}
            destructive
            size="small"
          />
        </div>
      </div>
    </div>
  ),
};
