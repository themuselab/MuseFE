import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModal } from "@/components/NotificationModal";

const sampleItems = [
  {
    id: "1",
    type: "comment" as const,
    title: "무료 크레딧 지급",
    message: "뮤즈님, 반가워요!\n무료 크레딧 200이 지급되었어요.",
    timestamp: "5시간 전",
    read: false,
  },
  {
    id: "2",
    type: "meeting" as const,
    title: "참여 신청 결과 안내",
    message: "아쉽게도 '00' 챌린지에 함께하지 못하게 되었어요. 주최자의 코멘트를 확인하거나 다른 모임을 찾아보세요.",
    timestamp: "1분 전",
    read: false,
  },
  {
    id: "3",
    type: "meeting" as const,
    title: "제작 완료 🎉",
    message: "호스트 '00'님이 참여 신청을 승인했어요! 지금 바로 팀원들과 첫인사를 나눠보세요.",
    timestamp: "2시간 전",
    read: false,
  },
  {
    id: "4",
    type: "comment" as const,
    title: "새 댓글",
    message: "뮤즈님, 반가워요!\n무료 크레딧 200이 지급되���어요.",
    timestamp: "3시간 전",
    read: true,
  },
  {
    id: "5",
    type: "welcome" as const,
    title: "뮤즈에 오신 걸 환영해요!",
    message: "이제 코딩 스킬을 레벨업할 준비가 되셨나요? 프로필을 완성하고, 나에게 맞는 ��동을 시작해보세요.",
    timestamp: "1일 전",
    read: true,
    actionLabel: "이동하기",
  },
];

const meta = {
  title: "Components/NotificationModal",
  component: NotificationModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultWithItems: Story = {
  args: {
    open: true,
    items: sampleItems,
    onClose: () => {},
    onMarkAllRead: () => {},
  },
};

export const EmptyState: Story = {
  args: {
    open: true,
    items: [],
    onClose: () => {},
  },
};
