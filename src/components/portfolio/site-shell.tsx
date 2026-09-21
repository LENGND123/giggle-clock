"use client";

import type { ReactNode } from "react";
import { PixelRoom } from "@/components/room/pixel-room";

export function SiteShell({ children: _children }: { children: ReactNode }) {
  return <PixelRoom />;
}
