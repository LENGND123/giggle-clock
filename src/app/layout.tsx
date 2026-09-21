import type { Metadata } from "next";
import { Caveat, Noto_Serif_JP, Space_Mono } from "next/font/google";
import { SiteShell } from "@/components/portfolio/site-shell";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Noto_Serif_JP({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.fullName}`,
    template: `%s — ${SITE.fullName}`,
  },
  description:
    "A round-trip portfolio. Stamp your ticket, board the train, look at the work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${hand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${mono.className} min-h-full bg-[#1a52d4]`} suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
