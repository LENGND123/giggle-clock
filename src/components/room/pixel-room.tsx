"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { GameOverlays } from "@/components/room/overlays";
import {
  CatSprite,
  HeroSprite,
  Hotspots,
  RoomArchitecture,
  RoomFurniture,
} from "@/components/room/room-scene";
import {
  HERO_SPEED,
  nearestObject,
  ROOM_OBJECTS,
  START_X,
  WORLD,
  type PanelId,
} from "@/lib/room-data";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) {
    return "--:-- --";
  }
  const h = now.getHours();
  const ap = h >= 12 ? "PM" : "AM";
  return `${pad(h % 12 || 12)}:${pad(now.getMinutes())} ${ap}`;
}

function pathToPanel(path: string): PanelId {
  if (path === "/work") {
    return "work";
  }
  if (path === "/about") {
    return "about";
  }
  if (path === "/play") {
    return "play";
  }
  return null;
}

function routePanel(next: PanelId, router: { push: (href: string) => void }) {
  switch (next) {
    case "work":
      router.push("/work");
      return;
    case "about":
      router.push("/about");
      return;
    case "play":
      router.push("/play");
      return;
    case "stuff":
    case "menu":
      return;
    case null:
      router.push("/");
      return;
    default: {
      const _never: never = next;
      return _never;
    }
  }
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PixelRoom() {
  const pathname = usePathname();
  const router = useRouter();
  const time = useClock();
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const heroX = useRef(START_X);
  const destX = useRef(START_X);
  const camX = useRef(Math.max(0, START_X - 520));
  const facing = useRef<1 | -1>(-1);
  const keys = useRef({ l: false, r: false });
  const pending = useRef<string | null>(null);
  const catX = useRef(640);
  const catDest = useRef(900);
  const catFace = useRef<1 | -1>(1);
  const last = useRef(0);
  const scaleRef = useRef(1);
  const panelRef = useRef<PanelId>(pathToPanel(pathname));
  const inspectRef = useRef<(id: string, walkFirst: boolean) => void>(() => {});
  const closeRef = useRef<() => void>(() => {});
  const [lines, setLines] = useState<string[]>([]);
  const [lineAt, setLineAt] = useState(0);
  const [stuff, setStuff] = useState<string[]>([]);
  const [panel, setPanel] = useState<PanelId>(pathToPanel(pathname));
  const [got, setGot] = useState<string | null>(null);

  panelRef.current = panel;
  const line = lines[lineAt] ?? null;

  useEffect(() => {
    setPanel(pathToPanel(pathname));
  }, [pathname]);

  useLayoutEffect(() => {
    const apply = () => {
      const scale = window.innerHeight / WORLD.h;
      scaleRef.current = scale;
      const vw = window.innerWidth / scale;
      camX.current = Math.max(0, Math.min(WORLD.w - vw, heroX.current - vw * 0.42));
      worldRef.current?.style.setProperty("--cam", `${camX.current}px`);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    let raf = 0;
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - (last.current || t)) / 1000);
      last.current = t;
      const reduced = prefersReduced();
      const paused = Boolean(panelRef.current);
      let x = heroX.current;
      let moving = false;

      if (!paused && (keys.current.l || keys.current.r)) {
        const dir: 1 | -1 = keys.current.r && !keys.current.l ? 1 : -1;
        facing.current = dir;
        destX.current = x + dir * HERO_SPEED * 2;
        pending.current = null;
      }

      const target = Math.max(80, Math.min(WORLD.w - 80, destX.current));
      const gap = target - x;
      if (!paused && Math.abs(gap) > 1.4) {
        moving = true;
        const step = reduced ? gap : Math.sign(gap) * Math.min(Math.abs(gap), HERO_SPEED * dt);
        x += step;
        facing.current = gap > 0 ? 1 : -1;
      } else if (!paused) {
        x = target;
        if (markRef.current) {
          markRef.current.classList.remove("is-on");
        }
        if (pending.current) {
          const id = pending.current;
          pending.current = null;
          inspectRef.current(id, false);
        }
      }
      heroX.current = x;

      if (!paused) {
        let cat = catX.current;
        if (Math.abs(catDest.current - cat) < 2) {
          catDest.current = 160 + Math.random() * 2500;
        }
        const cgap = catDest.current - cat;
        catFace.current = cgap >= 0 ? 1 : -1;
        cat += Math.sign(cgap) * Math.min(Math.abs(cgap), 52 * dt);
        catX.current = cat;
      }

      const scale = scaleRef.current || window.innerHeight / WORLD.h;
      const vw = window.innerWidth / scale;
      const look = paused ? 0 : facing.current * 70;
      const nextCam = Math.max(0, Math.min(WORLD.w - vw, x - vw * 0.42 + look));
      camX.current += (nextCam - camX.current) * (reduced ? 1 : 0.11);

      if (worldRef.current) {
        worldRef.current.style.setProperty("--cam", `${camX.current}px`);
      }
      if (heroRef.current) {
        heroRef.current.style.left = `${x}px`;
        heroRef.current.style.transform = `translateX(-50%) scaleX(${facing.current})`;
        heroRef.current.classList.toggle("is-walk", moving);
      }
      if (catRef.current) {
        catRef.current.style.left = `${catX.current}px`;
        catRef.current.style.transform = `translateX(-50%) scaleX(${catFace.current})`;
      }
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        keys.current.l = true;
      }
      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        keys.current.r = true;
      }
      if (event.key === "Escape") {
        if (lines.length) {
          setLines([]);
          setLineAt(0);
          return;
        }
        closeRef.current();
      }
      if (event.key === "e" || event.key === "E" || event.key === " ") {
        event.preventDefault();
        if (panelRef.current) {
          return;
        }
        if (lines.length && lineAt < lines.length - 1) {
          setLineAt((n) => n + 1);
          return;
        }
        const near = nearestObject(heroX.current);
        if (near) {
          inspectRef.current(near.id, true);
        }
      }
    };
    const up = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        keys.current.l = false;
      }
      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        keys.current.r = false;
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [lines.length, lineAt]);

  const inspect = (id: string, walkFirst: boolean) => {
    const obj = ROOM_OBJECTS.find((item) => item.id === id);
    if (!obj || panelRef.current) {
      return;
    }
    if (walkFirst && Math.abs(heroX.current - obj.walkX) > 22) {
      destX.current = obj.walkX;
      pending.current = id;
      facing.current = obj.walkX >= heroX.current ? 1 : -1;
      if (markRef.current) {
        markRef.current.style.left = `${obj.walkX}px`;
        markRef.current.classList.add("is-on");
      }
      return;
    }
    setLines(obj.lines);
    setLineAt(0);
    if (obj.stuff) {
      const name = obj.stuff;
      setStuff((prev) => {
        if (prev.includes(name)) {
          return prev;
        }
        window.setTimeout(() => {
          setGot(name);
          window.setTimeout(() => setGot(null), 1600);
        }, 0);
        return [...prev, name];
      });
    }
  };

  inspectRef.current = inspect;

  const openPanel = (next: PanelId) => {
    setPanel(next);
    setLines([]);
    setLineAt(0);
    routePanel(next, router);
  };

  const closePanel = () => {
    setPanel(null);
    if (pathname !== "/") {
      router.push("/");
    }
  };
  closeRef.current = closePanel;

  const onFloor = (event: MouseEvent<HTMLDivElement>) => {
    if (panelRef.current) {
      return;
    }
    if ((event.target as HTMLElement).closest(".hot")) {
      return;
    }
    const stage = stageRef.current;
    if (!stage) {
      return;
    }
    const rect = stage.getBoundingClientRect();
    const scale = window.innerHeight / WORLD.h;
    const worldX = (event.clientX - rect.left) / scale + camX.current;
    destX.current = Math.max(80, Math.min(WORLD.w - 80, worldX));
    pending.current = null;
    setLines([]);
    setLineAt(0);
    if (markRef.current) {
      markRef.current.style.left = `${destX.current}px`;
      markRef.current.classList.add("is-on");
    }
  };

  const onCursor = (event: PointerEvent<HTMLDivElement>) => {
    if (!cursorRef.current) {
      return;
    }
    cursorRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    const hot = (event.target as HTMLElement).closest(".hot, .hud button, .work-tab, .talk, .crt-panel");
    cursorRef.current.classList.toggle("is-hot", Boolean(hot));
  };

  const advanceTalk = () => {
    if (lineAt < lines.length - 1) {
      setLineAt((n) => n + 1);
      return;
    }
    setLines([]);
    setLineAt(0);
  };

  const goHome = () => {
    closePanel();
    destX.current = START_X;
    setLines([]);
    setLineAt(0);
  };

  return (
    <div className="game-root" onPointerMove={onCursor} suppressHydrationWarning>
      <span className="px-cursor" ref={cursorRef} aria-hidden />
      <div className="game-stage" ref={stageRef} onClick={onFloor}>
        <div
          className="game-world"
          ref={worldRef}
          style={{
            width: WORLD.w,
            height: WORLD.h,
            ["--cam" as string]: `${camX.current}px`,
          }}
        >
          <RoomArchitecture />
          <RoomFurniture />
          <Hotspots onInspect={(id) => inspect(id, true)} />
          <span className="walk-mark" ref={markRef} aria-hidden />
          <CatSprite
            ref={catRef}
            x={catX.current}
            facing={catFace.current}
          />
          <HeroSprite
            ref={heroRef}
            x={heroX.current}
            facing={facing.current}
            walking={false}
          />
        </div>
        <div className="scanlines" />
        <div className="vignette" />
      </div>

      <header className="hud">
        <p className="hud__brand">
          aditya.dev <span suppressHydrationWarning>{time}</span>
        </p>
        <nav className="hud__nav">
          <button type="button" className={pathname === "/" && !panel ? "is-on" : ""} onClick={goHome}>
            HOME
          </button>
          <button type="button" className={panel === "work" ? "is-on" : ""} onClick={() => openPanel("work")}>
            WORK
          </button>
          <button type="button" className={panel === "about" ? "is-on" : ""} onClick={() => openPanel("about")}>
            ABOUT
          </button>
          <button type="button" className={panel === "play" ? "is-on" : ""} onClick={() => openPanel("play")}>
            PLAY
          </button>
        </nav>
        <div className="hud__right">
          <button type="button" className={panel === "stuff" ? "is-on" : ""} onClick={() => openPanel("stuff")}>
            STUFF{stuff.length ? ` ${stuff.length}` : ""}
          </button>
          <button type="button" className={panel === "menu" ? "is-on" : ""} onClick={() => openPanel("menu")}>
            MENU
          </button>
        </div>
      </header>

      <button type="button" className="work-tab" onClick={() => openPanel("work")}>
        W. Work
      </button>

      {line ? (
        <button type="button" className="talk" onClick={advanceTalk}>
          <span className="talk__face" />
          <span className="talk__text">
            <em>aditya</em>
            {line}
            <b>{lineAt < lines.length - 1 ? "click to continue" : "click to close"}</b>
          </span>
        </button>
      ) : null}

      {got ? <p className="loot">+ {got}</p> : null}

      <p className="hint">&gt; click to walk · click things to snoop</p>

      <GameOverlays panel={panel} stuff={stuff} onClose={closePanel} />
    </div>
  );
}
