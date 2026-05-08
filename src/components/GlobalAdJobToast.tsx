"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdJobCompleteToast } from "@/components/AdJobCompleteToast";
import { AdJobProgressToast } from "@/components/AdJobProgressToast";
import { useAdJob } from "@/hooks/useAdJob";
import { useActiveAdJob } from "@/lib/ActiveAdJobProvider";

const GENERATING_PATH_RE = /^\/generate\/[^/]+\/generating\/?$/;

export function GlobalAdJobToast() {
  const { activeJob, clearJob } = useActiveAdJob();
  const pathname = usePathname();
  const router = useRouter();
  const job = useAdJob(activeJob?.jobId ?? null);

  const status = job.data?.status ?? null;

  // 실패 상태에선 자동 정리 안 함 (사용자가 토스트 클릭으로 dismiss)
  // 완료 상태도 보러가기 클릭 시에만 정리
  useEffect(() => {
    // generating 페이지에서는 페이지가 자체적으로 redirect 처리하므로 여기서 정리 X
  }, [status]);

  if (!activeJob) return null;
  if (pathname && GENERATING_PATH_RE.test(pathname)) return null;

  const handleResume = () => {
    router.push(`/generate/${activeJob.modelId}/generating`);
  };

  return (
    <div className="fixed top-22 right-30 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        {status === "completed" ? (
          <AdJobCompleteToast
            onView={() => {
              clearJob();
              router.push(`/generate/${activeJob.modelId}/result`);
            }}
          />
        ) : status === "failed" ? (
          <AdJobProgressToast
            itemName={activeJob.itemName}
            variant="error"
            onClick={handleResume}
          />
        ) : (
          <AdJobProgressToast
            itemName={activeJob.itemName}
            onClick={handleResume}
          />
        )}
      </div>
    </div>
  );
}
