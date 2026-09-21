"use client";

import { AvatarMark, WalkDoodle } from "@/components/portfolio/drawings";
import { useShell } from "@/components/portfolio/shell-context";
import { SITE } from "@/lib/site";

export function Sidebar() {
  const { recruiter, setRecruiter } = useShell();

  return (
    <aside className="left-col">
      <a href="/" className="inline-block w-16" aria-label="Home">
        <AvatarMark className="h-16 w-16 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105" />
      </a>
      <h1 className="left-name">
        {SITE.firstName}
        <br />
        {SITE.lastName}
      </h1>
      <p className="left-caption">“{SITE.quote}”</p>
      <div className="left-facts">
        {SITE.handles.map((handle) => (
          <p key={handle.label} className="mb-2.5">
            <a href={handle.href} target="_blank" rel="noreferrer">
              {handle.label}
            </a>
            <span className="left-facts__role">{handle.role}</span>
          </p>
        ))}
        <p>
          {SITE.study}
          <span className="left-facts__role">{SITE.location}</span>
        </p>
      </div>
      <button
        type="button"
        className={`recruiter-btn ${recruiter ? "is-on" : ""}`}
        onClick={() => setRecruiter(!recruiter)}
      >
        Recruiter mode
      </button>
      <div className="walk-doodle-slot">
        <WalkDoodle />
      </div>
    </aside>
  );
}
