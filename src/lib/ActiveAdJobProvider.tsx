"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { ACTIVE_AD_JOB_KEY } from "@/constants/app";

export type ActiveAdJob = {
  jobId: string;
  modelId: string;
  itemName: string;
};

type ActiveAdJobContextValue = {
  activeJob: ActiveAdJob | null;
  startJob: (job: ActiveAdJob) => void;
  clearJob: () => void;
};

const ActiveAdJobContext = createContext<ActiveAdJobContextValue | null>(null);

function isActiveAdJob(value: unknown): value is ActiveAdJob {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.jobId === "string" &&
    typeof obj.modelId === "string" &&
    typeof obj.itemName === "string"
  );
}

function readFromStorage(): ActiveAdJob | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ACTIVE_AD_JOB_KEY);
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isActiveAdJob(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

type ActiveAdJobProviderProps = {
  children: ReactNode;
};

export function ActiveAdJobProvider({ children }: ActiveAdJobProviderProps) {
  // AuthProvider 이후에 mount되므로 client에서만 lazy 초기화 — sessionStorage 복원
  const [activeJob, setActiveJob] = useState<ActiveAdJob | null>(() =>
    readFromStorage(),
  );

  const startJob = useCallback((job: ActiveAdJob) => {
    sessionStorage.setItem(ACTIVE_AD_JOB_KEY, JSON.stringify(job));
    setActiveJob(job);
  }, []);

  const clearJob = useCallback(() => {
    sessionStorage.removeItem(ACTIVE_AD_JOB_KEY);
    setActiveJob(null);
  }, []);

  return (
    <ActiveAdJobContext.Provider value={{ activeJob, startJob, clearJob }}>
      {children}
    </ActiveAdJobContext.Provider>
  );
}

export function useActiveAdJob(): ActiveAdJobContextValue {
  const ctx = useContext(ActiveAdJobContext);
  if (!ctx) {
    throw new Error("useActiveAdJob must be used within ActiveAdJobProvider");
  }
  return ctx;
}
