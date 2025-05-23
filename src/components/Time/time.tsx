import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState(getFormattedTime());

   function getFormattedTime() {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      //hour12: false,
      minute: "2-digit",
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[12px] font-bold text-white/80 leading-none font-sans">
        {time}
      </span>
      <span className="text-[8px] font-light text-white/80 leading-none font-sans">
        UTC
      </span>
    </div>
  );
}
