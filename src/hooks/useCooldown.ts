import { useEffect, useRef, useState } from "react";

export function useCooldown(ms = 1000) {
  const [cooling, setCooling] = useState(false);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = () => {
    if (cooling) return false;
    setCooling(true);
    tRef.current = setTimeout(() => setCooling(false), ms);
    return true;                            
  };

  useEffect(() => {
    return () => {
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, []);

  return { cooling, trigger };
}