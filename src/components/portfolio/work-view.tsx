import Link from "next/link";
import { WorkCover } from "@/components/portfolio/drawings";
import { WORK, type WorkItem } from "@/lib/site";

function Card({ item, flip }: { item: WorkItem; flip?: boolean }) {
  return (
    <div className="work-wrap">
      <article className="work-panel">
        <div className="work-panel__img">
          <WorkCover kind={item.cover} />
          <a
            className="work-panel__site"
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            Visit repo ↗
          </a>
          <div className="work-panel__caption">
            <p className="work-panel__num">{item.num}</p>
            <h3 className="work-panel__name">{item.title}</h3>
            <p className="work-panel__summary">{item.summary}</p>
            <div className="work-panel__tags">
              {item.tags.map((tag) => (
                <span className="work-panel__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
      <aside className={`work-pop${flip ? " work-pop--left" : ""}`}>
        <p className="work-pop__label">Case notes</p>
        <p className="work-pop__text">{item.detail}</p>
        <div className="work-pop__meta">
          <span>{item.role}</span>
          <span>{item.stack}</span>
          <span>{item.time}</span>
        </div>
      </aside>
    </div>
  );
}

export function WorkView() {
  const featured = WORK.slice(0, 2);
  const more = WORK.slice(2);

  return (
    <div>
      <p className="page-stop">Stop 01</p>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="page-title">
          Selected
          <br />
          Work.
        </h2>
      </div>
      <div className="work-grid">
        {featured.map((item, index) => (
          <Card key={item.id} item={item} flip={index === 1} />
        ))}
      </div>
      <div className="work-grid mt-4">
        {more.map((item, index) => (
          <Card key={item.id} item={item} flip={index === 1} />
        ))}
      </div>
      <div className="station-footer">
        <div className="station-links">
          <p>
            Next stop ·{" "}
            <Link href="/about">about</Link>{" "}
            <Link href="/play">play</Link>
          </p>
          <Link href="/">↑ back to top</Link>
        </div>
      </div>
    </div>
  );
}
