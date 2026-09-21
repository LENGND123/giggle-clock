"use client";

import { formatTime } from "@/lib/utils";

type DigitalFaceProps = {
  now: Date | null;
  ink: string;
};

export function DigitalFace({ now, ink }: DigitalFaceProps) {
  const time = formatTime(now, false);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p
        className="font-display text-[18vw] leading-none tracking-[-0.06em] tabular-nums sm:text-[9rem]"
        style={{ color: ink }}
      >
        {time.hours}:{time.minutes}
        <span className="ml-4 align-top font-sans text-[4vw] tracking-[0.18em] opacity-50 sm:text-3xl">
          {time.seconds}
        </span>
      </p>
    </div>
  );
}
