export function handAngles(date: Date): {
  hour: number;
  minute: number;
  second: number;
} {
  const ms = date.getMilliseconds();
  const seconds = date.getSeconds() + ms / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  return {
    hour: (hours / 12) * Math.PI * 2,
    minute: (minutes / 60) * Math.PI * 2,
    second: (seconds / 60) * Math.PI * 2,
  };
}

export function polar(
  cx: number,
  cy: number,
  angle: number,
  radius: number,
): { x: number; y: number } {
  return {
    x: cx + Math.sin(angle) * radius,
    y: cy - Math.cos(angle) * radius,
  };
}
