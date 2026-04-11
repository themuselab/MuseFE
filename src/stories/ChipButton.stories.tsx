import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChipButton } from "@/components/ChipButton";

const meta = {
  title: "Components/ChipButton",
  component: ChipButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["square", "pill"],
      description: "칩 변형",
    },
    selected: {
      control: "boolean",
      description: "선택 상태",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태",
    },
  },
} satisfies Meta<typeof ChipButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SquareDefault: Story = {
  args: {
    label: "전체",
    variant: "square",
  },
};

export const SquareSelected: Story = {
  args: {
    label: "모집중",
    variant: "square",
    selected: true,
  },
};

export const PillDefault: Story = {
  args: {
    label: "chip",
    variant: "pill",
  },
};

export const PillSelected: Story = {
  args: {
    label: "chip",
    variant: "pill",
    selected: true,
  },
};

export const PillDisabled: Story = {
  args: {
    label: "chip",
    variant: "pill",
    disabled: true,
  },
};

export const AllVariants: Story = {
  args: { label: "chip" },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-caption-s text-neutral-500">Square</span>
        <div className="flex items-center gap-2">
          <ChipButton label="전체" variant="square" />
          <ChipButton label="모집중" variant="square" selected />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption-s text-neutral-500">Pill</span>
        <div className="flex items-center gap-2">
          <ChipButton label="chip" variant="pill" />
          <ChipButton label="chip" variant="pill" selected />
          <ChipButton label="chip" variant="pill" disabled />
        </div>
      </div>
    </div>
  ),
};
