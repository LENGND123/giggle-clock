"use client";

import { forwardRef } from "react";
import { ROOM_OBJECTS, WORLD } from "@/lib/room-data";

function Stars() {
  const dots = [
    [40, 12], [90, 8], [140, 18], [210, 6], [280, 14], [360, 9], [430, 16],
    [510, 7], [590, 12], [680, 5], [760, 15], [840, 8], [920, 11], [1010, 6],
    [1100, 13], [1180, 9], [1260, 4], [1340, 14], [1420, 7], [1510, 10],
    [1600, 5], [1690, 12], [1780, 8], [1860, 16], [1950, 6], [2040, 11],
    [2130, 7], [2220, 13], [2310, 5], [2400, 9], [2490, 14], [2580, 8],
    [2670, 6], [2760, 12], [2850, 4], [2940, 10], [3030, 7], [3120, 15],
    [3210, 8], [3300, 11], [3380, 6],
  ] as const;

  return (
    <div className="rm-stars" aria-hidden>
      {dots.map(([x, y], i) => (
        <span
          key={`${x}-${y}`}
          className="rm-star"
          style={{ left: x, top: y, animationDelay: `${(i % 7) * 0.4}s` }}
        />
      ))}
    </div>
  );
}

function Dust() {
  return (
    <div className="rm-dust" aria-hidden>
      {Array.from({ length: 18 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 17) % 100}%`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${7 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}

export function RoomArchitecture() {
  return (
    <>
      <div className="rm-sky" />
      <Stars />
      <div className="rm-clerestory">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className="rm-pane" />
        ))}
      </div>
      <div className="rm-beam" />
      <div className="rm-wall" />
      <div className="rm-scuff" />
      <div className="rm-baseboard" />
      <div className="rm-floor" />
      <div className="rm-floor-shine" />
      <Dust />
      <div className="rm-lamp" style={{ left: 1580 }}>
        <span className="rm-lamp__cord" />
        <span className="rm-lamp__shade" />
        <span className="rm-lamp__glow" />
      </div>
      <div className="rm-lamp rm-lamp--small" style={{ left: 2460 }}>
        <span className="rm-lamp__cord" />
        <span className="rm-lamp__shade" />
        <span className="rm-lamp__glow" />
      </div>
      <div className="rm-outlet" style={{ left: 1610 }} />
      <div className="rm-cord" />
    </>
  );
}

export function RoomFurniture() {
  return (
    <div className="rm-furn" aria-hidden>
      <div className="fn-window" style={{ left: 36, top: 88 }}>
        <div className="fn-window__night">
          <span className="fn-moon" />
          <span className="fn-bldg fn-bldg--a" />
          <span className="fn-bldg fn-bldg--b" />
          <span className="fn-bldg fn-bldg--c" />
          <span className="fn-sign">PLATFORM 2</span>
        </div>
        <span className="fn-curtain fn-curtain--l" />
        <span className="fn-curtain fn-curtain--r" />
        <span className="fn-sill" />
        <span className="fn-radiator" />
      </div>

      <div className="fn-bed" style={{ left: 40, top: 268 }}>
        <span className="fn-bed__frame" />
        <span className="fn-bed__sheet" />
        <span className="fn-bed__pillow" />
        <span className="fn-bed__kernel" />
      </div>
      <span className="fn-rug" style={{ left: 118, top: 400 }} />

      <div className="fn-dresser" style={{ left: 408, top: 268 }}>
        <span className="fn-tv" />
        <span className="fn-lava" />
        <span className="fn-phone" />
        <span className="fn-dresser__body" />
      </div>

      <div className="fn-poster fn-poster--comet" style={{ left: 686, top: 164 }}>
        <span />
        <em>STEERING / HANDS</em>
      </div>

      <div className="fn-wardrobe" style={{ left: 776, top: 146 }}>
        <span className="fn-box">CABLES?</span>
        <span className="fn-wardrobe__glass" />
        <span className="fn-wardrobe__door" />
        <span className="fn-bolt">⚡</span>
        <span className="fn-sticky">3</span>
      </div>

      <div className="fn-cabinet" style={{ left: 1118, top: 246 }}>
        <span className="fn-tapes" />
        <span className="fn-type" />
        <span className="fn-cabinet__body" />
      </div>

      <p className="fn-neon" suppressHydrationWarning>
        aditya<span>.</span>dev
      </p>

      <div className="fn-print fn-print--fox" style={{ left: 1396, top: 196 }}>
        <span className="fn-fox" />
        <em>PIXEL</em>
      </div>
      <div className="fn-print fn-print--sun" style={{ left: 1488, top: 206 }} />

      <div className="fn-cork" style={{ left: 1686, top: 154 }}>
        <span className="nt nt-a">TODO</span>
        <span className="nt nt-b">ship</span>
        <span className="nt nt-c">sleep??</span>
        <span className="nt nt-d">call</span>
        <span className="nt nt-e">#1</span>
        <span className="nt nt-f">fur</span>
        <span className="fn-pin" />
      </div>

      <div className="fn-poster fn-poster--grid" style={{ left: 1906, top: 166 }}>
        <span />
        <em>NEON RUNNER</em>
      </div>

      <div className="fn-desk" style={{ left: 2140, top: 246 }}>
        <span className="fn-cpu" />
        <span className="fn-monitor">
          <code>
            while (true)
            {"\n"}
            {"  "}catch(rest)
            {"\n"}
            {"  "}blow()
          </code>
        </span>
        <span className="fn-clock" />
        <span className="fn-desk__top" />
        <span className="fn-desk__leg fn-desk__leg--l" />
        <span className="fn-desk__leg fn-desk__leg--r" />
      </div>

      <div className="fn-shelf" style={{ left: 2584, top: 112 }}>
        <span />
        <span />
        <span />
      </div>

      <span className="fn-skate" style={{ left: 978, top: 396 }} />
      <span className="fn-ticket" style={{ left: 1286, top: 396 }} />
      <span className="fn-manual" style={{ left: 1886, top: 388 }}>
        HTML
        <br />
        3.2
      </span>
      <span className="fn-walkman" style={{ left: 2046, top: 386 }} />
      <span className="fn-rug fn-rug--round" style={{ left: 520, top: 392 }} />
    </div>
  );
}

export const HeroSprite = forwardRef<
  HTMLDivElement,
  { x: number; facing: 1 | -1; walking: boolean }
>(function HeroSprite({ x, facing, walking }, ref) {
  return (
    <div
      ref={ref}
      className={`hero${walking ? " is-walk" : ""}`}
      style={{
        left: x,
        bottom: WORLD.h - WORLD.floor,
        transform: `translateX(-50%) scaleX(${facing})`,
      }}
    >
      <span className="hero__shadow" />
      <svg viewBox="0 0 16 28" width="32" height="56" shapeRendering="crispEdges" aria-hidden>
        <rect x="5" y="1" width="7" height="3" fill="#1c1612" />
        <rect x="4" y="3" width="9" height="2" fill="#1c1612" />
        <rect x="5" y="5" width="7" height="6" fill="#e8b896" />
        <rect x="5" y="8" width="7" height="2" fill="#2a323c" />
        <rect x="6" y="6" width="2" height="2" fill="#1c1612" />
        <rect x="10" y="6" width="1" height="2" fill="#1c1612" />
        <rect x="4" y="11" width="9" height="9" fill="#2f4a7a" />
        <rect x="4" y="11" width="9" height="3" fill="#22365c" />
        <rect x="12" y="12" width="3" height="7" fill="#2f4a7a" />
        <rect x="13" y="18" width="2" height="3" fill="#e8b896" />
        <g className="hero__gait hero__gait--a">
          <rect x="5" y="20" width="3" height="6" fill="#1c2838" />
          <rect x="9" y="20" width="3" height="6" fill="#1c2838" />
          <rect x="5" y="25" width="3" height="2" fill="#ece6dc" />
          <rect x="9" y="25" width="3" height="2" fill="#ece6dc" />
        </g>
        <g className="hero__gait hero__gait--b">
          <rect x="4" y="20" width="3" height="6" fill="#1c2838" />
          <rect x="10" y="20" width="3" height="5" fill="#1c2838" />
          <rect x="4" y="25" width="3" height="2" fill="#ece6dc" />
          <rect x="10" y="24" width="3" height="2" fill="#ece6dc" />
        </g>
      </svg>
    </div>
  );
});

export const CatSprite = forwardRef<HTMLDivElement, { x: number; facing: 1 | -1 }>(
  function CatSprite({ x, facing }, ref) {
    return (
      <div
        ref={ref}
        className="cat"
        style={{
          left: x,
          bottom: WORLD.h - WORLD.floor + 2,
          transform: `translateX(-50%) scaleX(${facing})`,
        }}
      >
        <svg viewBox="0 0 22 12" width="44" height="24" shapeRendering="crispEdges" aria-hidden>
          <rect x="2" y="1" width="3" height="3" fill="#e8c49a" />
          <rect x="7" y="1" width="3" height="3" fill="#e8c49a" />
          <rect x="1" y="3" width="10" height="7" fill="#e8c49a" />
          <rect x="10" y="5" width="9" height="5" fill="#d4a878" />
          <rect x="18" y="4" width="4" height="2" fill="#c49068" />
          <rect x="3" y="5" width="2" height="2" fill="#1c1612" />
          <rect x="7" y="5" width="2" height="2" fill="#1c1612" />
        </svg>
      </div>
    );
  },
);

export function Hotspots({
  onInspect,
}: {
  onInspect: (id: string) => void;
}) {
  return (
    <>
      {ROOM_OBJECTS.map((obj) => (
        <button
          key={obj.id}
          type="button"
          className="hot"
          data-id={obj.id}
          style={{ left: obj.x, top: obj.y, width: obj.w, height: obj.h }}
          onClick={(event) => {
            event.stopPropagation();
            onInspect(obj.id);
          }}
          aria-label={obj.label}
        >
          <span className="hot__tip">{obj.label}</span>
        </button>
      ))}
    </>
  );
}
