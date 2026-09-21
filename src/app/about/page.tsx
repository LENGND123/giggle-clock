import type { Metadata } from "next";
import { AboutView } from "@/components/portfolio/about-view";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <AboutView />;
}
