import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState<string | null>(null);

  function getFormattedTime() {
    const now = new Date();

    return (
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/New_York",
      }) + " UTC"
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-baseline gap-1">
      <span className="font-bold text-white/80 leading-none font-sans">
        {time}
      </span>
    </div>
  );
}
