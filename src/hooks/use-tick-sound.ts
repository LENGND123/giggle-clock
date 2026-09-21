"use client";

import { useEffect, useRef } from "react";
import type { SoundMode } from "@/lib/clock-types";

function playClick(
  context: AudioContext,
  volume: number,
  kind: "system" | "watch",
  tick: boolean,
) {
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  gain.connect(context.destination);

  if (kind === "system") {
    oscillator.type = "square";
    oscillator.frequency.value = 1860;
    gain.gain.setValueAtTime(volume * 0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    oscillator.start(now);
    oscillator.stop(now + 0.03);
    return;
  }

  oscillator.type = "triangle";
  oscillator.frequency.value = tick ? 980 : 640;
  gain.gain.setValueAtTime(volume * 0.07, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
  oscillator.start(now);
  oscillator.stop(now + 0.05);
}

export function useTickSound(
  now: Date | null,
  mode: SoundMode,
  volume: number,
) {
  const contextRef = useRef<AudioContext | null>(null);
  const lastSecondRef = useRef<number | null>(null);
  const tickRef = useRef(true);

  useEffect(() => {
    const unlock = () => {
      if (!contextRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          contextRef.current = new AudioCtx();
        }
      }
      void contextRef.current?.resume();
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  useEffect(() => {
    if (!now || mode === "mute") {
      return;
    }

    const second = now.getSeconds();
    if (lastSecondRef.current === second) {
      return;
    }
    lastSecondRef.current = second;

    const context = contextRef.current;
    if (!context || context.state !== "running") {
      return;
    }

    const kind = mode === "watch" ? "watch" : "system";
    playClick(context, volume / 100, kind, tickRef.current);
    tickRef.current = !tickRef.current;
  }, [now, mode, volume]);
}
