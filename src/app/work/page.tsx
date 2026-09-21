import type { Metadata } from "next";
import { WorkView } from "@/components/portfolio/work-view";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return <WorkView />;
}
