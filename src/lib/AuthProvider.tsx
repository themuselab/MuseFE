"use client";

import { useEffect, useState, type ReactNode } from "react";
import { initializeAuth } from "@/lib/fetchClient";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initializeAuth().then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}
