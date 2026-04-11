import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GNB } from "@/components/GNB";

const meta = {
  title: "Components/GNB",
  component: GNB,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["logout", "login", "landing"],
      description: "GNB 상태 (로그아웃/로그인/랜딩)",
    },
    activeTab: {
      control: "text",
      description: "현재 활성 탭 value",
    },
  },
} satisfies Meta<typeof GNB>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 로그아웃 상태 ── */

export const LogoutState: Story = {
  args: {
    state: "logout",
    activeTab: "catalog",
  },
};

/* ── 로그인 상태 ── */

export const LoginState: Story = {
  args: {
    state: "login",
    activeTab: "catalog",
    userName: "Muse",
    notificationCount: 300,
  },
};

/* ── 랜딩 상태 ── */

export const LandingState: Story = {
  args: {
    state: "landing",
  },
};

/* ── 전체 상태 비교 ── */

export const AllStates: Story = {
  args: { state: "logout" },
  render: () => (
    <div className="flex flex-col gap-4 bg-neutral-200 p-4">
      <GNB state="logout" activeTab="catalog" />
      <GNB state="login" activeTab="catalog" userName="Muse" notificationCount={300} />
      <GNB state="landing" />
    </div>
  ),
};
