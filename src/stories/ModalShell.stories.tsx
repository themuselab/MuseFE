import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { ModalShell } from "@/components/ModalShell";
import { Button } from "@/components/Button";

const meta = {
  title: "Components/ModalShell",
  component: ModalShell,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    mobileStyle: { control: "select", options: ["sheet", "centered"] },
    showClose: { control: "boolean" },
    closeOnBackdropClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
  },
} satisfies Meta<typeof ModalShell>;

export default meta;
type Story = StoryObj<typeof meta>;

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-6 p-6 lg:p-12">
      <h2 className="text-heading-m text-neutral-900">{title}</h2>
      <p className="text-body-l text-neutral-700">
        ModalShell 의 children 자리에 자유롭게 콘텐츠를 배치할 수 있습니다.
        백드롭, ESC, 닫기 버튼, 스크롤 락은 셸이 자동으로 처리합니다.
      </p>
      <Button hierarchy="primary" size="large" className="w-full">
        확인
      </Button>
    </div>
  );
}

export const Small: Story = {
  args: {
    open: true,
    onClose: () => {},
    size: "sm",
    mobileStyle: "centered",
    ariaLabel: "작은 모달",
    children: null,
  },
  render: (args) => (
    <ModalShell {...args}>
      <PlaceholderContent title="Small (343px)" />
    </ModalShell>
  ),
};

export const Medium: Story = {
  args: {
    open: true,
    onClose: () => {},
    size: "md",
    mobileStyle: "centered",
    ariaLabel: "중간 모달",
    children: null,
  },
  render: (args) => (
    <ModalShell {...args}>
      <PlaceholderContent title="Medium (560px)" />
    </ModalShell>
  ),
};

export const Large: Story = {
  args: {
    open: true,
    onClose: () => {},
    size: "lg",
    mobileStyle: "sheet",
    ariaLabel: "큰 모달",
    children: null,
  },
  render: (args) => (
    <ModalShell {...args}>
      <PlaceholderContent title="Large (720px)" />
    </ModalShell>
  ),
};

export const ExtraLarge: Story = {
  args: {
    open: true,
    onClose: () => {},
    size: "xl",
    mobileStyle: "sheet",
    ariaLabel: "초대형 모달",
    children: null,
  },
  render: (args) => (
    <ModalShell {...args}>
      <PlaceholderContent title="XL (851px)" />
    </ModalShell>
  ),
};

function InteractiveExample() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | null>(null);

  return (
    <div className="p-8 flex flex-wrap gap-3">
      {(["sm", "md", "lg", "xl"] as const).map((s) => (
        <Button
          key={s}
          hierarchy="secondary"
          size="medium"
          onClick={() => setSize(s)}
        >
          {s.toUpperCase()} 열기
        </Button>
      ))}

      <ModalShell
        open={size !== null}
        onClose={() => setSize(null)}
        size={size ?? "md"}
        mobileStyle={size === "sm" || size === "md" ? "centered" : "sheet"}
        ariaLabel={`${size ?? ""} 모달`}
      >
        <PlaceholderContent title={`${size?.toUpperCase() ?? ""} 사이즈`} />
      </ModalShell>
    </div>
  );
}

export const Interactive: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => <InteractiveExample />,
};

export const NoClose: Story = {
  args: {
    open: true,
    onClose: () => {},
    size: "md",
    mobileStyle: "centered",
    showClose: false,
    closeOnBackdropClick: false,
    closeOnEscape: false,
    ariaLabel: "강제 흐름 모달",
    children: null,
  },
  render: (args) => (
    <ModalShell {...args}>
      <PlaceholderContent title="강제 흐름 (닫기 X 없음)" />
    </ModalShell>
  ),
};
