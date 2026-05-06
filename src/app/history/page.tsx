"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGNB } from "@/components/AuthGNB";
import { HistoryGrid } from "./_components/HistoryGrid";
import { HistoryEmpty } from "./_components/HistoryEmpty";
import { DeleteConfirmModal } from "./_components/DeleteConfirmModal";
import {
  useDeleteHistoryItem,
  useDownloadHistoryItem,
  useHistoryItems,
} from "./_hooks/useHistoryItems";
import { formatHistoryDate } from "./_data";
import type { HistoryItem } from "./_types";

export default function HistoryPage() {
  const router = useRouter();
  const { items, isLoading, isError } = useHistoryItems();
  const deleteMutation = useDeleteHistoryItem();
  const downloadMutation = useDownloadHistoryItem();
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleEdit = (item: HistoryItem) => {
    if (!item.catalogModelId) return;
    router.push(`/generate/${item.catalogModelId}/result?jobId=${item.id}`);
  };

  const handleDownload = (item: HistoryItem) => {
    const date = formatHistoryDate(item.createdAt).replace(/[\s.]/g, "").slice(0, 8);
    const fallback = `muse-${item.modelName ?? "ad"}-${date}.png`;
    downloadMutation.mutate({ id: item.id, fallbackFilename: fallback });
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTargetId(id);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;
    deleteMutation.mutate(deleteTargetId, {
      onSettled: () => setDeleteTargetId(null),
    });
  };

  const handleDeleteClose = () => {
    if (deleteMutation.isPending) return;
    setDeleteTargetId(null);
  };

  const showEmpty = !isLoading && !isError && items.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <AuthGNB activeTab="history" />
      <main className="flex-1 flex flex-col gap-5 px-6 md:px-30 pt-12 md:pt-15 pb-20 max-w-[1440px] w-full mx-auto">
        <h1 className="text-heading-m text-neutral-900">최근 제작한 이미지</h1>

        {showEmpty ? (
          <HistoryEmpty onGoToCatalog={() => router.push("/catalog")} />
        ) : (
          <HistoryGrid
            items={items}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            onDownload={handleDownload}
          />
        )}
      </main>

      <DeleteConfirmModal
        open={deleteTargetId !== null}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
