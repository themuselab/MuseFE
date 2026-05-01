import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImageUploadCard } from "@/components/ImageUploadCard";

const meta = {
  title: "Components/ImageUploadCard",
  component: ImageUploadCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "lg"],
      description: "카드 높이 (sm=250 / lg=350)",
    },
    title: {
      control: "text",
      description: "타이틀 텍스트",
    },
    description: {
      control: "text",
      description: "설명 텍스트",
    },
  },
} satisfies Meta<typeof ImageUploadCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 (lg, 660×350. 마우스 오버 시 hover 배경 확인) ── */

export const Default: Story = {
  args: {
    size: "lg",
  },
};

/* ── Small (696×250) ── */

export const Small: Story = {
  args: {
    size: "sm",
  },
};

/* ── 커스텀 텍스트 ── */

export const CustomText: Story = {
  args: {
    size: "lg",
    title: "프로필 사진 업로드",
    description: "정사각형 비율 권장 · 5MB 이하",
  },
};

/* ── 로딩 상태 (이미지 + 어두운 오버레이 + dots) ── */

export const Loading: Story = {
  args: {
    size: "sm",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
    loading: true,
  },
};

/* ── 완료 상태 (이미지 표시, hover 시 재업로드 버튼) ── */

export const Done: Story = {
  args: {
    size: "sm",
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
    loading: false,
  },
};

/* ── 모든 변형 ── */

export const AllVariants: Story = {
  args: { size: "lg" },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-label-m text-neutral-500 mb-2">Size = lg (660×350)</p>
        <ImageUploadCard size="lg" />
      </div>
      <div>
        <p className="text-label-m text-neutral-500 mb-2">Size = sm (696×250)</p>
        <ImageUploadCard size="sm" />
      </div>
    </div>
  ),
};
