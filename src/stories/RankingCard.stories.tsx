import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RankingCard } from "@/components/RankingCard";

const meta = {
  title: "Components/RankingCard",
  component: RankingCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rank: {
      control: { type: "number", min: 1, max: 99 },
      description: "랭킹 숫자 (좌상단 뱃지)",
    },
    imageUrl: {
      control: "text",
      description: "이미지 URL (null이면 placeholder 배경만 노출)",
    },
    alt: {
      control: "text",
      description: "이미지 대체 텍스트",
    },
  },
} satisfies Meta<typeof RankingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 기본 ── */

export const Default: Story = {
  args: {
    rank: 1,
    imageUrl: null,
  },
  render: (args) => (
    <div className="w-44">
      <RankingCard {...args} />
    </div>
  ),
};

/* ── Top 5 변형 (랭크 뱃지만 노출) ── */

export const Top5: Story = {
  args: { rank: 1, imageUrl: null },
  render: () => (
    <div className="grid grid-cols-5 gap-5 w-225">
      {[1, 2, 3, 4, 5].map((rank) => (
        <RankingCard key={rank} rank={rank} imageUrl={null} alt="" />
      ))}
    </div>
  ),
};
