"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { MetroNav } from "@/components/portfolio/metro-nav";
import { RecruiterView } from "@/components/portfolio/recruiter-view";
import { ShellContext } from "@/components/portfolio/shell-context";
import { Sidebar } from "@/components/portfolio/sidebar";
import { SiteEnd } from "@/components/portfolio/site-end";

export function SiteShell({ children }: { children: ReactNode }) {
  const [recruiter, setRecruiter] = useState(false);
  const pathname = usePathname();
  const value = useMemo(() => ({ recruiter, setRecruiter }), [recruiter]);

  useEffect(() => {
    document.body.classList.toggle("is-home", pathname === "/");
    return () => document.body.classList.remove("is-home");
  }, [pathname]);

  return (
    <ShellContext.Provider value={value}>
      <CustomCursor />
      <div className="site-shell">
        <MetroNav />
        <div className="page-body">
          <Sidebar />
          <main className="main-content">
            {recruiter ? <RecruiterView /> : children}
          </main>
        </div>
        <SiteEnd />
      </div>
    </ShellContext.Provider>
  );
}
