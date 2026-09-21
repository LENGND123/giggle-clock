import type { Metadata } from "next";
import { PlayView } from "@/components/portfolio/play-view";

export const metadata: Metadata = {
  title: "Play",
};

export default function PlayPage() {
  return <PlayView />;
}
