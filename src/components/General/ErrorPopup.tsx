// components/Feedback/ErrorPopup.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useError } from "@/context/ErrorContext";

export default function ErrorPopup() {
  const { currentError, clearCurrentError } = useError();
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currentError) {
      timeoutRef.current = setTimeout(() => {
        if (!hovered) {
          clearCurrentError();
        }
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentError, hovered]);

  if (!currentError) return null;

  return (
    <div
      className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-3 rounded shadow-lg z-50 w-[300px] transition-all"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        timeoutRef.current = setTimeout(clearCurrentError, 2000);
      }}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{currentError.message}</p>
        <button
          onClick={clearCurrentError}
          className="ml-4 text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
