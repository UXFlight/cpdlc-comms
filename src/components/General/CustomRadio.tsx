type RadioProps = {
  label: string | React.ReactNode;
  value: string;
  selected: string;
  onChange: (val: string | null) => void;
};

export default function CustomRadio({ label, value, selected, onChange }: RadioProps) {
  const isChecked = value === selected;

  const handleClick = () => {
    onChange(isChecked ? null : value); // toggle behavior
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-[4px] px-3 py-2 w-full max-w-[400px] rounded-md cursor-pointer transition-colors duration-200 select-none
        ${isChecked ? "bg-white/10 border border-white/20 text-white" : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"}`}
    >
      <div
        className={`w-4 h-4 min-w-[1rem] min-h-[1rem] rounded-full border flex items-center justify-center transition
          ${isChecked ? "border-white bg-white/90" : "border-white/30"}`}
      >
        {isChecked && <div className="w-2 h-2 bg-dark-blue rounded-full" />}
      </div>
      <span className="flex items-center gap-1 text-sm font-medium tracking-wide">{label}</span>
    </div>
  );
}
