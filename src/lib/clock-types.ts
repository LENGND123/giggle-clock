export type FaceMode = "analog" | "digital";
export type SoundMode = "mute" | "system" | "watch";
export type RenderMode = "halftone" | "beads";
export type ThemeId = "snow" | "ink" | "mint" | "sun" | "sky";

export type Theme = {
  id: ThemeId;
  bg: string;
  ink: string;
  muted: string;
  pill: string;
  grid: string;
  hub: string;
  swatch: string;
};

export const THEMES: readonly Theme[] = [
  {
    id: "snow",
    bg: "#F4F1E8",
    ink: "#171717",
    muted: "#8A8678",
    pill: "#FFFFFF",
    grid: "rgba(24,22,16,0.16)",
    hub: "#E13A20",
    swatch: "#FFFFFF",
  },
  {
    id: "ink",
    bg: "#121212",
    ink: "#F4F1EA",
    muted: "#8D8D8D",
    pill: "#1F1F1F",
    grid: "rgba(255,255,255,0.14)",
    hub: "#FF4D2E",
    swatch: "#111111",
  },
  {
    id: "mint",
    bg: "#DEF0D4",
    ink: "#182018",
    muted: "#6F8468",
    pill: "#F5FBF1",
    grid: "rgba(24,40,20,0.16)",
    hub: "#E13A20",
    swatch: "#E7F6DC",
  },
  {
    id: "sun",
    bg: "#F2E85A",
    ink: "#1A1A12",
    muted: "#8A8A42",
    pill: "#FFFBDC",
    grid: "rgba(48,44,8,0.32)",
    hub: "#E13A20",
    swatch: "#F6ED6E",
  },
  {
    id: "sky",
    bg: "#D4EDF7",
    ink: "#152028",
    muted: "#6A8490",
    pill: "#F3FBFE",
    grid: "rgba(20,40,50,0.16)",
    hub: "#E13A20",
    swatch: "#D8F0FA",
  },
] as const;

export const RENDER_MODES: readonly RenderMode[] = ["halftone", "beads"] as const;

export const SUN_THEME = THEMES.find((theme) => theme.id === "sun") ?? {
  id: "sun" as const,
  bg: "#F2E85A",
  ink: "#1A1A12",
  muted: "#8A8A42",
  pill: "#FFFBDC",
  grid: "rgba(48,44,8,0.2)",
  hub: "#E13A20",
  swatch: "#F6ED6E",
};

export function themeById(id: ThemeId): Theme {
  return THEMES.find((theme) => theme.id === id) ?? SUN_THEME;
}

export function renderModeLabel(mode: RenderMode): string {
  switch (mode) {
    case "halftone":
      return "Halftone";
    case "beads":
      return "Beads";
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

export function soundModeLabel(mode: SoundMode): string {
  switch (mode) {
    case "mute":
      return "Mute";
    case "system":
      return "System";
    case "watch":
      return "Watch";
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}
