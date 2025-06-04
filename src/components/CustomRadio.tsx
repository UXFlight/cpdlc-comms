type RadioProps = {
  label: string;
  value: string;
  selected: string;
  onChange: (val: string) => void;
};

function CustomRadio({ label, value, selected, onChange }: RadioProps) {
  const isChecked = value === selected;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={() => onChange(value)}
    >
      <span
        className={`w-4 h-4 rounded-full border ${
          isChecked ? "border-white bg-white" : "border-white/10"
        } flex items-center justify-center`}
      >
        {isChecked && <div className="w-2 h-2 bg-dark-blue rounded-full" />}
      </span>
      <span className="text-white/80 text-sm">{label}</span>
    </div>
  );
}
