import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { ListButton } from "@/components/ListButton";

const meta = {
  title: "Components/ListButton",
  component: ListButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selected: {
      control: "boolean",
      description: "선택 상태",
    },
  },
} satisfies Meta<typeof ListButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "1시간",
    description: "간단한 미팅에 적합합니다",
  },
};

export const Selected: Story = {
  args: {
    title: "1시간",
    description: "간단한 미팅에 적합합니다",
    selected: true,
  },
};

function InteractiveGroupExample() {
  const [selected, setSelected] = useState<string | null>(null);
  const items = [
    { title: "30분", description: "빠른 체크인에 적합합니다", value: "30" },
    { title: "1시간", description: "간단한 미팅에 적합합니다", value: "60" },
    { title: "2시간", description: "심층 논의에 적합합니다", value: "120" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <ListButton
          key={item.value}
          title={item.title}
          description={item.description}
          selected={selected === item.value}
          onClick={() => setSelected(item.value)}
        />
      ))}
    </div>
  );
}

export const InteractiveGroup: Story = {
  args: { title: "1시간", description: "간단한 미팅에 적합합니다" },
  render: () => <InteractiveGroupExample />,
};
