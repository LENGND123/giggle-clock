export const SITE = {
  firstName: "Aditya",
  lastName: "Raj.",
  fullName: "Aditya Raj Singh",
  quote: "I care about software that feels fun!",
  handles: [
    {
      label: "@LENGND123",
      href: "https://github.com/LENGND123",
      role: "GitHub",
    },
    {
      label: "prev intern",
      href: "https://www.linkedin.com/in/aditya-raj-singh",
      role: "CodSoft · Cognifyz · Saiket",
    },
  ],
  location: "Ajmer, Rajasthan",
  study: "B.Tech CSE · AI & ML",
  email: "sadityaraj369@gmail.com",
  linkedin: "https://www.linkedin.com/in/aditya-raj-singh",
  github: "https://github.com/LENGND123",
  resume: "https://www.linkedin.com/in/aditya-raj-singh",
} as const;

export const STOPS = [
  { href: "/", id: "home", label: "home" },
  { href: "/work", id: "work", label: "work" },
  { href: "/about", id: "about", label: "about" },
  { href: "/play", id: "play", label: "play" },
] as const;

export type StopId = (typeof STOPS)[number]["id"];

export const EXPERIENCE = [
  { place: "CodSoft", role: "Python Intern" },
  { place: "Cognifyz Technologies", role: "Python Intern" },
  { place: "Saiket Systems", role: "Web Intern" },
  { place: "Syntecxhub", role: "To-Do List Manager" },
  { place: "B.Tech CSE", role: "AI · Full Stack" },
] as const;

export const OUTSIDE_WORK = [
  { icon: "🎧", label: "listening", detail: "lofi while the compiler thinks" },
  { icon: "🚆", label: "riding", detail: "trains, late buses, long walks" },
  { icon: "🕹️", label: "tinkering", detail: "OpenCV toys, clocks, chat UIs" },
  { icon: "📸", label: "noticing", detail: "city light, station tiles, stray cats" },
] as const;

export type WorkItem = {
  id: string;
  num: string;
  title: string;
  summary: string;
  detail: string;
  role: string;
  stack: string;
  time: string;
  tags: string[];
  href: string;
  cover: "clock" | "chat" | "ward" | "wheel";
};

export const WORK: WorkItem[] = [
  {
    id: "giggle-clock",
    num: "01",
    title: "A clock made of beads, not numbers.",
    summary:
      "Giggle Clock — analog time as a field of dots on yellow paper, with a digital face hiding underneath.",
    detail:
      "Rebuilt a cube clock into a dotted analog instrument. Beads, halftone marks, and a tick you can mute.",
    role: "Design + frontend",
    stack: "Next.js · TypeScript",
    time: "2026",
    tags: ["Interaction", "Clock"],
    href: "https://github.com/LENGND123/giggle-clock",
    cover: "clock",
  },
  {
    id: "instachat",
    num: "02",
    title: "A chat room that still feels like a corner store.",
    summary:
      "InstaChat — realtime rooms, presence, and a UI that wants to be lingered in.",
    detail:
      "Full-stack TypeScript chat with rooms you can actually sit in, not just ping.",
    role: "Full stack",
    stack: "TypeScript · React",
    time: "2025",
    tags: ["Realtime", "Product"],
    href: "https://github.com/LENGND123/InstaChat",
    cover: "chat",
  },
  {
    id: "beds",
    num: "03",
    title: "Hospital beds, assigned without the scramble.",
    summary:
      "Bed allocation for a ward that has more patients than empty sheets.",
    detail:
      "A TypeScript allocator that matches patients to beds with constraints you can explain to a nurse.",
    role: "Systems",
    stack: "TypeScript",
    time: "2025",
    tags: ["Healthcare", "Logic"],
    href: "https://github.com/LENGND123/hc03-bed-allocation",
    cover: "ward",
  },
  {
    id: "wheel",
    num: "04",
    title: "Drive with your hands, no wheel required.",
    summary:
      "AI steering wheel — MediaPipe hands, OpenCV, and a dashboard that pretends you are on a road.",
    detail:
      "Real-time hand tracking with auto calibration. A toy that takes itself seriously.",
    role: "ML + UI",
    stack: "Python · OpenCV",
    time: "2025",
    tags: ["Computer vision", "Play"],
    href: "https://github.com/LENGND123/steering-wheel",
    cover: "wheel",
  },
];
