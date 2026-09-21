"use client";

import { useCallback, useEffect, useState } from "react";
import { AnalogFace } from "@/components/analog-face";
import { DigitalFace } from "@/components/digital-face";
import { PreferencesPanel } from "@/components/preferences-panel";
import { Button } from "@/components/ui/button";
import { useNow } from "@/hooks/use-now";
import { useTickSound } from "@/hooks/use-tick-sound";
import {
  themeById,
  type FaceMode,
  type RenderMode,
  type SoundMode,
  type ThemeId,
} from "@/lib/clock-types";

export function FunnyClock() {
  const now = useNow(40);
  const [face, setFace] = useState<FaceMode>("analog");
  const [renderMode, setRenderMode] = useState<RenderMode>("halftone");
  const [themeId, setThemeId] = useState<ThemeId>("sun");
  const [sound, setSound] = useState<SoundMode>("system");
  const [volume, setVolume] = useState(60);
  const [panelOpen, setPanelOpen] = useState(true);
  const [announced, setAnnounced] = useState(false);
  const theme = themeById(themeId);

  useEffect(() => {
    setAnnounced(true);
  }, []);

  useTickSound(now, sound, volume);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void document.documentElement.requestFullscreen();
  }, []);

  return (
    <div
      className="clock-shell relative h-dvh w-full overflow-hidden"
      style={{
        backgroundColor: theme.bg,
        color: theme.ink,
        ["--bg" as string]: theme.bg,
        ["--ink" as string]: theme.ink,
        ["--muted" as string]: theme.muted,
        ["--pill" as string]: theme.pill,
        ["--grid" as string]: theme.grid,
      }}
    >
      {announced && now ? (
        <p className="sr-only" aria-live="polite">
          {now.toLocaleTimeString()}
        </p>
      ) : null}

      <div className="absolute inset-0 z-10">
        {face === "analog" ? (
          <AnalogFace
            now={now}
            ink={theme.ink}
            hub={theme.hub}
            mode={renderMode}
          />
        ) : (
          <DigitalFace now={now} ink={theme.ink} />
        )}
      </div>

      <Button
        variant="icon"
        className="absolute top-5 left-5 z-30 sm:top-6 sm:left-6"
        aria-label={panelOpen ? "Preferences" : "Show preferences"}
        onClick={() => setPanelOpen((value) => !value)}
      >
        <ChatIcon />
      </Button>

      <div className="absolute top-5 right-5 z-30 flex gap-2 sm:top-6 sm:right-6">
        <Button
          variant="icon"
          aria-label="Hide preferences"
          onClick={() => setPanelOpen(false)}
        >
          <CloseIcon />
        </Button>
        <Button
          variant="icon"
          aria-label="Toggle fullscreen"
          onClick={toggleFullscreen}
        >
          <ExpandIcon />
        </Button>
      </div>

      <PreferencesPanel
        open={panelOpen}
        face={face}
        renderMode={renderMode}
        themeId={themeId}
        sound={sound}
        volume={volume}
        onFaceChange={setFace}
        onRenderModeChange={setRenderMode}
        onThemeChange={setThemeId}
        onSoundChange={setSound}
        onVolumeChange={setVolume}
        now={now}
      />
    </div>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18.5 4 22l4-1.6c1 .4 2.1.6 3.3.6 5 0 9-3.6 9-8s-4-8-9-8-9 3.6-9 8c0 1.7.6 3.3 1.7 4.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4H4v5M15 4h5v5M9 20H4v-5M20 15v5h-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
