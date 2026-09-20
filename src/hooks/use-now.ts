"use client";

import { useEffect, useState } from "react";

export function useNow(intervalMs = 50): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      setNow(new Date());
      id = window.setTimeout(tick, intervalMs);
    };
    id = window.setTimeout(tick, 0);
    return () => window.clearTimeout(id);
  }, [intervalMs]);

  return now;
}
