import { EXPERIENCE, SITE, WORK } from "@/lib/site";

export function RecruiterView() {
  return (
    <section className="recruiter-panel">
      <p className="text-[9px] tracking-[0.2em] text-[#1a52d4]/50 uppercase">
        Recruiter mode
      </p>
      <h2>{SITE.fullName}</h2>
      <p className="mb-6 text-sm text-[#1a52d4]/70">
        {SITE.study} · {SITE.location}
      </p>
      <p className="text-[10px] tracking-[0.16em] text-[#1a52d4]/45 uppercase">
        Experience
      </p>
      <ul className="mb-6">
        {EXPERIENCE.map((row) => (
          <li
            className="flex justify-between border-b border-[#1a52d4]/15 py-2 text-sm"
            key={row.place}
          >
            <span>{row.place}</span>
            <span className="text-[#1a52d4]/70">{row.role}</span>
          </li>
        ))}
      </ul>
      <p className="text-[10px] tracking-[0.16em] text-[#1a52d4]/45 uppercase">
        Selected work
      </p>
      <ul>
        {WORK.map((item) => (
          <li key={item.id} className="border-b border-[#1a52d4]/15 py-3">
            <a
              href={item.href}
              className="font-[family-name:var(--font-display)] text-base font-bold text-[#1a2744]"
              target="_blank"
              rel="noreferrer"
            >
              {item.num} · {item.title}
            </a>
            <p className="mt-1 text-xs leading-5 text-[#1a52d4]/70">{item.summary}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs">
        <a href={SITE.github}>GitHub</a>
        {" · "}
        <a href={SITE.linkedin}>LinkedIn</a>
        {" · "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </section>
  );
}
