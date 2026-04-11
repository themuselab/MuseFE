import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { RadioButton } from "@/components/RadioButton";

const meta = {
  title: "Components/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "선택 상태",
    },
    label: {
      control: "text",
      description: "라디오 버튼 라벨",
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 상태 ── */

export const Unselected: Story = {
  args: {
    label: "옵션 A",
    checked: false,
  },
};

export const Selected: Story = {
  args: {
    label: "옵션 A",
    checked: true,
  },
};

/* ── 인터랙티브 그룹 ── */

function RadioGroup() {
  const [selected, setSelected] = useState("a");
  return (
    <div className="flex flex-col gap-3">
      <RadioButton
        name="demo"
        label="옵션 A"
        checked={selected === "a"}
        onChange={() => setSelected("a")}
      />
      <RadioButton
        name="demo"
        label="옵션 B"
        checked={selected === "b"}
        onChange={() => setSelected("b")}
      />
      <RadioButton
        name="demo"
        label="옵션 C"
        checked={selected === "c"}
        onChange={() => setSelected("c")}
      />
    </div>
  );
}

export const InteractiveGroup: Story = {
  render: () => <RadioGroup />,
};
