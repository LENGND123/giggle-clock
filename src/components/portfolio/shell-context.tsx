"use client";

import { createContext, useContext } from "react";

export type ShellContextValue = {
  recruiter: boolean;
  setRecruiter: (value: boolean) => void;
};

export const ShellContext = createContext<ShellContextValue | null>(null);

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) {
    throw new Error("useShell must be used inside SiteShell");
  }
  return ctx;
}
