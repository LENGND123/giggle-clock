export type ClockMode = "hypnotic" | "tick" | "still";

export const CLOCK_MODES: readonly ClockMode[] = [
  "hypnotic",
  "tick",
  "still",
] as const;

export function modeLabel(mode: ClockMode): string {
  switch (mode) {
    case "hypnotic":
      return "Loop";
    case "tick":
      return "Tick";
    case "still":
      return "Still";
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}
