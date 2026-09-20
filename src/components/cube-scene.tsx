"use client";

import { useEffect, useRef } from "react";
import type { ClockMode } from "@/lib/clock-types";
import {
  CUBE_COLOR,
  FLIP_DURATION,
  renderCubeFrame,
  TICK_DURATION,
  VOID_COLOR,
} from "@/lib/cube-sdf";

export function CubeScene({
  mode,
  flipNonce,
  onCubeClick,
  onReady,
}: {
  mode: ClockMode;
  flipNonce: number;
  onCubeClick: () => void;
  onReady: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  const flipNonceRef = useRef(flipNonce);
  const readyRef = useRef(false);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    modeRef.current = mode;
    flipNonceRef.current = flipNonce;
    onReadyRef.current = onReady;
  }, [mode, flipNonce, onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      return;
    }

    const phase = { current: 0 };
    const lastSecond = { current: null as number | null };
    const lastNonce = { current: flipNonceRef.current };
    const tick = {
      active: false,
      from: 0,
      to: 0,
      start: 0,
      duration: TICK_DURATION,
    };
    let last = performance.now();
    let lastDraw = 0;
    let running = true;
    let timer = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const loop = (now: number) => {
      if (!running) {
        return;
      }

      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      const currentMode = modeRef.current;

      if (flipNonceRef.current !== lastNonce.current) {
        lastNonce.current = flipNonceRef.current;
        tick.from = phase.current;
        tick.to = phase.current + 1;
        tick.start = now;
        tick.duration = TICK_DURATION;
        tick.active = true;
      }

      if (currentMode === "hypnotic") {
        phase.current += delta / FLIP_DURATION;
        tick.active = false;
      } else if (currentMode === "tick") {
        const second = new Date().getSeconds();
        if (lastSecond.current === null) {
          lastSecond.current = second;
        } else if (second !== lastSecond.current) {
          lastSecond.current = second;
          tick.from = phase.current;
          tick.to = phase.current + 1;
          tick.start = now;
          tick.duration = TICK_DURATION;
          tick.active = true;
        }
      } else {
        lastSecond.current = new Date().getSeconds();
        if (!tick.active) {
          phase.current = Math.round(phase.current);
        }
      }

      if (currentMode !== "hypnotic" && tick.active) {
        const t = Math.min(1, (now - tick.start) / (tick.duration * 1000));
        phase.current = tick.from + (tick.to - tick.from) * t;
        if (t >= 1) {
          phase.current = tick.to;
          tick.active = false;
        }
      }

      if (now - lastDraw >= 30) {
        lastDraw = now;
        renderCubeFrame(ctx, canvas.width, canvas.height, phase.current);
        if (!readyRef.current) {
          readyRef.current = true;
          onReadyRef.current();
        }
      }
    };

    loop(performance.now());
    timer = window.setInterval(() => loop(performance.now()), 33);

    return () => {
      running = false;
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full touch-none cursor-pointer"
      style={{ background: VOID_COLOR, color: CUBE_COLOR }}
      onClick={onCubeClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onCubeClick();
        }
      }}
      role="img"
      aria-label="Tumbling cube clock. Click to flip."
      tabIndex={0}
    />
  );
}
