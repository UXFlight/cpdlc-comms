import { useState } from "react";
import { AcceptableResponse } from "@/interface/Logs";

export const IGNORED_RESPONSES = [
  "UM0", "UM1", "UM2", "UM3", "UM4", "UM5",
  "UM159", "UM183", "UM162", "DM0", "DM1", "DM2", "DM3", "DM4", "DM5",
];

const VISIBLE_COUNT = 3;

export default function DynamicResponses({
  responses,
  onSelect,
}: {
  responses: AcceptableResponse[];
  onSelect?: (ref: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const shownOptions = responses.filter(
    (response) => !IGNORED_RESPONSES.includes(response.ref),
  );

  const visibleResponses = showAll ? shownOptions : shownOptions.slice(0, VISIBLE_COUNT);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`flex flex-col gap-2 transition-all ${
          showAll ? "max-h-[280px] overflow-y-auto pr-1" : ""
        }`}
      >
        {visibleResponses.map((response) => {
          const isSelected = selected === response.ref;

          return (
            <div
              key={response.ref}
              onClick={() => {
                setSelected(response.ref);
                onSelect?.(response.ref);
              }}
              className={`px-4 py-2 rounded-md cursor-pointer transition duration-200 select-none w-full
                ${
                  isSelected
                    ? "bg-white/10 border border-white/20 text-white"
                    : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                }`}
            >
              {response.text ?? response.ref}
            </div>
          );
        })}
      </div>

      {/* Bouton "voir plus" */}
      {shownOptions.length > VISIBLE_COUNT && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-white/50 text-sm hover:text-white transition self-center mt-1"
        >
          ...
        </button>
      )}
    </div>
  );
}
