"use client";

import { useEffect, useRef } from "react";
import { handAngles, polar } from "@/lib/analog-geometry";
import type { RenderMode } from "@/lib/clock-types";

type AnalogFaceProps = {
  now: Date | null;
  ink: string;
  hub: string;
  mode: RenderMode;
};

function fillDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawDottedRay(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  angle: number,
  start: number,
  length: number,
  count: number,
  startSize: number,
  endSize: number,
) {
  if (count <= 1) {
    const point = polar(cx, cy, angle, start);
    fillDot(ctx, point.x, point.y, startSize);
    return;
  }

  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const point = polar(cx, cy, angle, start + length * t);
    fillDot(ctx, point.x, point.y, startSize + (endSize - startSize) * t);
  }
}

function drawFace(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  date: Date,
  ink: string,
  hub: string,
  mode: RenderMode,
) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.33;
  const scale = radius / 220;
  const bead = mode === "beads";

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = ink;

  for (let i = 0; i < 60; i += 1) {
    const angle = (i / 60) * Math.PI * 2;
    if (i % 5 === 0) {
      const cardinal = i % 15 === 0;
      const count = cardinal ? (bead ? 4 : 5) : bead ? 2 : 3;
      const size = (cardinal ? 3.4 : 2.5) * scale * (bead ? 1.35 : 1);
      drawDottedRay(
        ctx,
        cx,
        cy,
        angle,
        radius * (cardinal ? 0.86 : 0.9),
        radius * (cardinal ? 0.12 : 0.07),
        count,
        size,
        size * 0.86,
      );
    } else {
      const point = polar(cx, cy, angle, radius * 0.935);
      fillDot(ctx, point.x, point.y, 1.7 * scale * (bead ? 1.4 : 1));
    }
  }

  const { hour, minute, second } = handAngles(date);
  const hubGap = 18 * scale;

  drawDottedRay(
    ctx,
    cx,
    cy,
    hour,
    hubGap,
    radius * 0.48,
    bead ? 7 : 10,
    4.4 * scale,
    2.4 * scale,
  );
  drawDottedRay(
    ctx,
    cx,
    cy,
    minute,
    hubGap,
    radius * 0.7,
    bead ? 10 : 15,
    3.6 * scale,
    1.9 * scale,
  );
  drawDottedRay(
    ctx,
    cx,
    cy,
    second,
    hubGap,
    radius * 0.78,
    bead ? 12 : 19,
    2.4 * scale,
    1.05 * scale,
  );

  for (let i = 0; i < 4; i += 1) {
    const angle = (i / 4) * Math.PI * 2;
    const inner = polar(cx, cy, angle, 7 * scale);
    const outer = polar(cx, cy, angle, 13 * scale);
    fillDot(ctx, inner.x, inner.y, 1.6 * scale);
    fillDot(ctx, outer.x, outer.y, 1.3 * scale);
  }

  ctx.fillStyle = hub;
  fillDot(ctx, cx, cy, 5.2 * scale);
}

export function AnalogFace({ now, ink, hub, mode }: AnalogFaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nowRef = useRef(now);
  nowRef.current = now;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let frame = 0;
    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        frame = window.requestAnimationFrame(render);
        return;
      }

      const rect = parent.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      if (
        canvas.width !== Math.floor(width * dpr) ||
        canvas.height !== Math.floor(height * dpr)
      ) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      const ctx = canvas.getContext("2d");
      const current = nowRef.current;
      if (ctx && current) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawFace(ctx, width, height, current, ink, hub, mode);
      }

      frame = window.requestAnimationFrame(render);
    };

    frame = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(frame);
  }, [ink, hub, mode]);

  return (
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden
      />
  );
}
