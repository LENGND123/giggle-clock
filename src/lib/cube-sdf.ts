export const FLIP_DURATION = 1.52;
export const TICK_DURATION = 0.72;
export const CUBE_COLOR = "#f4f1ea";
export const VOID_COLOR = "#0b0b0b";

const VIEW = norm(1, 1, 1);
const TUMBLE = norm(1, -1, 0);
const RIGHT = norm(...cross(VIEW, [0, 1, 0]));
const UP = norm(...cross(RIGHT, VIEW));

const HOLE_SPIN = (200 * Math.PI) / 180;
const HOLE_RADIUS = 0.7;
const HOLE_SHIFT: Vec3 = [
  RIGHT[0] * 0.14 + UP[0] * -0.05,
  RIGHT[1] * 0.14 + UP[1] * -0.05,
  RIGHT[2] * 0.14 + UP[2] * -0.05,
];

const BAKE_RES = 220;
const BAKE_FRAMES = 32;
const RAY_STEPS = 18;
const EXTENT = 0.88;

type Vec3 = [number, number, number];

function norm(x: number, y: number, z: number): Vec3 {
  const len = Math.hypot(x, y, z) || 1;
  return [x / len, y / len, z / len];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function rotateAround(p: Vec3, axis: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const d = dot(axis, p);
  return [
    p[0] * c + (axis[1] * p[2] - axis[2] * p[1]) * s + axis[0] * d * (1 - c),
    p[1] * c + (axis[2] * p[0] - axis[0] * p[2]) * s + axis[1] * d * (1 - c),
    p[2] * c + (axis[0] * p[1] - axis[1] * p[0]) * s + axis[2] * d * (1 - c),
  ];
}

function sdRoundBox(p: Vec3, half: number, radius: number): number {
  const hx = Math.abs(p[0]) - (half - radius);
  const hy = Math.abs(p[1]) - (half - radius);
  const hz = Math.abs(p[2]) - (half - radius);
  const ox = Math.max(hx, 0);
  const oy = Math.max(hy, 0);
  const oz = Math.max(hz, 0);
  return Math.hypot(ox, oy, oz) + Math.min(Math.max(hx, hy, hz), 0) - radius;
}

function sdEquilateralTriangle(px: number, py: number, r: number): number {
  const k = Math.sqrt(3);
  let x = Math.abs(px) - r;
  let y = py + r / k;
  if (x + k * y > 0) {
    const nx = (x - k * y) / 2;
    const ny = (-k * x - y) / 2;
    x = nx;
    y = ny;
  }
  x -= Math.max(-2 * r, Math.min(x, 0));
  return -Math.hypot(x, y) * Math.sign(y);
}

function rotateToY(p: Vec3): Vec3 {
  const axis = cross(VIEW, [0, 1, 0]);
  const axisLen = Math.hypot(axis[0], axis[1], axis[2]) || 1;
  const angle = Math.acos(Math.min(1, Math.max(-1, dot(VIEW, [0, 1, 0]))));
  return rotateAround(
    p,
    [axis[0] / axisLen, axis[1] / axisLen, axis[2] / axisLen],
    angle,
  );
}

function sdf(p: Vec3): number {
  const cube = sdRoundBox(p, 0.5, 0.085);
  const shifted: Vec3 = [
    p[0] - HOLE_SHIFT[0],
    p[1] - HOLE_SHIFT[1],
    p[2] - HOLE_SHIFT[2],
  ];
  const spun = rotateAround(shifted, VIEW, HOLE_SPIN);
  const aligned = rotateToY(spun);
  const hole = Math.max(
    sdEquilateralTriangle(aligned[0], aligned[2], HOLE_RADIUS),
    Math.abs(aligned[1]) - 1.2,
  );
  return Math.max(cube, -hole);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function visualPhase(phase: number): number {
  const wrapped = ((phase % 2) + 2) % 2;
  const base = Math.floor(wrapped);
  const frac = wrapped - base;
  return base + easeInOutCubic(frac);
}

export function tumbleAngle(phase: number): number {
  return visualPhase(phase) * Math.PI;
}

function sampleHit(u: number, v: number, angle: number): boolean {
  const origin: Vec3 = [
    u * RIGHT[0] + v * UP[0],
    u * RIGHT[1] + v * UP[1],
    u * RIGHT[2] + v * UP[2],
  ];
  let t = -1.6;
  for (let step = 0; step < RAY_STEPS; step += 1) {
    const world: Vec3 = [
      origin[0] + VIEW[0] * t,
      origin[1] + VIEW[1] * t,
      origin[2] + VIEW[2] * t,
    ];
    const local = rotateAround(world, TUMBLE, -angle);
    const d = sdf(local);
    if (d < 0.002) {
      return true;
    }
    t += Math.max(d, 0.014);
    if (t > 1.6) {
      return false;
    }
  }
  return false;
}

function renderOccupancy(angle: number): ImageData {
  const data = new ImageData(BAKE_RES, BAKE_RES);
  const pixels = data.data;
  for (let y = 0; y < BAKE_RES; y += 1) {
    const v = ((BAKE_RES - 1 - y) / (BAKE_RES - 1) - 0.5) * 2 * EXTENT;
    for (let x = 0; x < BAKE_RES; x += 1) {
      const u = (x / (BAKE_RES - 1) - 0.5) * 2 * EXTENT;
      const hit = sampleHit(u, v, angle);
      const i = (y * BAKE_RES + x) * 4;
      if (hit) {
        pixels[i] = 244;
        pixels[i + 1] = 241;
        pixels[i + 2] = 234;
        pixels[i + 3] = 255;
      } else {
        pixels[i] = 11;
        pixels[i + 1] = 11;
        pixels[i + 2] = 11;
        pixels[i + 3] = 255;
      }
    }
  }
  return data;
}

let bakedFrames: HTMLCanvasElement[] | null = null;

function getBakedFrames(): HTMLCanvasElement[] {
  if (bakedFrames) {
    return bakedFrames;
  }

  const frames: HTMLCanvasElement[] = [];
  for (let i = 0; i < BAKE_FRAMES; i += 1) {
    const angle = (i / BAKE_FRAMES) * Math.PI * 2;
    const canvas = document.createElement("canvas");
    canvas.width = BAKE_RES;
    canvas.height = BAKE_RES;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      throw new Error("Cube clock could not create a 2D canvas.");
    }
    ctx.putImageData(renderOccupancy(angle), 0, 0);
    frames.push(canvas);
  }

  bakedFrames = frames;
  return frames;
}

function frameIndex(phase: number): number {
  const turns = visualPhase(phase);
  return Math.round((turns / 2) * BAKE_FRAMES) % BAKE_FRAMES;
}

export function renderCubeFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  phase: number,
): void {
  const frames = getBakedFrames();
  const frame = frames[frameIndex(phase)];

  ctx.fillStyle = VOID_COLOR;
  ctx.fillRect(0, 0, width, height);

  if (!frame) {
    return;
  }

  const draw = Math.min(width, height) * 0.88;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(frame, (width - draw) / 2, (height - draw) / 2, draw, draw);
}
