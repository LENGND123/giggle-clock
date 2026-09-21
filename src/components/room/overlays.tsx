"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { EXPERIENCE, OUTSIDE_WORK, SITE, WORK } from "@/lib/site";
import type { PanelId } from "@/lib/room-data";

export function GameOverlays({
  panel,
  stuff,
  onClose,
}: {
  panel: PanelId;
  stuff: string[];
  onClose: () => void;
}) {
  if (!panel) {
    return null;
  }

  return (
    <div className="crt-scrim" onClick={onClose}>
      <div
        className="crt-panel"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="crt-panel__bar">
          <p>{panel}</p>
          <button type="button" onClick={onClose}>
            close
          </button>
        </header>
        <div className="crt-panel__body">{renderPanel(panel, stuff)}</div>
      </div>
    </div>
  );
}

function renderPanel(panel: PanelId, stuff: string[]) {
  switch (panel) {
    case "work":
      return <WorkPanel />;
    case "about":
      return <AboutPanel />;
    case "play":
      return <PlayPanel />;
    case "stuff":
      return <StuffPanel stuff={stuff} />;
    case "menu":
      return <MenuPanel />;
    case null:
      return null;
    default: {
      const _never: never = panel;
      return _never;
    }
  }
}

function WorkPanel() {
  return (
    <div>
      <h2>selected work</h2>
      <p className="crt-lead">Things that sat on that desk before they sat on GitHub.</p>
      <ul className="crt-work">
        {WORK.map((item) => (
          <li key={item.id}>
            <p className="crt-num">{item.num}</p>
            <div>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.title}
              </a>
              <p>{item.summary}</p>
              <p className="crt-meta">
                {item.role} · {item.stack} · {item.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AboutPanel() {
  return (
    <div>
      <h2>about</h2>
      <p className="crt-lead">
        {SITE.fullName} · {SITE.study} · {SITE.location}
      </p>
      <p>{SITE.quote} Code first, then the drawing, so the thing feels like it did in my head.</p>
      <ul className="crt-list">
        {EXPERIENCE.map((row) => (
          <li key={row.place}>
            <span>{row.place}</span>
            <span>{row.role}</span>
          </li>
        ))}
      </ul>
      <p className="crt-k">outside of work</p>
      <ul className="crt-soft">
        {OUTSIDE_WORK.map((item) => (
          <li key={item.label}>
            {item.icon} {item.label} — {item.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlayPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [dirty, setDirty] = useState(false);

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const onDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    drawing.current = true;
    canvas.setPointerCapture(event.pointerId);
    ctx.imageSmoothingEnabled = false;
    const { x, y } = point(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#7dffb0";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    setDirty(true);
  };

  const onMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) {
      return;
    }
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      return;
    }
    const { x, y } = point(event);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const onUp = () => {
    drawing.current = false;
  };

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDirty(false);
  }, []);

  return (
    <div>
      <h2>play</h2>
      <p className="crt-lead">Draw on the little television. Green phosphor only.</p>
      <canvas
        ref={canvasRef}
        width={420}
        height={220}
        className="crt-canvas"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
      <p className="crt-meta">{dirty ? "signal locked" : "static — click to draw"}</p>
      <button type="button" className="crt-btn" onClick={clear}>
        wipe the tube
      </button>
    </div>
  );
}

function StuffPanel({ stuff }: { stuff: string[] }) {
  return (
    <div>
      <h2>stuff</h2>
      <p className="crt-lead">Things you snooped. The room remembers.</p>
      {stuff.length === 0 ? (
        <p>Nothing yet. Click objects in the room.</p>
      ) : (
        <ul className="crt-soft">
          {stuff.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MenuPanel() {
  return (
    <div>
      <h2>menu</h2>
      <p className="crt-lead">The straight version, for people in a hurry.</p>
      <p>
        {SITE.fullName}
        <br />
        {SITE.study} · {SITE.location}
      </p>
      <ul className="crt-list">
        {EXPERIENCE.map((row) => (
          <li key={row.place}>
            <span>{row.place}</span>
            <span>{row.role}</span>
          </li>
        ))}
      </ul>
      <p className="crt-k">links</p>
      <p>
        <a href={SITE.github}>GitHub</a>
        {" · "}
        <a href={SITE.linkedin}>LinkedIn</a>
        {" · "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </div>
  );
}
