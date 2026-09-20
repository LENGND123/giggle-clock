# Cube Clock

A tumbling white cube with a triangular hole, rebuilt from a short looping clip. It is a clock.

The object is a cube pierced along opposite vertices. From that angle it reads as a hexagon with a play-button triangle. Every half-turn you are looking through the other vertex. Time sits small at the bottom. The cube refuses to grow numerals.

## Run it

```bash
pnpm install
pnpm dev
```

Open [http://localhost:43147](http://localhost:43147).

## How to read it

Move the mouse (or tap) to show the controls.

- **Loop** — the cube tumbles continuously, matching the original clip.
- **Tick** — it flips once a second.
- **Still** — it waits. Click the cube to shove it through a half-turn.
- Toggle **12h / 24h** in the corner.

## Stack

Next.js and a software-rendered cube (no WebGL). No account, no backend.
