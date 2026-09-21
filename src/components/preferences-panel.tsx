"use client";

import { Button } from "@/components/ui/button";
import {
  RENDER_MODES,
  THEMES,
  renderModeLabel,
  soundModeLabel,
  type FaceMode,
  type RenderMode,
  type SoundMode,
  type ThemeId,
} from "@/lib/clock-types";
import { cn, formatDate, giggleLine } from "@/lib/utils";

type PreferencesPanelProps = {
  open: boolean;
  face: FaceMode;
  renderMode: RenderMode;
  themeId: ThemeId;
  sound: SoundMode;
  volume: number;
  onFaceChange: (face: FaceMode) => void;
  onRenderModeChange: (mode: RenderMode) => void;
  onThemeChange: (id: ThemeId) => void;
  onSoundChange: (mode: SoundMode) => void;
  onVolumeChange: (volume: number) => void;
  now: Date | null;
};

export function PreferencesPanel({
  open,
  face,
  renderMode,
  themeId,
  sound,
  volume,
  onFaceChange,
  onRenderModeChange,
  onThemeChange,
  onSoundChange,
  onVolumeChange,
  now,
}: PreferencesPanelProps) {
  if (!open) {
    return null;
  }

  return (
    <aside className="pointer-events-auto absolute top-16 left-5 z-20 w-[220px] sm:top-20 sm:left-8">
      <p className="mb-4 text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
        System Preferences
      </p>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
          Mode
        </span>
        <button
          type="button"
          onClick={() => {
            const index = RENDER_MODES.indexOf(renderMode);
            const next = RENDER_MODES[(index + 1) % RENDER_MODES.length];
            if (next) {
              onRenderModeChange(next);
            }
          }}
          className="rounded-full bg-[var(--pill)] py-1.5 pr-3 pl-3 text-sm text-[var(--ink)] shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          aria-label={`Texture ${renderModeLabel(renderMode)}`}
        >
          {renderModeLabel(renderMode)} <span className="opacity-70">+</span>
        </button>
      </div>

      <div className="mb-5 flex gap-2">
        <Button
          variant={face === "digital" ? "active" : "ghost"}
          aria-pressed={face === "digital"}
          onClick={() => onFaceChange("digital")}
        >
          Digital
        </Button>
        <Button
          variant={face === "analog" ? "active" : "ghost"}
          aria-pressed={face === "analog"}
          onClick={() => onFaceChange("analog")}
        >
          Analog
        </Button>
      </div>

      <div className="mb-7 flex items-center gap-3">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            aria-label={`${theme.id} theme`}
            aria-pressed={theme.id === themeId}
            onClick={() => onThemeChange(theme.id)}
            className={cn(
              "size-7 rounded-full border border-black/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]",
              theme.id === themeId && "ring-2 ring-[var(--ink)] ring-offset-2 ring-offset-[var(--bg)]",
            )}
            style={{ background: theme.swatch }}
          />
        ))}
      </div>

      <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
        Sound
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {(["mute", "system", "watch"] as const).map((item) => (
          <Button
            key={item}
            variant={sound === item ? "active" : "ghost"}
            aria-pressed={sound === item}
            onClick={() => onSoundChange(item)}
          >
            {soundModeLabel(item)}
          </Button>
        ))}
      </div>

      <label className="relative mb-8 block h-9 cursor-pointer">
        <span className="sr-only">Volume</span>
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--pill)_70%,transparent)]">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--pill)]"
            style={{ width: `${volume}%` }}
          />
          <span className="absolute inset-0 flex items-center px-4 text-sm text-[var(--ink)]">
            {volume}%
          </span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
        Paper
      </p>
      <button
        type="button"
        onClick={() => {
          const others = THEMES.filter((theme) => theme.id !== themeId);
          const pick = others[Math.floor(Math.random() * others.length)];
          if (pick) {
            onThemeChange(pick.id);
          }
        }}
        className="inline-flex h-9 items-center rounded-full bg-[var(--pill)] px-4 text-sm text-[var(--ink)] shadow-[0_1px_0_rgba(0,0,0,0.06)]"
      >
        Shuffle paper
      </button>

      <p className="mt-8 font-display text-lg leading-none tracking-tight text-[var(--ink)]">
        Giggle Clock
      </p>
      <p className="mt-2 text-[11px] text-[var(--muted)]">
        {now ? formatDate(now) : "waiting on a second"}
      </p>
      <p className="mt-1 text-[11px] tracking-[0.02em] text-[var(--muted)]">
        {now ? giggleLine(now) : "the dots are lining up."}
      </p>
    </aside>
  );
}
