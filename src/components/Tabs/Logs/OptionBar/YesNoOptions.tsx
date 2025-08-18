interface ConfirmButtonsProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function YesNoOptions({
  onConfirm,
  onCancel,
}: ConfirmButtonsProps) {
  return (
    <div className="flex gap-6">
      <button
        onClick={onCancel}
        className="w-10 h-10 rounded-full bg-white-10 text-white hover:bg-white-20 transition"
      >
        ✕
      </button>
      <button
        onClick={onConfirm}
        className="w-10 h-10 rounded-full bg-white-10 text-white hover:bg-white-20 transition"
      >
        ✓
      </button>
    </div>
  );
}
