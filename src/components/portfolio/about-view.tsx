import Link from "next/link";
import { AboutDiorama } from "@/components/portfolio/drawings";
import { EXPERIENCE, OUTSIDE_WORK, SITE } from "@/lib/site";

export function AboutView() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="page-stop">Stop 02</p>
        <h2 className="page-title">
          Software should
          <br />
          be fun!
        </h2>
        <p className="mt-6 max-w-md text-sm leading-7 text-white/85">
          Code comes first for me — then the drawing, in service of making
          sure the thing actually feels like it did in my head. I build from
          Ajmer: clocks, chat rooms, hospital wards, and steering wheels made
          of hands.
        </p>
        <p className="mt-4 text-[11px] text-white/55">
          <Link href="/play" className="underline decoration-white/30 underline-offset-4">
            why does this whole site have trains? →
          </Link>
        </p>

        <p className="mt-10 text-[10px] tracking-[0.18em] text-white/40 uppercase">
          Experience + communities
        </p>
        <ul className="mt-3 max-w-md">
          {EXPERIENCE.map((row) => (
            <li className="exp-row" key={row.place}>
              <span>{row.place}</span>
              <span className="text-white/70">{row.role}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[10px] tracking-[0.18em] text-white/40 uppercase">
          Outside of work you can find me...
        </p>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {OUTSIDE_WORK.map((item) => (
            <li key={item.label}>
              {item.icon} {item.label} — {item.detail}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-white/70">
          want to see what I have built?{" "}
          <Link href="/work" className="text-white underline underline-offset-4">
            → selected work
          </Link>
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-md bg-white">
          <AboutDiorama />
        </div>
        <div className="polaroid absolute -right-2 top-6 w-40 md:right-4">
          <div className="h-28 bg-[#d9e4ff]" />
          <p className="mt-2 text-center">hi, I&apos;m Aditya</p>
        </div>
        <div className="polaroid polaroid--tilt mt-8 w-44">
          <div className="grid h-28 place-items-center bg-[#1a52d4] text-xs tracking-[0.2em] text-white">
            AJMER
          </div>
          <p className="mt-2 text-center">building from the station</p>
        </div>
        <p className="mt-6 text-[11px] text-white/55">
          <a href={SITE.linkedin} className="underline underline-offset-4">
            linkedin
          </a>
          {" · "}
          <a href={SITE.github} className="underline underline-offset-4">
            github
          </a>
        </p>
      </div>
    </div>
  );
}
