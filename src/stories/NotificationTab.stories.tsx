import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationTab } from "@/components/NotificationTab";

const meta = {
  title: "Components/NotificationTab",
  component: NotificationTab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["meeting", "comment", "welcome"],
      description: "알림 타입",
    },
    read: {
      control: "boolean",
      description: "읽음 상태",
    },
  },
} satisfies Meta<typeof NotificationTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MeetingRead: Story = {
  args: {
    type: "meeting",
    title: "제작 완료 🎉",
    message: "호스트 '00'님이 참여 신청을 승인했어요! 지금 바로 팀원들과 첫인사를 나눠보세요.",
    timestamp: "1분 전",
    read: true,
  },
};

export const MeetingUnread: Story = {
  args: {
    type: "meeting",
    title: "참여 신청 결과 안내",
    message: "아쉽게도 '00' 챌린지에 함께하지 못하게 되었어요. 주최자의 코멘트를 확인하거나 다른 모임을 찾아보세요.",
    timestamp: "1분 전",
    read: false,
  },
};

export const CommentRead: Story = {
  args: {
    type: "comment",
    title: "무료 크레딧 지급",
    message: "뮤즈님, 반가워요!\n무료 크레딧 200이 지급되었어요.",
    timestamp: "5시간 전",
    read: true,
  },
};

export const WelcomeUnread: Story = {
  args: {
    type: "welcome",
    title: "뮤즈에 오신 걸 환영해요!",
    message: "이제 코딩 스킬을 레벨업할 준비가 되셨나요? 프로필을 완성하고, 나에게 맞는 활동을 시작해보세요.",
    timestamp: "방금",
    read: false,
    actionLabel: "이동하기",
  },
};
