import { StationEnd } from "@/components/portfolio/drawings";
import { SITE } from "@/lib/site";

export function SiteEnd() {
  return (
    <footer className="site-end">
      <p className="flex items-center gap-2 text-white/80">
        <span className="font-[family-name:var(--font-display)] text-lg font-light">
          {SITE.fullName}
        </span>
      </p>
      <div className="hidden justify-center md:flex">
        <StationEnd className="h-28 w-[320px]" />
      </div>
      <nav className="flex flex-wrap gap-4 text-[11px] tracking-[0.08em] uppercase">
        <a href={SITE.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${SITE.email}`}>Mail</a>
        <a href={SITE.resume} target="_blank" rel="noreferrer">
          Resume ↗
        </a>
      </nav>
    </footer>
  );
}
