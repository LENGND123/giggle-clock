"use client";

import Link from "next/link";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import { DoodleBuddy, PlayGate } from "@/components/portfolio/drawings";

export function PlayView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [strokes, setStrokes] = useState<ImageData[]>([]);

  const color = "#1a52d4";

  const snapshot = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    setStrokes((prev) => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

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
    snapshot();
    drawing.current = true;
    canvas.setPointerCapture(event.pointerId);
    const { x, y } = point(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
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

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || strokes.length === 0) {
      return;
    }
    const prev = strokes[strokes.length - 1];
    if (!prev) {
      return;
    }
    ctx.putImageData(prev, 0, 0);
    setStrokes((list) => list.slice(0, -1));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    snapshot();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <div className="doodle-wrap">
        <PlayGate />
        <p className="mx-auto my-3 max-w-sm border border-[#1a52d4] px-3 py-2 text-center text-[11px] leading-5 text-[#1a52d4]">
          looks like you got off at the wrong stop... might as well doodle something below!
        </p>
        <div className="relative px-5 pb-4">
          <p className="mb-2 font-[family-name:var(--font-hand)] text-2xl text-[#1a52d4]">
            Doodle here! →
          </p>
          <div className="absolute top-0 right-6">
            <DoodleBuddy />
          </div>
          <p className="mb-2 text-center text-[9px] tracking-[0.18em] text-[#1a52d4]/40 uppercase">
            Stop 4.04 — doodle pad
          </p>
          <canvas
            ref={canvasRef}
            className="doodle-canvas"
            width={900}
            height={420}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          />
          <div className="mt-3 flex justify-end gap-2 text-[11px]">
            <button
              type="button"
              className="border border-[#1a52d4]/30 px-3 py-1 text-[#1a52d4] disabled:opacity-30"
              onClick={undo}
              disabled={strokes.length === 0}
            >
              undo
            </button>
            <button
              type="button"
              className="border border-[#1a52d4]/30 px-3 py-1 text-[#1a52d4]"
              onClick={clear}
            >
              clear
            </button>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-white/70">
        <Link href="/">← back to home</Link>
      </p>
    </div>
  );
}
