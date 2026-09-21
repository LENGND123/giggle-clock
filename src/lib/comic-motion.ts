export type Beat =
  | "idle"
  | "raising"
  | "pressing"
  | "stamped"
  | "arriving"
  | "arrived"
  | "boarded";

export type ComicPhase = "idle" | "play" | "rest";

export type Vec = {
  x: number;
  y: number;
  r: number;
};

export type ComicMotion = {
  beat: Beat;
  trainX: number;
  personX: number;
  walking: boolean;
  wheel: number;
  scenery: number;
  steam: number;
  door: number;
  speed: number;
  shakeX: number;
  shakeY: number;
  impact: number;
};

export const COMIC_MS = {
  pressing: 240,
  stamped: 430,
  arriving: 980,
  arrived: 2920,
  boarded: 3580,
  end: 4400,
} as const;

export const MOTION_IDLE: ComicMotion = {
  beat: "idle",
  trainX: 86,
  personX: 0,
  walking: false,
  wheel: 0,
  scenery: 0,
  steam: 0,
  door: 0,
  speed: 0,
  shakeX: 0,
  shakeY: 0,
  impact: 0,
};

export const MOTION_END: ComicMotion = {
  beat: "boarded",
  trainX: 2,
  personX: 64,
  walking: false,
  wheel: 720,
  scenery: -46,
  steam: 0.18,
  door: 1,
  speed: 0,
  shakeX: 0,
  shakeY: 0,
  impact: 0,
};

export const INK_SPLATS = [
  { x: 14, y: -10, s: 6, d: "0ms", r: -18 },
  { x: 26, y: 8, s: 4, d: "28ms", r: 22 },
  { x: -8, y: 12, s: 3, d: "48ms", r: -40 },
  { x: 18, y: 20, s: 5, d: "16ms", r: 8 },
  { x: -12, y: -6, s: 3.5, d: "62ms", r: 30 },
  { x: 8, y: -16, s: 2.5, d: "80ms", r: -12 },
  { x: 30, y: -4, s: 3, d: "36ms", r: 14 },
  { x: -2, y: 18, s: 2, d: "94ms", r: -24 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInCubic(t: number) {
  return t * t * t;
}

function easeOutQuint(t: number) {
  return 1 - (1 - t) ** 5;
}

function mix(a: Vec, b: Vec, t: number): Vec {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    r: lerp(a.r, b.r, t),
  };
}

function beatAt(ms: number): Beat {
  if (ms < COMIC_MS.pressing) {
    return "raising";
  }
  if (ms < COMIC_MS.stamped) {
    return "pressing";
  }
  if (ms < COMIC_MS.arriving) {
    return "stamped";
  }
  if (ms < COMIC_MS.arrived) {
    return "arriving";
  }
  if (ms < COMIC_MS.boarded) {
    return "arrived";
  }
  return "boarded";
}

export function sampleComic(
  ms: number,
  prevWheel: number,
  prevTrainX: number,
): ComicMotion {
  const beat = beatAt(ms);

  let trainX = 86;
  if (ms >= COMIC_MS.arriving) {
    const span = COMIC_MS.arrived - COMIC_MS.arriving;
    const u = clamp((ms - COMIC_MS.arriving) / span, 0, 1);
    if (u < 0.78) {
      trainX = lerp(86, -6, easeOutQuint(u / 0.78));
    } else {
      trainX = lerp(-6, 2, easeOutCubic((u - 0.78) / 0.22));
    }
  }

  const dx = prevTrainX - trainX;
  const wheel = prevWheel + dx * 16.5;
  const speed = clamp(Math.abs(dx) * 7.5, 0, 1);

  let personX = 0;
  let walking = false;
  if (ms >= COMIC_MS.arriving) {
    const u = clamp((ms - COMIC_MS.arriving) / 1680, 0, 1);
    personX = lerp(0, 64, easeOutCubic(u));
    walking = u > 0.04 && u < 0.98;
  }

  let scenery = 0;
  if (ms >= COMIC_MS.arriving) {
    const u = clamp((ms - COMIC_MS.arriving) / 2500, 0, 1);
    scenery = lerp(0, -48, easeOutCubic(u));
  }

  let steam = 0;
  if (ms >= COMIC_MS.arriving) {
    const u = clamp((ms - COMIC_MS.arriving) / (COMIC_MS.arrived - COMIC_MS.arriving), 0, 1);
    steam = u > 0.62 ? (u - 0.62) / 0.38 : u * 0.12;
    if (ms > COMIC_MS.arrived) {
      steam = clamp(1 - (ms - COMIC_MS.arrived) / 1100, 0.14, 1);
    }
  }

  const door = clamp((ms - COMIC_MS.arrived) / 380, 0, 1);

  let shakeX = 0;
  let shakeY = 0;
  let impact = 0;
  if (ms >= COMIC_MS.pressing && ms < COMIC_MS.pressing + 300) {
    const u = (ms - COMIC_MS.pressing) / 300;
    const amp = (1 - u) ** 2 * 3.6;
    shakeX = Math.sin(u * 46) * amp;
    shakeY = Math.cos(u * 38) * amp * 0.55;
    impact = Math.sin(Math.min(1, u * 1.8) * Math.PI);
  }

  return {
    beat,
    trainX,
    personX,
    walking,
    wheel,
    scenery,
    steam,
    door,
    speed,
    shakeX,
    shakeY,
    impact,
  };
}

export function handPose(ms: number, now: number, phase: ComicPhase): Vec {
  if (phase === "idle") {
    const bob = (Math.sin(now / 430) + 1) / 2;
    return { x: -6.5 * bob, y: -8.5 * bob, r: -3.8 * bob };
  }

  const raised: Vec = { x: 22, y: 26, r: 16 };
  const slam: Vec = { x: -54, y: -76, r: -21 };
  const rest: Vec = { x: -16, y: -12, r: -7 };

  if (phase === "rest" || ms >= COMIC_MS.stamped + 560) {
    return rest;
  }
  if (ms < COMIC_MS.pressing) {
    return mix({ x: 0, y: 0, r: 0 }, raised, easeOutCubic(clamp(ms / COMIC_MS.pressing, 0, 1)));
  }
  if (ms < COMIC_MS.stamped) {
    const u = clamp((ms - COMIC_MS.pressing) / (COMIC_MS.stamped - COMIC_MS.pressing), 0, 1);
    return mix(raised, slam, easeInCubic(u));
  }
  const settle = clamp((ms - COMIC_MS.stamped) / 560, 0, 1);
  return mix(slam, rest, easeOutCubic(settle));
}

export function typedCount(text: string, startMs: number, nowMs: number, charMs: number) {
  if (nowMs < startMs) {
    return 0;
  }
  return Math.min(text.length, Math.floor((nowMs - startMs) / charMs) + 1);
}

export function applyMotion(el: HTMLElement, motion: ComicMotion, hand: Vec) {
  el.style.setProperty("--train-x", `${motion.trainX}%`);
  el.style.setProperty("--person-x", `${motion.personX}px`);
  el.style.setProperty("--wheel-rot", `${motion.wheel}deg`);
  el.style.setProperty("--scenery-x", `${motion.scenery}px`);
  el.style.setProperty("--steam", `${motion.steam}`);
  el.style.setProperty("--door", `${motion.door}`);
  el.style.setProperty("--speed", `${motion.speed}`);
  el.style.setProperty("--shake-x", `${motion.shakeX}px`);
  el.style.setProperty("--shake-y", `${motion.shakeY}px`);
  el.style.setProperty("--impact", `${motion.impact}`);
  el.style.setProperty("--hand-x", `${hand.x}px`);
  el.style.setProperty("--hand-y", `${hand.y}px`);
  el.style.setProperty("--hand-r", `${hand.r}deg`);
  el.dataset.walking = motion.walking ? "1" : "0";
}
