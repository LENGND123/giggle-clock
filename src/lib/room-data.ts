export const WORLD = {
  w: 3480,
  h: 540,
  floor: 418,
} as const;

export type PanelId = "work" | "about" | "play" | "stuff" | "menu" | null;

export type RoomObject = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  walkX: number;
  lines: string[];
  stuff?: string;
  panel?: Exclude<PanelId, null>;
};

export const ROOM_OBJECTS: RoomObject[] = [
  {
    id: "bed",
    label: "the cot",
    x: 48,
    y: 268,
    w: 310,
    h: 150,
    walkX: 220,
    lines: [
      "Unmade on purpose. Best ideas show up between compile errors and 2am.",
      "The other cat claimed the pillow. I pay rent. She pays in fur.",
    ],
    stuff: "unmade cot",
  },
  {
    id: "window",
    label: "the window",
    x: 40,
    y: 92,
    w: 360,
    h: 168,
    walkX: 200,
    lines: [
      "Ajmer at night. Platform lights, tea stalls, a moon that does not care about my deadlines.",
      "I built most of this portfolio after the trains stopped running.",
    ],
    stuff: "ajmer night",
  },
  {
    id: "tv",
    label: "the little television",
    x: 430,
    y: 268,
    w: 118,
    h: 86,
    walkX: 490,
    lines: [
      "Static, mostly. Sometimes I plug in a doodle and pretend it is a broadcast.",
      "Play lives here if you want to draw on it.",
    ],
    stuff: "crt television",
    panel: "play",
  },
  {
    id: "phone",
    label: "the red phone",
    x: 560,
    y: 292,
    w: 70,
    h: 48,
    walkX: 590,
    lines: [
      "It still rings like a cartoon. If you want to actually reach me, mail is kinder.",
      "sadityaraj369@gmail.com — I answer humans, not recruiters who say 'synergy'.",
    ],
    stuff: "red phone",
  },
  {
    id: "dresser",
    label: "the dresser",
    x: 410,
    y: 318,
    w: 250,
    h: 100,
    walkX: 520,
    lines: [
      "Drawers full of chargers that belong to no living device.",
      "Also: one lava lamp, because every studio needs a bad idea that glows.",
    ],
    stuff: "lava lamp",
  },
  {
    id: "wardrobe",
    label: "the wardrobe",
    x: 780,
    y: 148,
    w: 210,
    h: 270,
    walkX: 890,
    lines: [
      "Internship shirts, a hoodie that has seen three companies, and a box labeled CABLES? on top.",
      "CodSoft, Cognifyz, Saiket — the clothes remember even when LinkedIn forgets.",
    ],
    stuff: "internship hoodie",
    panel: "about",
  },
  {
    id: "poster-vaughan",
    label: "the comet poster",
    x: 690,
    y: 168,
    w: 78,
    h: 118,
    walkX: 730,
    lines: [
      "Not a band poster. A reminder that some projects look like a rock on fire until they land.",
      "The AI steering wheel started as a joke in a lab. Then my hands were the wheel.",
    ],
    stuff: "comet poster",
  },
  {
    id: "cabinet",
    label: "the green cabinet",
    x: 1120,
    y: 248,
    w: 168,
    h: 170,
    walkX: 1200,
    lines: [
      "Filed under intern: Python, web, a to-do list manager that actually ships.",
      "B.Tech CSE · AI & ML. The cabinet is greener than my terminal.",
    ],
    stuff: "green cabinet",
    panel: "about",
  },
  {
    id: "typewriter",
    label: "the typewriter",
    x: 1168,
    y: 214,
    w: 92,
    h: 36,
    walkX: 1210,
    lines: [
      "Case notes get typed here. Clocks, chat rooms, hospital beds, hands-as-wheels.",
      "I write the sentence before I write the function. Usually.",
    ],
    stuff: "typewriter",
  },
  {
    id: "neon",
    label: "the sign",
    x: 1380,
    y: 118,
    w: 340,
    h: 70,
    walkX: 1540,
    lines: [
      "aditya.dev — I painted it on the wall so I had to live up to the domain.",
      "I care about software that feels fun. That is the whole thesis.",
    ],
    stuff: "neon sign",
  },
  {
    id: "fox",
    label: "the fox print",
    x: 1398,
    y: 198,
    w: 78,
    h: 96,
    walkX: 1436,
    lines: [
      "A fox I drew and then took too seriously. Looks like it knows about my git history.",
    ],
    stuff: "fox print",
  },
  {
    id: "sunset",
    label: "the sunset",
    x: 1490,
    y: 208,
    w: 78,
    h: 86,
    walkX: 1528,
    lines: [
      "Rajasthan evenings. The sky does gradients without a design system.",
    ],
    stuff: "sunset study",
  },
  {
    id: "cork",
    label: "the corkboard",
    x: 1688,
    y: 156,
    w: 200,
    h: 150,
    walkX: 1780,
    lines: [
      "TODO: ship. TODO: sleep. TODO: stop adding TODOs.",
      "Pink notes are the ones that actually shipped. Yellow ones are wishes.",
    ],
    stuff: "corkboard",
    panel: "work",
  },
  {
    id: "grid-poster",
    label: "the grid poster",
    x: 1910,
    y: 168,
    w: 88,
    h: 128,
    walkX: 1954,
    lines: [
      "NEON RUNNER — a fake film for a real habit: I like interfaces that glow at 1am.",
    ],
    stuff: "neon runner poster",
  },
  {
    id: "desk",
    label: "the workstation",
    x: 2148,
    y: 248,
    w: 300,
    h: 170,
    walkX: 2280,
    lines: [
      "This is where Giggle Clock started — beads instead of numbers, yellow paper, a tick you can mute.",
      "InstaChat, bed allocation, the steering wheel. All of them sat on this desk first.",
    ],
    stuff: "workstation",
    panel: "work",
  },
  {
    id: "monitor",
    label: "the terminal",
    x: 2328,
    y: 168,
    w: 150,
    h: 110,
    walkX: 2400,
    lines: [
      "while (true) { catch(rest); blow(); }",
      "Open a repo if you want the boring version of this room.",
    ],
    stuff: "green terminal",
    panel: "work",
  },
  {
    id: "clock",
    label: "the bead clock",
    x: 2160,
    y: 272,
    w: 54,
    h: 54,
    walkX: 2190,
    lines: [
      "A clock made of beads, not numbers. Analog time as a field of dots.",
      "Click WORK if you want the case notes. The tick is optional. The fun is not.",
    ],
    stuff: "giggle clock",
    panel: "work",
  },
  {
    id: "shelf",
    label: "the high shelf",
    x: 2588,
    y: 118,
    w: 150,
    h: 70,
    walkX: 2660,
    lines: [
      "Books I pretend I finished. One of them is actually about OpenCV.",
    ],
    stuff: "high shelf",
  },
  {
    id: "skate",
    label: "the skateboard",
    x: 980,
    y: 392,
    w: 118,
    h: 26,
    walkX: 1030,
    lines: [
      "The skateboard. Almost. ALMOST.",
      "I am better at shipping websites than staying on this thing.",
    ],
    stuff: "skateboard",
  },
  {
    id: "cassettes",
    label: "the walkman",
    x: 2048,
    y: 384,
    w: 70,
    h: 34,
    walkX: 2080,
    lines: [
      "Lofi while the compiler thinks. The mix is called 'please compile'.",
    ],
    stuff: "lofi walkman",
  },
  {
    id: "manual",
    label: "the manual",
    x: 1888,
    y: 386,
    w: 58,
    h: 28,
    walkX: 1916,
    lines: [
      "HTML 3.2, dog-eared, mostly a joke. The punchline is I still care about markup.",
    ],
    stuff: "html manual",
  },
  {
    id: "ticket",
    label: "the train ticket",
    x: 1288,
    y: 396,
    w: 54,
    h: 22,
    walkX: 1314,
    lines: [
      "HOME — PLAY, round trip. I like trains more than metaphors, then I made the metaphor anyway.",
    ],
    stuff: "platform ticket",
  },
  {
    id: "cat-sleep",
    label: "the pillow cat",
    x: 168,
    y: 292,
    w: 70,
    h: 28,
    walkX: 200,
    lines: [
      "This one does not walk. This one judges. Name: Kernel. Priority: realtime.",
    ],
    stuff: "kernel the cat",
  },
];

export const START_X = 2280;
export const HERO_SPEED = 210;

export function nearestObject(x: number, range = 90) {
  let best: RoomObject | null = null;
  let bestDist = range;
  for (const obj of ROOM_OBJECTS) {
    const d = Math.abs(obj.walkX - x);
    if (d < bestDist) {
      best = obj;
      bestDist = d;
    }
  }
  return best;
}
