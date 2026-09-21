"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PlatformScene, TicketHand, TrainCar, TrainLayer } from "@/components/portfolio/drawings";
import {
  applyMotion,
  COMIC_MS,
  handPose,
  INK_SPLATS,
  MOTION_END,
  MOTION_IDLE,
  sampleComic,
  typedCount,
  type Beat,
  type ComicPhase,
} from "@/lib/comic-motion";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function useClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

const PLATFORM_CAPTION = "always drawing and building...";
const GO_CAPTION = "let's go somewhere good.";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HomeComic() {
  const now = useClock();
  const stageRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<ComicPhase>("idle");
  const playStartRef = useRef(0);
  const wheelRef = useRef(0);
  const trainXRef = useRef(86);
  const [beat, setBeat] = useState<Beat>("idle");
  const [caption, setCaption] = useState("");
  const [goCaption, setGoCaption] = useState("");

  const stamped = beat !== "idle" && beat !== "raising" && beat !== "pressing";
  const arriving = beat === "arriving" || beat === "arrived" || beat === "boarded";
  const arrived = beat === "arrived" || beat === "boarded";
  const boarded = beat === "boarded";
  const talking = arrived;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) {
      return;
    }

    const reduced = prefersReducedMotion();
    let raf = 0;
    let lastBeat: Beat = "idle";
    let lastCap = -1;
    let lastGo = -1;

    const tick = (frame: number) => {
      const phase = phaseRef.current;
      let motion = MOTION_IDLE;
      let ms = 0;

      if (phase === "idle") {
        wheelRef.current = 0;
        trainXRef.current = 86;
        motion = MOTION_IDLE;
      } else if (reduced) {
        motion = MOTION_END;
        phaseRef.current = "rest";
        ms = COMIC_MS.end;
      } else {
        ms = frame - playStartRef.current;
        motion = sampleComic(ms, wheelRef.current, trainXRef.current);
        wheelRef.current = motion.wheel;
        trainXRef.current = motion.trainX;
        if (ms >= COMIC_MS.end) {
          phaseRef.current = "rest";
        }
      }

      const hand = handPose(ms, frame, phaseRef.current);
      applyMotion(el, motion, hand);

      if (motion.beat !== lastBeat) {
        lastBeat = motion.beat;
        setBeat(motion.beat);
      }

      const capCount =
        phase === "idle" ? 0 : typedCount(PLATFORM_CAPTION, COMIC_MS.arriving + 180, ms, 22);
      const goCount =
        phase === "idle" ? 0 : typedCount(GO_CAPTION, COMIC_MS.boarded + 80, ms, 24);
      if (capCount !== lastCap) {
        lastCap = capCount;
        setCaption(PLATFORM_CAPTION.slice(0, capCount));
      }
      if (goCount !== lastGo) {
        lastGo = goCount;
        setGoCaption(GO_CAPTION.slice(0, goCount));
      }
    };

    const loop = (frame: number) => {
      tick(frame);
      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);
    let hiddenClock = 0;
    const onVis = () => {
      if (document.hidden) {
        window.clearInterval(hiddenClock);
        hiddenClock = window.setInterval(() => tick(performance.now()), 120);
        return;
      }
      window.clearInterval(hiddenClock);
      tick(performance.now());
    };
    document.addEventListener("visibilitychange", onVis);
    if (document.hidden) {
      onVis();
    }
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(hiddenClock);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const stamp = () => {
    if (phaseRef.current !== "idle") {
      return;
    }
    if (prefersReducedMotion()) {
      phaseRef.current = "rest";
      setBeat("boarded");
      setCaption(PLATFORM_CAPTION);
      setGoCaption(GO_CAPTION);
      return;
    }
    playStartRef.current = performance.now();
    wheelRef.current = 0;
    trainXRef.current = 86;
    phaseRef.current = "play";
    setBeat("raising");
  };

  const reset = () => {
    phaseRef.current = "idle";
    wheelRef.current = 0;
    trainXRef.current = 86;
    setBeat("idle");
    setCaption("");
    setGoCaption("");
  };

  const dateLabel = now
    ? now.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase()
    : "-- ---";
  const timeLabel = now
    ? `${pad(now.getHours() % 12 || 12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${now.getHours() >= 12 ? "PM" : "AM"}`
    : "--:--:-- --";

  return (
    <div className="home-stage" data-beat={beat} ref={stageRef}>
      <div className="row-top">
        <section className="panel panel-ticket" id="home">
          <span className="panel-num">01</span>
          <span className="impact-flash" />
          <div className="stamp-prompt-slot">
            <p className={`stamp-prompt${stamped ? " is-off" : ""}`}>CLICK TO STAMP</p>
            <p className={`stamp-prompt stamp-prompt--done${stamped ? " is-on" : ""}`}>
              you&apos;re boarded
            </p>
          </div>
          <button
            type="button"
            className={`ticket${beat === "pressing" || beat === "stamped" ? " is-hit" : ""}`}
            onClick={stamp}
            data-cursor="hot"
            aria-label="Stamp the ticket"
            disabled={beat !== "idle"}
          >
            <div className="ticket__route">
              HOME - PLAY
              <span className="ticket__round">ROUND TRIP</span>
            </div>
            <div className="ticket__grid">
              <div>
                <span className="ticket__k">Passenger</span>
                you!
              </div>
              <div>
                <span className="ticket__k">Today</span>
                {dateLabel}
              </div>
              <div>
                <span className="ticket__k">Now</span>
                {timeLabel}
                <div>GMT+5:30</div>
              </div>
            </div>
            <p className="ticket__note">aditya&apos;s 2026 portfolio</p>
            <span className={`stamp-mark${stamped ? " is-on" : ""}`}>
              VALID
              <br />
              AJMER
              <br />
              LINE
            </span>
            <span className={`stamp-bloom${beat === "pressing" || stamped ? " is-on" : ""}`} />
            <span className={`stamp-bloom stamp-bloom--late${stamped ? " is-on" : ""}`} />
            {INK_SPLATS.map((splat) => (
              <span
                key={`${splat.x}-${splat.y}`}
                className={`ink-splat${stamped ? " is-on" : ""}`}
                style={
                  {
                    width: splat.s,
                    height: splat.s,
                    animationDelay: splat.d,
                    "--dx": `${splat.x}px`,
                    "--dy": `${splat.y}px`,
                    "--rot": `${splat.r}deg`,
                  } as CSSProperties
                }
              />
            ))}
          </button>
          <TicketHand className="ticket-hand" />
          <button type="button" className={`reset-link${stamped ? " is-on" : ""}`} onClick={reset}>
            ↺ reset
          </button>
        </section>

        <section className={`panel panel-scene${arriving ? " is-live" : ""}`}>
          <PlatformScene className="scene-svg" looking={arriving} />
          <TrainLayer className={`layer-train${arriving ? " arrived" : ""}`} spinning={beat === "arriving"} />
          <p className={`speech speech--a${talking ? " is-on" : ""}`}>that was fast</p>
          <p className={`speech speech--b${boarded ? " is-on" : ""}`}>yippee</p>
          <p
            className={`caption-chip caption-chip--type${arriving && caption.length < PLATFORM_CAPTION.length ? " is-typing" : ""}`}
            style={{ right: 12, bottom: 12 }}
          >
            {caption || "\u00a0"}
          </p>
        </section>
      </div>

      <section className="panel panel-scene" style={{ flex: 0.9, minHeight: 220 }}>
        <TrainCar boarded={boarded} />
        <p
          className={`caption-chip caption-chip--type${boarded && goCaption.length < GO_CAPTION.length ? " is-typing" : ""}`}
          style={{ right: 12, bottom: 12 }}
        >
          {boarded ? goCaption || "\u00a0" : "the next car is empty. stamp in."}
        </p>
        <Link className={`board-btn${boarded ? " is-on" : ""}`} href="/work">
          Explore the portfolio →
        </Link>
      </section>
    </div>
  );
}
