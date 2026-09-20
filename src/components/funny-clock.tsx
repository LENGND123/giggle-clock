"use client";

import { useCallback, useState } from "react";
import { CubeScene } from "@/components/cube-scene";
import { Button } from "@/components/ui/button";
import { useNow } from "@/hooks/use-now";
import { CLOCK_MODES, modeLabel, type ClockMode } from "@/lib/clock-types";
import { formatTime } from "@/lib/utils";

function HexLoader() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#0b0b0b]"
      aria-hidden
    >
      <div className="hex-loader" />
    </div>
  );
}

export function FunnyClock() {
  const now = useNow(40);
  const [mode, setMode] = useState<ClockMode>("still");
  const [hour12, setHour12] = useState(false);
  const [flipNonce, setFlipNonce] = useState(0);
  const [ready, setReady] = useState(false);
  const [showChrome, setShowChrome] = useState(false);

  const time = formatTime(now, hour12);

  const handleCubeClick = useCallback(() => {
    setFlipNonce((value) => value + 1);
    if (mode === "hypnotic") {
      return;
    }
    setMode("still");
  }, [mode]);

  const handleReady = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-[#0b0b0b] text-[#f4f1ea]"
      onMouseMove={() => setShowChrome(true)}
      onMouseLeave={() => setShowChrome(false)}
      onTouchStart={() => setShowChrome(true)}
    >
      {!ready && <HexLoader />}

      <div className="absolute inset-0 z-10">
        <CubeScene
          mode={mode}
          flipNonce={flipNonce}
          onCubeClick={handleCubeClick}
          onReady={handleReady}
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5 transition-opacity duration-300 sm:p-7 ${
          showChrome ? "opacity-100" : "opacity-40 sm:opacity-0"
        }`}
      >
        <p className="font-mono text-[10px] tracking-[0.34em] text-white/35 uppercase">
          Cube Clock
        </p>
        <div className="pointer-events-auto flex items-center gap-1">
          {CLOCK_MODES.map((item) => (
            <Button
              key={item}
              variant={item === mode ? "active" : "ghost"}
              onClick={() => setMode(item)}
              aria-pressed={item === mode}
            >
              {modeLabel(item)}
            </Button>
          ))}
          <Button
            variant="outline"
            className="ml-2"
            onClick={() => setHour12((value) => !value)}
            aria-label="Toggle 12-hour and 24-hour time"
          >
            {hour12 ? "12h" : "24h"}
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center pb-7 sm:pb-9">
        <p className="flex items-baseline gap-2 font-display leading-none text-white/88">
          <span className="text-3xl tabular-nums tracking-tight sm:text-4xl">
            {time.hours}:{time.minutes}
          </span>
          <span className="font-mono text-base text-white/40 tabular-nums sm:text-lg">
            {time.seconds}
          </span>
          {time.meridian ? (
            <span className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">
              {time.meridian}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
