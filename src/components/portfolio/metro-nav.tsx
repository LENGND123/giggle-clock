"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { STOPS } from "@/lib/site";

function stopIndex(pathname: string) {
  const exact = STOPS.findIndex((stop) => stop.href === pathname);
  if (exact >= 0) {
    return exact;
  }
  return 0;
}

export function MetroNav() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const active = ready ? stopIndex(pathname) : 0;
  const fill = (active / (STOPS.length - 1)) * 86;

  return (
    <nav className="train-nav" aria-label="Main" suppressHydrationWarning>
      <div className="train-nav__track">
        <div className="train-nav__line" />
        <div className="train-nav__fill" style={{ width: `${fill}%` }} />
        <ul className="train-nav__stops">
          {STOPS.map((stop, index) => {
            const isActive = index === active;
            const isPassed = index < active;
            return (
              <li
                key={stop.id}
                className={`train-nav__stop${isActive ? " is-active" : ""}${isPassed ? " is-passed" : ""}`}
                suppressHydrationWarning
              >
                <a href={stop.href}>
                  <span className="train-nav__dot" />
                  <span className="train-nav__label">{stop.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
