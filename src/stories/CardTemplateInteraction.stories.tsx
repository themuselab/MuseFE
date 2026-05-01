import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardTemplateInteraction } from "@/components/CardTemplateInteraction";

const meta = {
  title: "Components/CardTemplateInteraction",
  component: CardTemplateInteraction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "카드 하단 라벨 텍스트",
    },
    imageUrl: {
      control: "text",
      description: "이미지 URL (null이면 placeholder 배경만 노출)",
    },
    alt: {
      control: "text",
      description: "이미지 대체 텍스트",
    },
    selected: {
      control: "boolean",
      description: "선택 상태 (핑크 테두리 + 그림자)",
    },
    disabled: {
      control: "boolean",
      description: "다른 카드가 선택되어 흐려진 상태 (opacity 0.3)",
    },
    onClick: {
      action: "clicked",
    },
  },
} satisfies Meta<typeof CardTemplateInteraction>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIZE_WRAPPER = "w-72";

/* ── 기본 (마우스 오버 시 hover 그림자, controls로 selected/disabled 토글 가능) ── */

export const Default: Story = {
  args: {
    label: "pose",
    imageUrl: null,
    selected: false,
    disabled: false,
  },
  render: (args) => (
    <div className={SIZE_WRAPPER}>
      <CardTemplateInteraction {...args} />
    </div>
  ),
};

/* ── 선택 상태 ── */

export const Selected: Story = {
  args: {
    label: "pose",
    imageUrl: null,
    selected: true,
  },
  render: (args) => (
    <div className={SIZE_WRAPPER}>
      <CardTemplateInteraction {...args} />
    </div>
  ),
};

/* ── 비활성(다른 카드 선택됨) ── */

export const Disabled: Story = {
  args: {
    label: "pose",
    imageUrl: null,
    disabled: true,
  },
  render: (args) => (
    <div className={SIZE_WRAPPER}>
      <CardTemplateInteraction {...args} />
    </div>
  ),
};
