interface InputFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
  label?: string;
  style?: string;
}

export default function InputField({
  value,
  onChange,
  placeholder = "",
  type = "text",
  style = "",
}: InputFieldProps) {
  return (
    <input
      type={type}
      className={`w-full max-w-[180px] border border-white-10 rounded-md text-white py-1 px-2 text-sm ${style}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
