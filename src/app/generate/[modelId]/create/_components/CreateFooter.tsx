"use client";

import { Button } from "@/components/Button";

type CreateFooterProps = {
  canSubmit: boolean;
  onSubmit: () => void;
};

export function CreateFooter({ canSubmit, onSubmit }: CreateFooterProps) {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-30 h-20 bg-neutral-50 shadow-[0_-1px_7px_#201d1f14]">
      <div className="h-full max-w-[1440px] mx-auto px-6 lg:px-30 flex items-center justify-end">
        <Button
          hierarchy="primary"
          size="large"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="w-full lg:w-71"
        >
          광고 제작하기
        </Button>
      </div>
    </footer>
  );
}
