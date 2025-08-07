export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const minutesStr = mins > 0 ? `${mins}m` : "";
  const secondsStr = secs > 0 ? `${secs}s` : mins === 0 ? "0s" : "";

  return `${minutesStr} ${secondsStr}`.trim();
}
