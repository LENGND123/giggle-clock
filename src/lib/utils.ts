import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

export function formatTime(
  date: Date | null,
  hour12: boolean,
): {
  hours: string;
  minutes: string;
  seconds: string;
  meridian: string | null;
} {
  if (!date) {
    return {
      hours: "--",
      minutes: "--",
      seconds: "--",
      meridian: null,
    };
  }

  let hours = date.getHours();
  let meridian: string | null = null;

  if (hour12) {
    meridian = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
  }

  return {
    hours: hour12 ? String(hours) : pad2(hours),
    minutes: pad2(date.getMinutes()),
    seconds: pad2(date.getSeconds()),
    meridian,
  };
}

export function formatDate(date: Date | null): string {
  if (!date) {
    return "\u00a0";
  }
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}
