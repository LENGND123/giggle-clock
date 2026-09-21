import type { Metadata } from "next";
import { Pixelify_Sans, VT323 } from "next/font/google";
import { SiteShell } from "@/components/portfolio/site-shell";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Pixelify_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pixel = VT323({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.fullName}`,
    template: `%s — ${SITE.fullName}`,
  },
  description:
    "Walk around Aditya's room. Click things. Snoop. A point-and-click portfolio from Ajmer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${pixel.variable} h-full`}
      suppressHydrationWarning
    >
      <body className={`${pixel.className} h-full`} suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
