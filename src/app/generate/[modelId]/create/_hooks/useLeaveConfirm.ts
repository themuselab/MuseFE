"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Args = {
  isDirty: boolean;
  saveDraft: () => void;
};

export function useLeaveConfirm({ isDirty, saveDraft }: Args) {
  const [open, setOpen] = useState(false);
  const pendingRef = useRef<(() => void) | null>(null);

  const guard = useCallback(
    (action: () => void) => {
      if (!isDirty) {
        action();
        return;
      }
      pendingRef.current = action;
      setOpen(true);
    },
    [isDirty],
  );

  const confirmLeave = useCallback(() => {
    const action = pendingRef.current;
    pendingRef.current = null;
    setOpen(false);
    action?.();
  }, []);

  const saveAndLeave = useCallback(() => {
    saveDraft();
    const action = pendingRef.current;
    pendingRef.current = null;
    setOpen(false);
    action?.();
  }, [saveDraft]);

  const cancel = useCallback(() => {
    pendingRef.current = null;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  return { open, guard, confirmLeave, saveAndLeave, cancel };
}
