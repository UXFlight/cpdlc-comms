type RadioProps = {
  label: string | React.ReactNode;
  value: string;
  selected: string;
  onChange: (val: string | null) => void;
};

export default function CustomRadio({ label, value, selected, onChange }: RadioProps) {
  const isChecked = value === selected;

  const handleClick = () => {
    onChange(isChecked ? null : value);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 select-none w-full
        ${isChecked ? "bg-white/10 border-white/20 text-white" : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"}
      `}
    >
      {/* Radio circle */}
      <div className="flex-shrink-0">
        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center transition
            ${isChecked ? "border-white bg-white/90" : "border-white/30"}`}
        >
          {isChecked && <div className="w-2 h-2 bg-dark-blue rounded-full" />}
        </div>
      </div>

      {/* Label content */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
        {label}
      </div>
    </div>
  );
}
