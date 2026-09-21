type SvgProps = {
  className?: string;
};

const ink = "#1a52d4";

export function AvatarMark({ className }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="34" fill="white" />
      <circle cx="36" cy="36" r="33" stroke={ink} strokeWidth="1.6" />
      <path
        d="M22 48c3-10 9-16 14-16s11 6 14 16"
        stroke={ink}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="36" cy="30" r="9" stroke={ink} strokeWidth="1.6" />
      <path
        d="M27 31c2-6 6-9 9-9s7 3 9 9"
        stroke={ink}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M32 29.5h2M38 29.5h2" stroke={ink} strokeWidth="1.8" />
      <path d="M33 34c1.2 1.4 4.8 1.4 6 0" stroke={ink} strokeWidth="1.4" />
    </svg>
  );
}

export function WalkDoodle({ className }: SvgProps) {
  return (
    <svg
      className={className ? `walk-doodle ${className}` : "walk-doodle"}
      viewBox="0 0 180 90"
      fill="none"
      aria-hidden="true"
    >
      <g className="skyline" stroke="white" strokeWidth="1.4">
        <path d="M8 72V58h14v14" strokeOpacity="0.4" />
        <path d="M12 62h6" strokeOpacity="0.35" />
        <path d="M26 72V46h18v26" strokeOpacity="0.45" />
        <path d="M30 52h10M30 58h10M30 64h10" strokeOpacity="0.32" />
        <path d="M48 72V54h12l10-10v28" strokeOpacity="0.4" />
        <path d="M116 72V50h20v22" strokeOpacity="0.42" />
        <path d="M120 56h12M120 62h12" strokeOpacity="0.32" />
        <path d="M140 72V42h18v30" strokeOpacity="0.48" />
        <path d="M144 48h10M144 56h10M144 64h10" strokeOpacity="0.3" />
        <path d="M162 72V58h12v14" strokeOpacity="0.38" />
      </g>
      <path d="M4 72.5h172" stroke="white" strokeOpacity="0.55" />
      <g className="walker">
        <g className="walker-bob">
          <g transform="translate(24 40)">
            <g className="walker-arm walker-arm--back">
              <path d="M0 0l-8 12" stroke="white" strokeLinecap="round" />
            </g>
          </g>
          <path
            className="walker-hair"
            d="M16 20c5-9 18-9 22 2"
            stroke="white"
            strokeLinecap="round"
          />
          <circle cx="26" cy="24" r="8" stroke="white" />
          <path d="M23 23.5h2.2M28.5 23.5h2.2" stroke="white" strokeWidth="1.7" />
          <path d="M26 32v16" stroke="white" />
          <path d="M18 40c7 11 16 11 20 1" stroke="white" strokeOpacity="0.75" />
          <g transform="translate(28 40)">
            <g className="walker-arm walker-arm--front">
              <path d="M0 0l9 11" stroke="white" strokeLinecap="round" />
            </g>
          </g>
        </g>
        <g transform="translate(26 48)">
          <g className="walker-leg walker-leg--back">
            <path d="M0 0l-9 20" stroke="white" strokeLinecap="round" />
          </g>
        </g>
        <g transform="translate(26 48)">
          <g className="walker-leg walker-leg--front">
            <path d="M0 0l11 18" stroke="white" strokeLinecap="round" />
          </g>
        </g>
        <g className="walker-dust">
          <circle cx="16" cy="70" r="1.4" fill="white" fillOpacity="0.45" />
          <circle cx="22" cy="71" r="1" fill="white" fillOpacity="0.35" />
        </g>
      </g>
    </svg>
  );
}

export function TicketHand({ className }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M148 96c18 6 38 28 42 48 3 16-2 32-16 40-18 10-40 6-54-4"
        fill="white"
        stroke={ink}
        strokeWidth="1.8"
      />
      <path
        d="M92 128c-8 22-4 48 14 62 14 10 34 12 52 4 16-8 28-24 30-42"
        fill="white"
        stroke={ink}
        strokeWidth="1.8"
      />
      <path
        d="M118 104c6 18 8 38 2 54"
        stroke={ink}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M138 118c4 16 4 34-2 48"
        stroke={ink}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M86 138c-18 6-30 22-28 38 2 14 16 24 32 22"
        fill="white"
        stroke={ink}
        strokeWidth="1.8"
      />
      <g className="stamp-pad">
        <circle cx="168" cy="62" r="34" fill="#e8c4b6" stroke={ink} strokeWidth="1.8" />
        <circle cx="168" cy="62" r="24" fill="#f7ddd4" stroke={ink} strokeWidth="1.3" />
        <circle cx="168" cy="62" r="11" fill={ink} fillOpacity="0.12" stroke={ink} />
        <path d="M168 40v8M168 76v8M146 62h8M182 62h8" stroke={ink} />
        <circle className="pad-ink" cx="168" cy="62" r="7" fill="#c24a32" fillOpacity="0.35" />
      </g>
    </svg>
  );
}

export function PlatformScene({
  className,
  looking,
}: SvgProps & { looking?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 360"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="640" height="360" fill="white" />
      <path d="M0 268h640" stroke={ink} strokeWidth="1.7" />
      <path d="M0 276h640" stroke={ink} strokeWidth="0.8" opacity="0.35" />
      <rect x="48" y="18" width="22" height="250" stroke={ink} strokeWidth="1.6" />
      <rect x="36" y="8" width="46" height="26" rx="2" stroke={ink} />
      <path d="M44 21h30" stroke={ink} />
      <rect x="92" y="70" width="16" height="36" stroke={ink} />
      <path d="M100 70v-18" stroke={ink} />
      <rect x="168" y="96" width="210" height="86" stroke={ink} />
      <path d="M168 139h210M238 96v86M308 96v86" stroke={ink} />
      <rect x="390" y="96" width="92" height="86" stroke={ink} />
      <rect x="494" y="64" width="128" height="118" stroke={ink} />
      <path d="M494 108h128M558 64v118" stroke={ink} />
      <rect x="214" y="48" width="38" height="22" rx="2" stroke={ink} />
      <path d="M222 59h22M233 52v14" stroke={ink} />
      <g transform="translate(300,176)">
        <g className={`platform-person${looking ? " is-looking" : ""}`}>
          <g className="person-body">
            <circle cx="18" cy="12" r="9" stroke={ink} strokeWidth="1.6" />
            <path d="M12 11c3.5-7 10.5-7 14 0" stroke={ink} />
            <path d="M18 21v32M8 38h20" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
            <path d="M10 34c6 12 16 12 22 0" stroke={ink} opacity="0.45" />
          </g>
          <g className="person-leg person-leg--l" transform="translate(18 53)">
            <path d="M0 0l-9 20" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g className="person-leg person-leg--r" transform="translate(18 53)">
            <path d="M0 0l11 20" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <g className="walk-dust" opacity="0.45">
            <circle className="dust-dot" cx="8" cy="74" r="1.6" fill={ink} />
            <circle className="dust-dot dust-dot--b" cx="28" cy="76" r="1.2" fill={ink} />
          </g>
        </g>
      </g>
      <path d="M8 300h70M12 312h40" stroke={ink} opacity="0.35" />
      <rect x="14" y="286" width="54" height="28" stroke={ink} opacity="0.45" />
    </svg>
  );
}

export function TrainLayer({
  className,
  spinning,
}: SvgProps & { spinning?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 820 360"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className={`train-body${spinning ? " is-spinning" : ""}`} stroke={ink} strokeWidth="1.8">
        <g className="steam">
          <circle className="steam-puff" cx="92" cy="64" r="8" fill="white" />
          <circle className="steam-puff steam-puff--b" cx="108" cy="50" r="6" fill="white" />
          <circle className="steam-puff steam-puff--c" cx="78" cy="48" r="5" fill="white" />
        </g>
        <path d="M70 86h560l90 48v108H48V132z" fill="white" />
        <path d="M48 240h672" />
        <ellipse className="headlight" cx="718" cy="156" rx="16" ry="9" fill="#1a52d4" fillOpacity="0.18" stroke="none" />
        <rect x="110" y="112" width="118" height="72" fill="#e7eeff" />
        <rect x="244" y="112" width="118" height="72" fill="#e7eeff" />
        <rect x="378" y="112" width="118" height="72" fill="#e7eeff" />
        <rect x="512" y="112" width="118" height="72" fill="#e7eeff" />
        <path d="M110 148h118M244 148h118M378 148h118M512 148h118" />
        <g className="train-doors">
          <rect className="door-l" x="430" y="116" width="22" height="86" fill="white" />
          <rect className="door-r" x="452" y="116" width="22" height="86" fill="white" />
        </g>
        <rect x="132" y="214" width="64" height="18" rx="2" fill="#1a52d4" stroke="white" />
        <g transform="translate(168 268)">
          <g className="train-wheel">
            <circle r="16" fill="white" />
            <path d="M-10 0h20M0 -10v20" />
          </g>
        </g>
        <g transform="translate(364 268)">
          <g className="train-wheel">
            <circle r="16" fill="white" />
            <path d="M-10 0h20M0 -10v20" />
          </g>
        </g>
        <g transform="translate(560 268)">
          <g className="train-wheel">
            <circle r="16" fill="white" />
            <path d="M-10 0h20M0 -10v20" />
          </g>
        </g>
        <path d="M70 86l24-28h180" />
        <path className="speed-line" d="M20 120h40M8 148h48M28 176h36M4 100h32M16 200h28" />
      </g>
      <text x="169" y="156" textAnchor="middle" fill={ink} fontSize="13" fontFamily="monospace">
        CLOCK
      </text>
      <text x="303" y="156" textAnchor="middle" fill={ink} fontSize="13" fontFamily="monospace">
        CHAT
      </text>
      <text x="437" y="156" textAnchor="middle" fill={ink} fontSize="13" fontFamily="monospace">
        WARD
      </text>
      <text x="571" y="156" textAnchor="middle" fill={ink} fontSize="13" fontFamily="monospace">
        WHEEL
      </text>
    </svg>
  );
}

export function TrainCar({ boarded }: { boarded: boolean }) {
  return (
    <svg
      className="scene-svg"
      viewBox="0 0 1100 320"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="1100" height="320" fill="white" />
      <path d="M0 36h1100" stroke={ink} strokeWidth="1.6" />
      <path d="M0 50h1100" stroke={ink} strokeWidth="1.2" />
      <path d="M36 36v250M368 36v250M732 36v250M1064 36v250" stroke={ink} />
      <path d="M0 246h1100" stroke={ink} strokeWidth="1.7" />
      <path
        d="M56 246c36-62 108-62 148 0"
        stroke={ink}
        strokeWidth="1.6"
        fill="#eef3ff"
      />
      <path
        d="M780 246c36-62 108-62 148 0"
        stroke={ink}
        strokeWidth="1.6"
        fill="#eef3ff"
      />
      <defs>
        <clipPath id="car-windows">
          <rect x="64" y="66" width="268" height="92" />
          <rect x="396" y="66" width="300" height="92" />
          <rect x="764" y="66" width="268" height="92" />
        </clipPath>
      </defs>
      <rect x="64" y="66" width="268" height="92" stroke={ink} fill="#f7f9ff" />
      <rect x="396" y="66" width="300" height="92" stroke={ink} fill="#f7f9ff" />
      <rect x="764" y="66" width="268" height="92" stroke={ink} fill="#f7f9ff" />
      <g className="car-scenery" clipPath="url(#car-windows)">
        <rect x="40" y="78" width="36" height="70" fill="#dfe8ff" />
        <rect x="90" y="88" width="28" height="60" fill="#cfdcff" />
        <rect x="150" y="72" width="48" height="76" fill="#e7eeff" />
        <rect x="230" y="84" width="32" height="64" fill="#d4dffc" />
        <rect x="420" y="76" width="44" height="72" fill="#dfe8ff" />
        <rect x="490" y="90" width="36" height="58" fill="#cfdcff" />
        <rect x="560" y="70" width="52" height="78" fill="#e7eeff" />
        <rect x="800" y="80" width="40" height="68" fill="#d4dffc" />
        <rect x="860" y="72" width="56" height="76" fill="#dfe8ff" />
        <rect x="940" y="88" width="30" height="60" fill="#cfdcff" />
      </g>
      <path d="M64 112h268M396 112h300M764 112h268" stroke={ink} />
      <rect x="84" y="80" width="58" height="20" fill={ink} />
      <text x="113" y="94" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace">
        CHAT
      </text>
      <rect x="430" y="80" width="78" height="20" fill={ink} />
      <text x="469" y="94" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace">
        GIGGLE
      </text>
      <rect x="790" y="80" width="70" height="20" fill={ink} />
      <text x="825" y="94" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace">
        WARD 3
      </text>
      <circle cx="200" cy="96" r="11" stroke={ink} />
      <path d="M200 88v16M192 96h16" stroke={ink} />
      <g className="strap" transform="translate(544 50)">
        <path d="M0 0v28" stroke={ink} />
        <path d="M-6 28h12" stroke={ink} strokeLinecap="round" />
      </g>
      <g className={`passenger${boarded ? " is-in" : ""}`}>
        <g className="passenger-body">
          <circle cx="544" cy="182" r="12" stroke={ink} strokeWidth="1.7" />
          <path d="M536 180c5-8 14-8 18 0" stroke={ink} />
          <path d="M539 181h3M548 181h3" stroke={ink} strokeWidth="1.8" />
          <path
            d="M544 194c-14 4-18 18-16 38l-8 34M544 194c14 4 18 18 16 38l10 34M526 216h36"
            stroke={ink}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function StationEnd({ className }: SvgProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 160"
      fill="none"
      aria-hidden="true"
    >
      <path d="M20 130h480" stroke="white" strokeOpacity="0.7" />
      <path d="M80 130V70h200v60" stroke="white" />
      <path d="M70 70h220" stroke="white" />
      <path d="M80 70l20-22h160l20 22" stroke="white" />
      <rect x="164" y="78" width="54" height="18" stroke="white" />
      <text
        x="191"
        y="91"
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontFamily="monospace"
      >
        END
      </text>
      <path d="M100 130v-28h28v28M150 130v-28h28v28" stroke="white" />
      <rect x="300" y="88" width="28" height="42" stroke="white" />
      <circle cx="360" cy="126" r="8" stroke="white" />
      <path d="M354 124c4-2 8-2 12 0" stroke="white" />
      <path d="M348 130h24" stroke="white" />
      <rect x="400" y="70" width="14" height="60" stroke="white" />
      <circle cx="407" cy="58" r="8" stroke="white" />
    </svg>
  );
}

export function ClockCover() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" aria-hidden="true">
      <rect width="480" height="360" fill="#eef3ff" />
      <circle cx="240" cy="170" r="110" fill="white" stroke={ink} strokeWidth="2" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = ((i - 15) * Math.PI) / 30;
        const inner = i % 5 === 0 ? 88 : 98;
        return (
          <circle
            key={i}
            cx={240 + Math.cos(a) * inner}
            cy={170 + Math.sin(a) * inner}
            r={i % 5 === 0 ? 3.2 : 1.6}
            fill={ink}
          />
        );
      })}
      <line
        x1="240"
        y1="170"
        x2="240"
        y2="110"
        stroke={ink}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="240"
        y1="170"
        x2="300"
        y2="190"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="240" cy="170" r="6" fill={ink} />
      <text
        x="240"
        y="318"
        textAnchor="middle"
        fill={ink}
        fontSize="18"
        fontFamily="serif"
      >
        giggle clock
      </text>
    </svg>
  );
}

export function ChatCover() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" fill="none" aria-hidden="true">
      <rect width="480" height="360" fill="#dfe8ff" />
      <rect x="40" y="40" width="400" height="260" rx="8" fill="white" stroke={ink} />
      <rect x="40" y="40" width="400" height="42" fill={ink} />
      <text x="60" y="67" fill="white" fontSize="16" fontFamily="monospace">
        InstaChat
      </text>
      <rect x="70" y="110" width="180" height="36" rx="4" fill="#eef3ff" stroke={ink} />
      <rect x="230" y="160" width="170" height="36" rx="4" fill={ink} fillOpacity="0.12" stroke={ink} />
      <rect x="70" y="210" width="140" height="36" rx="4" fill="#eef3ff" stroke={ink} />
      <circle cx="400" cy="61" r="8" fill="white" />
    </svg>
  );
}

export function WardCover() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" fill="none" aria-hidden="true">
      <rect width="480" height="360" fill="#eef3ff" />
      <rect x="50" y="70" width="160" height="90" fill="white" stroke={ink} />
      <rect x="250" y="70" width="160" height="90" fill="white" stroke={ink} />
      <rect x="50" y="190" width="160" height="90" stroke={ink} fill={ink} fillOpacity="0.08" />
      <rect x="250" y="190" width="160" height="90" fill="white" stroke={ink} />
      <path d="M70 115h120M270 115h120M70 235h120M270 235h120" stroke={ink} />
      <text x="130" y="100" textAnchor="middle" fill={ink} fontSize="12" fontFamily="monospace">
        BED 01
      </text>
      <text x="330" y="100" textAnchor="middle" fill={ink} fontSize="12" fontFamily="monospace">
        BED 02
      </text>
      <text x="130" y="220" textAnchor="middle" fill={ink} fontSize="12" fontFamily="monospace">
        OPEN
      </text>
    </svg>
  );
}

export function WheelCover() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full" fill="none" aria-hidden="true">
      <rect width="480" height="360" fill="#d9e4ff" />
      <circle cx="240" cy="180" r="110" fill="white" stroke={ink} strokeWidth="2" />
      <circle cx="240" cy="180" r="70" stroke={ink} />
      <circle cx="240" cy="180" r="18" fill={ink} fillOpacity="0.12" stroke={ink} />
      <path d="M240 70v40M240 250v40M130 180h40M310 180h40" stroke={ink} />
      <path d="M160 110c30 20 40 40 40 70" stroke={ink} />
      <circle cx="150" cy="250" r="16" stroke={ink} />
      <circle cx="330" cy="250" r="16" stroke={ink} />
    </svg>
  );
}

export function AboutDiorama() {
  return (
    <svg viewBox="0 0 360 280" className="h-full w-full" fill="none" aria-hidden="true">
      <rect width="360" height="280" fill="white" />
      <path d="M40 240h280" stroke={ink} />
      <rect x="70" y="90" width="180" height="150" fill="#f7f9ff" stroke={ink} />
      <path d="M70 90l40-36h180l-40 36" stroke={ink} />
      <rect x="250" y="54" width="80" height="150" fill="#eef3ff" stroke={ink} />
      <rect x="110" y="130" width="70" height="50" fill="white" stroke={ink} />
      <rect x="200" y="150" width="30" height="90" fill="white" stroke={ink} />
      <rect x="118" y="70" width="54" height="16" fill={ink} />
      <text x="145" y="82" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">
        ABOUT
      </text>
      <circle cx="96" cy="196" r="8" stroke={ink} />
      <path d="M96 204v24l-6 12M96 228l8 12M88 214h16" stroke={ink} />
    </svg>
  );
}

export function PlayGate() {
  return (
    <svg viewBox="0 0 520 240" className="h-full w-full" fill="none" aria-hidden="true">
      <rect width="520" height="240" fill="white" />
      <rect x="80" y="70" width="360" height="130" stroke={ink} />
      <path d="M80 70l360 130M440 70L80 200" stroke={ink} />
      <rect x="210" y="36" width="100" height="22" stroke={ink} />
      <text x="260" y="52" textAnchor="middle" fill={ink} fontSize="11" fontFamily="monospace">
        STOP 4.04
      </text>
      <text
        x="260"
        y="140"
        textAnchor="middle"
        fill={ink}
        fontSize="14"
        fontFamily="monospace"
      >
        UNDER CONSTRUCTION
      </text>
      <g transform="translate(120,148)">
        <circle cx="16" cy="10" r="8" stroke={ink} />
        <path d="M16 18v28l-7 16M16 46l9 16M8 32h16" stroke={ink} />
      </g>
      <rect x="400" y="86" width="36" height="28" stroke={ink} />
      <text x="418" y="104" textAnchor="middle" fill={ink} fontSize="10" fontFamily="monospace">
        PLAY
      </text>
    </svg>
  );
}

export function DoodleBuddy() {
  return (
    <svg width="86" height="70" viewBox="0 0 86 70" fill="none" aria-hidden="true">
      <circle cx="48" cy="22" r="14" stroke={ink} />
      <path d="M38 20c6-10 16-10 22 0" stroke={ink} />
      <path d="M42 22h3M51 22h3" stroke={ink} strokeWidth="1.8" />
      <path d="M20 68c8-22 16-28 28-28 14 0 24 10 30 28" stroke={ink} />
      <path d="M28 44c8 0 12-8 12-8" stroke={ink} />
    </svg>
  );
}

export function WorkCover({ kind }: { kind: "clock" | "chat" | "ward" | "wheel" }) {
  switch (kind) {
    case "clock":
      return <ClockCover />;
    case "chat":
      return <ChatCover />;
    case "ward":
      return <WardCover />;
    case "wheel":
      return <WheelCover />;
    default: {
      const _never: never = kind;
      return _never;
    }
  }
}
