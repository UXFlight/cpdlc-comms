const extraMessages = [
  "Due to weather",
  "Due to aircraft performance",
  "At pilot discretion",
  "Due to traffic"
];

export default function ExtraCheckboxes({ selected, onChange }: { selected: string[]; onChange: (val: string) => void }) {
  return (
    <div className="mt-4">
      <p className="text-white/80 font-medium mb-2">Additional Message:</p>
      <div className="flex flex-col gap-1">
        {extraMessages.map(msg => (
          <label
            key={msg}
            className="flex items-center gap-2 cursor-pointer select-none text-white/80 text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(msg)}
              onChange={() => onChange(msg)}
            />
            <span className="font-semibold">{msg}</span>
          </label>
        ))}
      </div>
    </div>
  );
}